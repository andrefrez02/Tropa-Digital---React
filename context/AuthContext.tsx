"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User } from "../app/Components/users";

type AuthContextType = {
  loggedUser: User | null;
  setLoggedUser: (user: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedUser, setLoggedUserState] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("loggedUser");
      if (stored) setLoggedUserState(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (loggedUser) {
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      } else {
        localStorage.removeItem("loggedUser");
      }
    }
  }, [loggedUser]);

  useEffect(() => {
    setTimeout(() => {
      const user = localStorage.getItem("loggedUser");
      if (
        typeof window !== "undefined" &&
        user === null &&
        document.querySelector("#index-page") === null
      ) {
        window.location.replace("/");
      }
    }, 1000);
  }, [loggedUser]);

  const setLoggedUser = (user: User | null) => setLoggedUserState(user);

  const logout = () => setLoggedUserState(null);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
