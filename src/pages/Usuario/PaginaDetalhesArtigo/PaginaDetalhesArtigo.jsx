import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './PaginaDetalhesArtigo.module.scss'
import useTituloDocumento from '../../../hooks/useTituloDocumento.js'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import PopupCompartilhar from '../../../components/Popups/PopupCompartilhar/PopupCompartilhar.jsx'
import { AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify'
import { FaPlay } from 'react-icons/fa'
import BtnCompartilhar from '../../../components/BtnCompartilhar/BtnCompartilhar.jsx'
import { useArtigos } from '../../../hooks/artigos/useArtigos.js';
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js';
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";
import { useGetArtigoById } from '../../../hooks/artigos/useGetArtigoById.js'
import Loading from '../../../components/Loading/Loading.jsx';
import { decodeHtml } from "../../../Helpers/decodeHtml.js";
import { formatarData } from "../../../Helpers/formatarDataHora.js"
import MiniPlayer from '../../../components/MiniPlayer/MiniPlayer.jsx'
import audioTeste from '../../../assets/audio/Final.mp3'

function PaginaDetalhesArtigo() {

    const [playerAtivado, setPlayerAtivado] = useState(false);

    const { id } = useParams();
    const { artigo, loading: loadingArtigo, error: errorArtigo } = useGetArtigoById();
    const { artigos, loading: loadingLista, error: errorLista } = useGetArtigos();
    const artigosAdaptados = artigos
        .filter(a => a.status === "publicado")
        .filter(a => a.id !== Number(id)) // exclui o artigo que ta mostrando
        .map(a => {
            const adaptado = {
                id: a.id,
                tipo: "artigo",
                titulo: a.titulo,
                url_imagem: a.url_imagem,
                conteudo: decodeHtml(a.conteudo),
                link: `/detalhes-artigo/${a.id}`,
                tags: a.tags
            };
            return adaptado;
        });

    const artigosRelacionados = artigosAdaptados.filter(a => {
        if (!a.tags || !artigo.tags) return false;// verifica se ambos tem tags
        return a.tags.some(tag => artigo.tags.includes(tag));// aqui verifica se tem alguma tag em comum
    });

    useTituloDocumento(`${artigo?.titulo || "Carregando..."} | Pindorama`)

    const limiteDeArtigos = 3;

    const conteudoSeguro = DOMPurify.sanitize(artigo?.conteudo || "Carregando...");
    const [popupCompartilharAberto, setPopupCompartilharAberto] = useState(false);
    const artigoUrl = window.location.href;

    return (
        <>
            <div className={styles.container}>
                <Header />
                {(loadingArtigo || loadingLista) ? (
                    <Loading />
                ) : (
                    <main className={styles.conteudo}>

                        <div className={styles.headerArtigo}>
                            <div className={styles.infoTitulo}>
                                <h1 className={styles.tituloArtigo}>{artigo.titulo}</h1>
                                <p className={styles.dataPublicacao}>
                                    Publicado em: {formatarData(artigo.data, "data")}

                                </p>

                            </div>

                            <p className={styles.autora}>Kelly Cristina Marques</p>{/* {artigo.autor_id} Deveria ser usado, mas sem tempo*/}
                        </div>

                        <div className={styles.conteudoPrincipal}>
                            <div className={styles.colunaEsquerda}>

                                <div className={styles.textoContainer}>
                                    <div
                                        className={styles.corpoTexto}
                                        dangerouslySetInnerHTML={{ __html: conteudoSeguro }}
                                    />
                                </div>

                                <div className={styles.infoInferior}>
                                    <BtnCompartilhar
                                        className={styles.botaoShareLayout}
                                        onClick={() => setPopupCompartilharAberto(true)}
                                    />

                                    <div className={styles.playerContainerWrapper}>
                                        {playerAtivado ? (
                                            // SE ATIVADO: Mostra o player completo e toca
                                            <MiniPlayer
                                                src={audioTeste}
                                                autoPlay={true}
                                            />
                                        ) : (
                                            // SE NÃO ATIVADO: Mostra o botão compacto
                                            <button
                                                className={styles.playerCompacto}
                                                onClick={() => setPlayerAtivado(true)}
                                            >
                                                <h4>Ouça este artigo</h4>
                                                <FaPlay className={styles.playIconCompacto} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.colunaDireita}>
                                <div className={styles.imagemCapa}>
                                    <img src={artigo.url_imagem} alt={`Imagem de capa para o artigo: ${artigo.titulo}`} />
                                </div>

                                {artigo.tags && ( // necessario esperar carregar o artigo depois carrega as tags
                                    <div className={styles.tags}>
                                        {artigo.tags.map((tag, index) => (
                                            <span key={`${tag}-${index}`} className={styles.tag}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>

                        <section className={styles.artigosRelacionadosContainer}>
                            <div className={styles.relacionadosHeader}>
                                <h2 className={styles.tituloRelacionados}>Artigos relacionados</h2>
                                <Link to="/artigos" className={styles.verMaisBotao}>
                                    Ver mais artigos
                                </Link>
                            </div>
                            <div className={styles.cardsContainer}>
                                <ListaCards cards={artigosRelacionados} limite={limiteDeArtigos} />
                            </div>

                        </section>
                    </main>
                )}
                <Footer />
            </div>

            <AnimatePresence>
                {popupCompartilharAberto && (
                    <PopupCompartilhar
                        aoFechar={() => setPopupCompartilharAberto(false)}
                        link={artigoUrl}
                        imagem={artigo.url_imagem}
                        tipo="artigo"
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default PaginaDetalhesArtigo;