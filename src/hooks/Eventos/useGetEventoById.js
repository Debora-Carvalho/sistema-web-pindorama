import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEventos } from "./useEventos.js";

export const useGetEventoById = () => {
  const { id } = useParams();
  const { buscarEvento } = useEventos();
  const [ evento, setEvento ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true); //setando como true
    setError(null);
    const fetchEvento = async () => {
      try {
        const eventoData = await buscarEvento(id); // poderiamos colocar no array porem se embrulharmos com o useCallBack
        setEvento(eventoData);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }catch (err) {
        console.error("Erro ao carregar evento:", err);
        setError(err);
      }finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]); //Quando o id muda todo o bloco de useEffect roda novamente por isso permanecer o id

  return { evento, loading, error };
};