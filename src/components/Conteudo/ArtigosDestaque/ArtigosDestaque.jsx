import React, { useRef, useEffect } from 'react';
import styles from "./ArtigosDestaque.module.scss";

import { Link } from "react-router-dom";

import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import ListaCards from "../../ListaCards/Usuario/ListaCards.jsx";
import Loading from "../../Loading/Loading.jsx";

function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function ArtigosDestaque({ onTextReady }) { 
    const { artigos, loading, error } = useGetArtigos();
    const containerRef = useRef(null);

    const artigosAdaptados = artigos
    .filter(a => a.status === "publicado")
    .map(a => ({
        id: a.id,
        tipo: "artigo", // mandando o tipo pra pegar o titulo correto
        titulo: decodeHtml(a.titulo),
        url_imagem: a.url_imagem,
        conteudo: decodeHtml(a.conteudo),
        link: `/artigo/${a.id}`
    }));

    useEffect(() => {
        if (!loading && artigosAdaptados.length > 0 && containerRef.current) { 
            const extractedText = containerRef.current.innerText || containerRef.current.textContent;

            if (extractedText && extractedText.length > 50 && onTextReady) {
                onTextReady(extractedText.trim());
            }
        }
    }, [loading, artigosAdaptados.length, onTextReady]); 

    return (
        <div ref={containerRef} className={styles.container}> 
            <div className={styles.containerTopo}>
                <h2>Destaques</h2>
                {loading && <Loading />}
                {error && <p>Ocorreu um erro ao carregar os artigos: {error}</p>}
                <Link to="/artigos" className={styles.btnVerMais}>Ver mais</Link>
            </div>

            <ListaCards cards={artigosAdaptados} limite={3} />
        </div>
    );
};

export default ArtigosDestaque;