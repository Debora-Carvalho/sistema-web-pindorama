import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/eventos`;

export const useEventos = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Método para buscar todos os eventos GET
    const getEventos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Erro ao buscar eventos.');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Método para criar um novo evento POST
    const criarEvento = async (eventoData) => {
        setLoading(true);
        setError(null);
        try {
            
            const formData = new FormData();
            
            
            formData.append('evento[titulo]', eventoData.titulo); 
            formData.append('evento[conteudo]', eventoData.conteudo); 
            formData.append('evento[data]', eventoData.data); 
            formData.append('evento[local]', eventoData.localLink); 

            // Se o autorId estiver em eventoData: formData.append('evento[autor_id]', eventoData.autorId); 
            // Envia cada tag 
            eventoData.tags.forEach(tag => {
                formData.append('evento[tags][]', tag); 
            });

            // Adiciona imagem (mantido imagem_capa para uso no controller)
            if (eventoData.imagemCapa) {
                formData.append('evento[imagem_capa]', eventoData.imagemCapa);
            }
            
            const response = await fetch(API_URL, {
                method: 'POST',
                
                body: formData,
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = { error: 'Erro desconhecido ao criar evento.' };
                }
                throw new Error(errorData.error || 'Erro ao criar evento');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Método para atualizar um evento PUT/PATCH
    const atualizarEvento = async (id, eventoData) => {
        setLoading(true);
        setError(null);
        try {
            // FormData permite a atualização da imagem também
            const formData = new FormData();
            
            formData.append('evento[titulo]', eventoData.titulo); 
            formData.append('evento[conteudo]', eventoData.conteudo); 
            formData.append('evento[data]', eventoData.data); 
            formData.append('evento[local]', eventoData.localLink); 
            // Se o autorId estiver em eventoData: formData.append('evento[autor_id]', eventoData.autorId)
            // Envia cada tag 
            eventoData.tags.forEach(tag => {
                formData.append('evento[tags][]', tag); 
            });
            
            
            if (eventoData.imagemCapa) {
                formData.append('evento[imagem_capa]', eventoData.imagemCapa);
            }
            
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = { error: 'Erro desconhecido ao atualizar evento.' };
                }
                throw new Error(errorData.error || 'Erro ao atualizar evento');
            }
            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Método DEL
    const deletarEvento = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = { error: 'Erro desconhecido ao deletar evento.' };
                }
                throw new Error(errorData.error || 'Erro ao deletar evento');
            }
            return true;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getEventos,
        criarEvento,
        atualizarEvento,
        deletarEvento,
    };
};