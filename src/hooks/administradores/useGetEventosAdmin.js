import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/eventos`;

export const useGetEventosAdmin = (autorId) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!autorId) {
            setLoading(false);
            setEventos([]);
            return;
        }

        const fetchEventos = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = `${API_URL}?autor_id=${autorId}`;
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Erro ao buscar os eventos do autor');
                }
                const data = await response.json();
                setEventos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();

    }, [autorId]); 

    return { eventos, loading, error };
};