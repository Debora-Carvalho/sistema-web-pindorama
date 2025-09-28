import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/artigos`;

export const useGetArtigosAdmin = (autorId) => {
    const [artigos, setArtigos] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!autorId) {
            setLoading(false);
            setArtigos([]);
            return;
        }

        const fetchartigos = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = `${API_URL}?autor_id=${autorId}`;
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Erro ao buscar os artigos do autor');
                }
                const data = await response.json();
                setArtigos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchartigos();

    }, [autorId]); 

    return { artigos, loading, error };
};