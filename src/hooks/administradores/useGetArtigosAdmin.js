import { useState, useEffect, useCallback } from 'react';
import { useArtigos } from '../artigos/useArtigos';

export const useGetArtigosAdmin = (autorId) => {
    const [artigos, setArtigos] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    const { getArtigos } = useArtigos(); //usando a conexão ja existentes

    //useCallback é um hook do React que serve para memorizar funções
    // ou seja, ele cria uma função que não muda de referência a cada renderização.
    // usando ele estamos dizendo pro react ficar ligado de so atualizar se o autorID mudar ja que esta é nossa dependencia
    const fetchArtigos = useCallback(async () => {
        if (!autorId) {
            setLoading(false);
            setArtigos([]);
            return;
        }
        
        setLoading(true);
        setError(null);

        try {
            const data = await getArtigos(autorId);
            setArtigos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [autorId]);//nossa dependencia

    useEffect(() => { //renderiza na primeira vez e quando o fetchzao muda.
      fetchArtigos();
    },[fetchArtigos]);

    return { artigos, loading, error, refetch: fetchArtigos }; // o refetch é uma função pra pedir pro useEffect recarregar o fetchArtigos, to usando no deleete pro card sumir
};