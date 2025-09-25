import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/artigos`;

export function useArtigos() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  async function criarArtigo(dados, imagemFile) {
    setLoading(true);
    setErro(null);
    try {
      const formData = new FormData();
      formData.append("artigo[titulo]", dados.titulo);
      formData.append("artigo[conteudo]", dados.conteudo);
      formData.append("artigo[local]", dados.local);
      formData.append("artigo[autor_id]", dados.autor_id);
      formData.append("artigo[status]", dados.status);

      // envia tags como array no formato Rails
      dados.tags.forEach((tag) => {
        formData.append("artigo[tags][]", tag);
      });

      if (imagemFile) {
        formData.append("imagem", imagemFile);
      }

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao criar artigo: ${errorText}`);
      }

      return await response.json();
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    criarArtigo,
    loading,
    erro,
  };
}
