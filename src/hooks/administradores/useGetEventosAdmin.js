import { useState, useEffect, useCallback } from 'react';
import { useEventos } from '../Eventos/useEventos.js'

export const useGetEventosAdmin = (autorId) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    const { listarEventos } = useEventos(); //usando a conexão ja existentes

    const fetchEventos = useCallback(async () => {
        if (!autorId) {
            setLoading(false);
            setEventos([]);
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const data = await listarEventos(autorId);
            setEventos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [autorId]);

    useEffect(() => {
      fetchEventos();
    },[fetchEventos]);

    return { eventos, loading, error, refetch: fetchEventos };
};