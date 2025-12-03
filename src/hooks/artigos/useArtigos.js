import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/artigos`;

export function useArtigos() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    // POST /artigos
    async function postArtigo(dados, imagemFile) {
        setLoading(true);
        setErro(null);
        try {
            const formData = new FormData();
            formData.append("artigo[titulo]", dados.titulo);
            formData.append("artigo[conteudo]", dados.conteudo);
            formData.append("artigo[local]", dados.local);
            formData.append("artigo[autor_id]", dados.autor_id);
            formData.append("artigo[status]", dados.status);
            formData.append("artigo[data]", dados.data);
            formData.append("artigo[creditos_imagem]", dados.creditos_imagem); 
            formData.append("artigo[alt_imagem]", dados.alt_imagem);

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

    // GET /artigos all
    async function getArtigos(autorId = null) { //aceita o id mas se não passar nada, tudo bem tambem
        setLoading(true);
        setErro(null);
        try {
            const url = autorId ? `${API_URL}?autor_id=${autorId}` : API_URL; //se autor existir? entao ele pega os artigos desse autor : se nao pega tudo mesmo 
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro ao carregar artigos");
            return await response.json();
        } catch (err) {
            setErro(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // GET /artigos/:id
    async function getArtigoById(id) {
        setLoading(true);
        setErro(null);
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error(`Erro ao buscar artigo ${id}`);
            return await response.json();
        } catch (err) {
            setErro(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // PUT /artigos/:id
    async function putArtigo(id, dados, imagemFile) {
        setLoading(true);
        setErro(null);
        try {
            const formData = new FormData();
            formData.append("artigo[titulo]", dados.titulo);
            formData.append("artigo[conteudo]", dados.conteudo);
            formData.append("artigo[local]", dados.local);
            formData.append("artigo[autor_id]", dados.autor_id);
            formData.append("artigo[status]", dados.status);
            formData.append("artigo[data]", dados.data);
            formData.append("artigo[creditos_imagem]", dados.creditos_imagem); 
            formData.append("artigo[alt_imagem]", dados.alt_imagem);

            dados.tags.forEach((tag) => {
                formData.append("artigo[tags][]", tag);
            });

            if (imagemFile) {
                formData.append("imagem", imagemFile);
            }

            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) throw new Error("Erro ao atualizar artigo");
            return await response.json();
        } catch (err) {
            setErro(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // DELETE /artigos/:id
    async function deleteArtigo(id) {
        setLoading(true);
        setErro(null);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Erro ao deletar artigo");
            return true;
        } catch (err) {
            setErro(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }
    // NOVO: Função para atualizar apenas o status do artigo
    async function updateArtigoStatus(id, novoStatus) {
      setLoading(true);
      setErro(null);
      try {
          const response = await fetch(`${API_URL}/${id}`, {
              method: "PATCH", // PATCH é ideal para atualizar um único campo, mas PUT também funcionaria se o backend permitir
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  // Seu backend Rails/API precisa aceitar um objeto 'artigo'
                  artigo: {
                      status: novoStatus,
                  },
              }),
          });

          if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Erro ao atualizar status do artigo ${id}: ${errorText}`);
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
        postArtigo,
        getArtigoById,
        putArtigo,
        deleteArtigo,
        getArtigos,
        loading,
        erro,
        updateArtigoStatus,
    };
}