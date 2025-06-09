"use client";
import Image from "next/image";
import { User, users } from "./Components/users";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { setLoggedUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found: User | undefined = users.find(
      (user) => user.email === email && user.password === password
    );
    if (found) {
      setSuccess(true);
      setError("");
      setLoggedUser(found);
      window.location.assign("/dashboard");
      console.log("Usuário encontrado:", found);
    } else {
      setError("E-mail ou senha inválidos.");
      setSuccess(false);
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{ backgroundColor: "#f9fbff" }}
    >
      <div
        className="bg-white rounded-[30px] p-5  text-[#cc6237] w-[50%]"
        style={{ boxShadow: "0px 100px 200px 0px #00000040" }}
      >
        <div className="flex justify-between items-center">
          <div>
            <Image
              width={64}
              height={64}
              className="w-64 h-16 my-8 object-contain"
              src="/logo.svg"
              alt="Tropa Digital Logo"
              priority
            />
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
              <h2 className="text-[#95a6c7]">
                Entre com sua conta para acessar o painel
              </h2>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="email" className="block text-base font-bold">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="seunome@seuservidor.com"
                  className="w-full px-4 py-2 rounded-full bg-[#f6f6f6] focus:outline-none focus:ring-2 focus:ring-[#cc6237] placeholder:text-[#657593] placeholder:font-normal font-semibold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className="block text-base font-bold">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    placeholder="Digite aqui"
                    className="w-full px-4 py-2 rounded-full bg-[#f6f6f6] focus:outline-none focus:ring-2 focus:ring-[#cc6237] placeholder:text-[#657593] placeholder:font-normal font-semibold pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#cc6237] focus:outline-none"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {showPassword ? (
                      <Image
                        src="/olho-aberto.svg"
                        alt="Olho aberto (mostrar senha)"
                        width={20}
                        height={20}
                        style={{
                          filter:
                            "invert(43%) sepia(15%) saturate(2390%) hue-rotate(332deg) brightness(104%) contrast(88%)",
                        }}
                      />
                    ) : (
                      <Image
                        src="/olho-fechado.svg"
                        alt="Olho fechado (ocultar senha)"
                        width={20}
                        height={20}
                        style={{
                          filter:
                            "invert(43%) sepia(15%) saturate(2390%) hue-rotate(332deg) brightness(104%) contrast(88%)",
                        }}
                      />
                    )}
                  </button>
                </div>
                {error && (
                  <div className="text-red-500 font-semibold">{error}</div>
                )}
                {success && (
                  <div className="text-green-600 font-semibold">
                    Login realizado com sucesso!
                  </div>
                )}
                <button className="px-6 py-2 rounded-full bg-[#cc6237] text-white font-semibold hover:bg-[#b0552f] transition-colors btn-lg cursor-pointer mt-4">
                  Enviar
                </button>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-center ml-6 h-max-w-xs w-max-w-xs">
            <Image
              width={64}
              height={64}
              className="w-max h-max"
              src="/login.svg"
              alt="Tropa Digital Logo"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
