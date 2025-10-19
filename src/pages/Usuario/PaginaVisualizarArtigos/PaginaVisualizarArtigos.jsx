import React, { useRef, useState, useEffect } from 'react';
import styles from './PaginaVisualizarArtigos.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js';
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";
import { Link } from "react-router-dom";
import Loading from '../../../components/Loading/Loading.jsx';
import { useTts } from '../../../hooks/conf/useTts.js'

// Função para decodificar HTML entities
function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function PaginaVisualizarArtigos() {
    useTituloDocumento("Artigos | Pindorama"); // mudando o Title da pagina
    const { artigos, loading, error } = useGetArtigos();

    const mainContentRef = useRef(null);
    const ttsProps = useTts();
    const [pageText, setPageText] = useState("Carregando conteúdo principal...");

    useEffect(() => {
        if (mainContentRef.current) {
            const extractedText = mainContentRef.current.innerText || mainContentRef.current.textContent;

            if (extractedText && extractedText.length > 50) {
                setPageText(extractedText);
            }
        }
    }, [loading, artigos]);
    const textToRead = pageText;

    // Adaptando os artigos: filtrando apenas publicados e decodificando HTML
    const artigosAdaptados = artigos
        .filter(a => a.status === "publicado")
        .map(a => ({
            id: a.id,
            tipo: "artigo",
            titulo: decodeHtml(a.titulo),
            url_imagem: a.url_imagem,
            conteudo: decodeHtml(a.conteudo),
            link: `/artigo/${a.id}`
        }));

    return (
        <>
            <div className={styles.container}>
                <Header ttsProps={ttsProps}
                    textToRead={textToRead} />

                <main ref={mainContentRef} className={styles.containerItems}>
                    <h2>Artigos</h2>
                    {loading && <Loading />}
                    {error && <p>Ocorreu um erro ao carregar os artigos: {error}</p>}

                    <ListaCards cards={artigosAdaptados} limite={null} />

                    {/* Botão de voltar ou outros links podem ser adicionados */}
                    {/* <Link to="/" className={styles.btnVerMais}>Voltar para a home</Link> */}
                </main>

                <Footer />
            </div>
        </>
    );
}

export default PaginaVisualizarArtigos;
