import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useArtigos } from "./useArtigos.js";

export const useGetArtigoById = () => {
    const { id } = useParams();
    const { getArtigoById } = useArtigos();
    const [artigo, setArtigo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true); //setando como true
        setError(null);
        const fetchArtigo = async () => {
            try {
                const artigoData = await getArtigoById(id); // poderiamos colocar no array porem se embrulharmos com o useCallBack
                setArtigo(artigoData);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (err) {
                console.error("Erro ao carregar artigo:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtigo();
    }, [id]); //Quando o id muda todo o bloco de useEffect roda novamente por isso permanecer o id

    return { artigo, loading, error };
};