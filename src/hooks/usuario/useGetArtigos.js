import { useState, useEffect } from 'react';
import { useArtigos } from '../artigos/useArtigos';

export const useGetArtigos = () => {
    const [artigos, setArtigos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { listarArtigos } = useArtigos(); 

    useEffect(() => {
        const loadArtigos = async () => {
            try {
                const data = await listarArtigos(); 
                setArtigos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadArtigos();
    }, [listarArtigos]); 

    return { artigos, loading, error }; 
};