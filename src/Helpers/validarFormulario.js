// utils/validarFormulario.js
export function validarFormulario({ titulo, conteudo, imagemCapa, tags, local, previewCapa }, status) {
  const conteudoVazio = !conteudo || conteudo === '<p><br data-mce-bogus="1"></p>';
  const formularioVazio =
    !titulo.trim() && conteudoVazio && !imagemCapa && tags.length === 0 && !local;

  if (status === "publicado") {
    if (!titulo.trim()) throw new Error("Por favor, adicione um título.");
    if (conteudoVazio) throw new Error("O conteúdo do artigo não pode estar vazio.");
    if (!imagemCapa && !previewCapa) throw new Error("Por favor, adicione uma imagem de capa.");
    if (tags.length === 0) throw new Error("Selecione pelo menos uma tag.");
    if (!local) throw new Error("Selecione um local.");
  } else if (status === "rascunho") {
    if (formularioVazio)
      throw new Error("Preencha pelo menos um campo para salvar como rascunho.");
  }
}
