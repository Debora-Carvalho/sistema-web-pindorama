import React, { useState , useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './PaginaDetalhesArtigo.module.scss'
import useTituloDocumento from '../../../hooks/useTituloDocumento.js'
import windowSize from '../../../components/HeaderAdmin/useWindowSize.js'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import PopupCompartilhar from '../../../components/Popups/PopupCompartilhar/PopupCompartilhar.jsx'
import { AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify'
import capaImagem from '../../../assets/images/igreja-artigo.png'
import { FaRegPaperPlane, FaExpandAlt, FaCompressAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import useMediaQuery from '../../../hooks/useMediaQuery.js'

import { useArtigos } from '../../../hooks/artigos/useArtigos.js';
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js';
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";
import { useGetArtigoById } from '../../../hooks/artigos/useGetArtigoById.js'
import Loading from '../../../components/Loading/Loading.jsx';
import { decodeHtml } from "../../../Helpers/decodeHtml.js";

function PaginaDetalhesArtigo() {
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
    
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useMediaQuery('(max-width: 1080px)');
    const [isTextoExpanded, setIsTextoExpanded] = useState(false);

    const buttonVariants = {
        initial: { width: '3.5rem', padding: '8px 40px', gap: '0rem' },
        hover: { width: '12rem', padding: '8px 20px', gap: '0.8rem' },
    };

    const textVariants = {
        initial: { opacity: 0, width: 0, x: -10 },
        hover: { opacity: 1, width: 'auto', x: 0 },
    };

    return (
        <>
            <div className={styles.container}>
                <Header />
                {( loadingArtigo || loadingLista) ? (
                <Loading />
                ) : (
                <main className={styles.conteudo}>
                    <div className={styles.headerArtigo}>
                        <div className={styles.infoTitulo}>
                            <h1 className={styles.tituloArtigo}>{artigo.titulo}</h1>
                            {/* <p className={styles.dataPublicacao}>
                              Publicado em: {formatarDataPorExtenso(artigo.dataPublicacao)}
                            </p> Comentado pela anahi*/} 
                        </div>
                        <p className={styles.autora}>Kelly Cristina Marques</p>{/* {artigo.autor_id} Deveria ser usado, mas sem tempo*/}
                    </div>

                    <div className={styles.conteudoPrincipal}>
                        <div className={styles.colunaEsquerda}>
                            <div className={styles.textoContainer}>
                                <div
                                    className={`${styles.corpoTexto} ${isTextoExpanded ? styles.expanded : ''}`}
                                    dangerouslySetInnerHTML={{ __html: conteudoSeguro }}
                                />

                                <button
                                    className={styles.expandButton}
                                    onClick={() => setIsTextoExpanded(!isTextoExpanded)}
                                    aria-label={isTextoExpanded ? "Recolher texto" : "Expandir texto"}
                                >
                                    {isTextoExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
                                </button>
                            </div>

                            <motion.button
                                className={styles.botaoShare}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                variants={buttonVariants}
                                initial="initial"
                                animate={isMobile || isHovered ? "hover" : "initial"}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                onClick={() => setPopupCompartilharAberto(true)}
                            >
                                <FaRegPaperPlane className={styles.faRegPaperPlane} />
                                <motion.span
                                    className={styles.shareText}
                                    variants={textVariants}
                                    initial="initial"
                                    animate={isMobile || isHovered ? "hover" : "initial"}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    onClick={() => setPopupCompartilharAberto(true)}
                                >
                                    Compartilhar
                                </motion.span>
                            </motion.button>
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
                        imagem={artigo.imagemCapa}
                        tipo="artigo"
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default PaginaDetalhesArtigo;