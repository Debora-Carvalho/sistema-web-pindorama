import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/eventos`;

export function useEventos() {
    const [eventos, setEventos] = useState([]); // Estado para armazenar todos os eventos
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);

    // Função para buscar todos os eventos e armazenar no estado interno
    async function buscarTodosEventos() {
        setLoading(true);
        setErro(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Erro ao carregar eventos");
            }
            const data = await response.json();
            setEventos(data); // Armazena a lista completa no estado
            return data;
        } catch (err) {
            setErro(err.message);
            // Não lança o erro para evitar que a promessa seja rejeitada em um useEffect
        } finally {
            setLoading(false);
        }
    }

    // Carrega os eventos ao montar o componente
    useEffect(() => {
        buscarTodosEventos();
        // A função é estável, não precisa ser adicionada aqui, 
        // mas o ESLint pode reclamar. Se for o caso, adicione-a.
    }, []); 

    // As funções de requisição abaixo retornam dados e lançam erro para serem usadas em handlers

    async function criarEvento(dados, imagemFile) {
        setLoading(true);
        setErro(null);
        try {
            const formData = new FormData();
            
            // Alterado namespace para 'evento' (Rails strong params)
            formData.append("evento[titulo]", dados.titulo);
            formData.append("evento[conteudo]", dados.conteudo);
            formData.append("evento[local]", dados.local);
            formData.append("evento[data]", dados.data); 
            formData.append("evento[autor_id]", dados.autor_id);
            formData.append("evento[status]", dados.status);

            // Envia tags como array no formato Rails
            dados.tags.forEach((tag) => {
                formData.append("evento[tags][]", tag);
            });

            if (imagemFile) {
                formData.append("evento[imagem]", imagemFile); // Ajuste para nome de parâmetro correto
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


    async function buscarEventoPorId(id) {
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
            
            // Alterado namespace para 'evento' (Rails strong params)
            formData.append("evento[titulo]", dados.titulo);
            formData.append("evento[conteudo]", dados.conteudo);
            formData.append("evento[local]", dados.local);
            formData.append("evento[data]", dados.data); 
            formData.append("evento[autor_id]", dados.autor_id);
            formData.append("evento[status]", dados.status);

            dados.tags.forEach((tag) => {
                formData.append("evento[tags][]", tag);
            });

            // Adiciona a nova imagem (se existir). O back-end lida com a substituição.
            if (imagemFile) {
                formData.append("evento[imagem]", imagemFile); // Ajuste para nome de parâmetro correto
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
            
            // Atualiza a lista localmente após a exclusão bem-sucedida
            // Isso garante que a lista na tela de admin seja atualizada automaticamente
            setEventos(prevEventos => prevEventos.filter(e => e.id !== id));
            
            return true;
        } catch (err) {
            setErro(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        // Estado retornado para o componente Administrador
        eventos, 
        loading,
        erro,
        
        // Funções retornadas
        buscarTodosEventos, // Para recarregar a lista manualmente
        criarEvento,
        atualizarEvento,
        buscarEventoPorId, // Renomeado de buscarEvento para maior clareza
        deletarEvento,
    };
}