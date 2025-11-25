import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/artigos`;

export const useGetArtigos = () => {
    const [artigos, setArtigos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtigos = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Erro ao buscar os artigos');
                }
                const data = await response.json();
                setArtigos(data);
                window.scrollTo({ top: 0, behavior: "smooth" })
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtigos();
    }, []); 

    return { artigos, loading, error };
};