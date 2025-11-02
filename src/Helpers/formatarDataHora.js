// Helpers/formatarDataHora.js
export function formatarData(dataString, tipo = "datahora") {
  if (!dataString) return "";

  const data = new Date(dataString);

  if (isNaN(data)) return "";// Verifica se é uma data válida

  const opcoesBase = { day: "numeric", month: "long", year: "numeric" };

  const opcoes =
    tipo === "datahora"
      ? { ...opcoesBase, hour: "2-digit", minute: "2-digit" }
      : opcoesBase;

  const formatado = new Intl.DateTimeFormat("pt-BR", opcoes).format(data);
  return tipo === "datahora" ? formatado.replace(",", " às") : formatado;  // Se for tipo "datahora", adiciona "às" antes da hora

}
