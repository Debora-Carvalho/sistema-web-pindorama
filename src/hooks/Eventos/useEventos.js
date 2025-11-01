import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/eventos`;

export function useEventos() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [eventos, setEventos] = useState([]); // ✅ ADICIONADO

    // Função similar a 'criarArtigo'
    async function criarEvento(dados, imagemFile) {
        setLoading(true);
        setErro(null);
        try {
            const formData = new FormData();
            // Utiliza 'evento' como chave principal e os parâmetros da controller
            formData.append("evento[titulo]", dados.titulo);
            formData.append("evento[conteudo]", dados.conteudo);
            formData.append("evento[local]", dados.local);
            formData.append("evento[data]", dados.data);
            formData.append("evento[autor_id]", dados.autor_id);

            if (imagemFile) {
                formData.append("imagem", imagemFile);
            }

            if (dados.tags) {
                dados.tags.forEach((tag) => {
                    formData.append("evento[tags][]", tag);
                });
            }

            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao criar evento: ${errorText}`);
            }

            return await response.json();
        } catch (err) {
            setErro(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function listarEventos(autorId = null) {
        setLoading(true);
        setErro(null);
        try {
            // Adiciona suporte a params[:autor_id] conforme a controller
            const url = autorId ? `${API_URL}?autor_id=${autorId}` : API_URL;
            const response = await fetch(url);

            if (!response.ok) throw new Error("Erro ao carregar eventos");
            const data = await response.json();
            setEventos(data); // ✅ AGORA SALVA OS EVENTOS NO ESTADO
            return data;
        } catch (err) {
            setErro(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function buscarEvento(id) {
        setLoading(true);
        setErro(null);
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error(`Erro ao buscar evento ${id}`);
            return await response.json();
        } catch (err) {
            setErro(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function atualizarEvento(id, dados, imagemFile) {
        setLoading(true);
        setErro(null);
        try {
            const formData = new FormData();
            // Utiliza 'evento' como chave principal e os parâmetros da sua controller
            formData.append("evento[titulo]", dados.titulo);
            formData.append("evento[conteudo]", dados.conteudo);
            formData.append("evento[local]", dados.local);
            formData.append("evento[data]", dados.data);
            formData.append("evento[autor_id]", dados.autor_id);

            // Tags
            if (dados.tags) {
                dados.tags.forEach((tag) => {
                    formData.append("evento[tags][]", tag);
                });
            }
            
            // Imagem
            if (imagemFile) {
                formData.append("imagem", imagemFile);
            }

            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) throw new Error("Erro ao atualizar evento");
            return await response.json();
        } catch (err) {
            setErro(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function deletarEvento(id) {
        setLoading(true);
        setErro(null);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Erro ao deletar evento");
            return true;
        } catch (err) {
            setErro(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        atualizarEvento,
        buscarEvento,
        deletarEvento,
        listarEventos,
        criarEvento,
        loading,
        erro,
        eventos, //AGORA RETORNA OS EVENTOS DO ESTADO
    };
}