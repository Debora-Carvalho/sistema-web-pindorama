import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/eventos`;

export function useEventos() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Criar evento
    async function criarEvento(dados) {
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("evento[titulo]", dados.titulo);
            formData.append("evento[conteudo]", dados.conteudo);
            formData.append("evento[data]", dados.data);
            formData.append("evento[local]", dados.localLink); // ⚡ nome correto do campo

            dados.tags.forEach((tag) => {
                formData.append("evento[tags][]", tag);
            });

            if (dados.imagemCapa) {
                formData.append("imagem", dados.imagemCapa);
            }

            const response = await fetch(API_URL, { method: "POST", body: formData });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao criar evento: ${errorText}`);
            }

            return await response.json();
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // Buscar eventos do banco
    async function buscarEventos() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || "Erro ao buscar eventos");
            }
            return await response.json();
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        criarEvento,
        buscarEventos,
        loading,
        error,
    };
}
