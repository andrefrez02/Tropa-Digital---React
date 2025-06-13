type DataCellProps = {
  dataInicial: string;
  dataFinal: string;
};

function formatDateExt(date: string, showMonth = true) {
  if (!date) return "";
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  return showMonth ? `${day} de ${meses[d.getMonth()]}` : day;
}

export default function DataCell({ dataInicial, dataFinal }: DataCellProps) {
  let dIni = new Date(dataInicial);
  let dFim = new Date(dataFinal);
  let ini = dataInicial;
  let fim = dataFinal;

  // Inverta se a data final for menor que a inicial
  if (dFim < dIni) {
    [dIni, dFim] = [dFim, dIni];
    [ini, fim] = [fim, ini];
  }

  const sameMonth =
    dIni.getFullYear() === dFim.getFullYear() &&
    dIni.getMonth() === dFim.getMonth();

  if (fim !== ini) {
    if (sameMonth) {
      return (
        <>
          {formatDateExt(ini, false)} a {formatDateExt(fim, true)}
        </>
      );
    }
    return (
      <>
        {formatDateExt(ini, true)} a {formatDateExt(fim, true)}
      </>
    );
  }
  return <>{formatDateExt(ini, true)}</>;
}
