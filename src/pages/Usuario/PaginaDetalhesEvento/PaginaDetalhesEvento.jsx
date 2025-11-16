// React and Style
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './PaginaDetalhesEvento.module.scss'
import { AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify'
import { FaPlay } from 'react-icons/fa'
// Components
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import Loading from '../../../components/Loading/Loading.jsx';
import MiniPlayer from '../../../components/MiniPlayer/MiniPlayer.jsx'
import audioTeste from '../../../assets/audio/Final.mp3'
import PopupCompartilhar from '../../../components/Popups/PopupCompartilhar/PopupCompartilhar.jsx'
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";
import BtnCompartilhar from '../../../components/BtnCompartilhar/BtnCompartilhar.jsx'
// Hooks and Helpers
import useTituloDocumento from '../../../hooks/useTituloDocumento.js'
import { useGetEventos } from '../../../hooks/usuario/useGetEventos.js'
import { useGetEventoById } from '../../../hooks/Eventos/useGetEventoById.js'
import { decodeHtml } from "../../../Helpers/decodeHtml.js";
import { formatarData } from "../../../Helpers/formatarDataHora.js"

import windowSize from '../../../components/HeaderAdmin/useWindowSize.js'

function formatarLinkLocal(link) {
    try {
        const url = new URL(link);
        if (url.hostname.includes("google.com") && url.pathname.includes("/maps")) {
            return "Link para o Google Maps";
        }
        if (url.hostname.includes("meet.google.com")) {
            return "Acessar sala no Google Meet";
        }
    } catch (e) {
        return link;
    }
    return "Acessar link do local";
}

function PaginaDetalhesEvento() {
    const [playerAtivado, setPlayerAtivado] = useState(false);
    
    const { id } = useParams();
    const { evento, loading: loadingEvento, error: errorEvento } = useGetEventoById();
    const { eventos, loading: loadingLista, error: errorLista } = useGetEventos();
    const eventosAdaptados = eventos
        .filter(e => e.status === "publicado")
        .filter(e => e.id !== Number(id)) // exclui o artigo que ta mostrando
        .map(e => {
            const adaptado = {
            id: e.id,
            tipo: "evento",
            titulo: e.titulo,
            url_imagem: e.url_imagem,
            conteudo: decodeHtml(e.conteudo),
            link: `/detalhes-evento/${e.id}`,
            tags: e.tags
        };
        return adaptado;
        });
    const { width } = windowSize();
    const limiteDeEventos = width <= 1080 ? 4 : 3;

    const eventosRelacionados = eventosAdaptados.filter(e => {
        if (!e.tags || !evento.tags) return false;// verifica se ambos tem tags
        return e.tags.some(tag => evento.tags.includes(tag));// aqui verifica se tem alguma tag em comum
    });

    useTituloDocumento(evento ? `${evento.titulo} | Pindorama` : "Evento | Pindorama");
    const conteudoSeguro = DOMPurify.sanitize(evento.conteudoHTML || evento.conteudo || '');
    const [popupCompartilharAberto, setPopupCompartilharAberto] = useState(false);
    const eventoUrl = window.location.href;

    const tagsEvento = evento.tags || [];
    const dataformatada = formatarData(evento.data, "datahora");
    const autoraTexto = evento.autor

    return (
        <>
            <div className={styles.container}>
                <Header />
                {(loadingEvento || loadingLista) ? (
                    <Loading />
                ) : (
                    <main className={styles.conteudo}>
                        <div className={styles.headerEvento}>
                            <h1 className={styles.tituloEvento}>{evento.titulo}</h1>
                            <p className={styles.autora}>{autoraTexto.nome}</p>
                        </div>

                        <div className={styles.conteudoPrincipal}>
                            <div className={styles.colunaEsquerda}>
                                <div className={styles.textoContainer}>
                                    <div
                                        className={styles.corpoTexto}
                                        dangerouslySetInnerHTML={{ __html: conteudoSeguro }}
                                    />
                                </div>

                                <div className={styles.infoLocalEvento}>
                                    <p>
                                        <strong>Local: </strong>
                                        <a
                                            href={evento.local}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {formatarLinkLocal(evento.local)}
                                        </a>
                                    </p>
                                    <p>
                                        <strong>Data e Hora:</strong> {dataformatada}
                                    </p>
                                </div>

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
                                            <h4>Ouça este Evento</h4>
                                            <FaPlay className={styles.playIconCompacto} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className={styles.colunaDireita}>
                                <div className={styles.imagemCapa}>
                                    <img src={evento.url_imagem} alt={`Imagem de capa para o evento: ${evento.titulo}`} />
                                </div>

                                <div className={styles.botoesAcaoDireita}>
                                    <div className={styles.tags}>
                                        {tagsEvento.map((tag, index) => (
                                            <span key={`${tag}-${index}`} className={styles.tag}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className={styles.infoInferior}>
                                        <BtnCompartilhar
                                            className={styles.botaoShareLayout} 
                                            onClick={() => setPopupCompartilharAberto(true)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className={styles.eventosRelacionadosContainer}>
                            <div className={styles.relacionadosHeader}>
                                <h2 className={styles.tituloRelacionados}>Eventos relacionados</h2>
                                <Link to="/eventos" className={styles.verMaisBotao}>
                                    Ver mais Eventos
                                </Link>
                            </div>
                            <div className={styles.cardsContainer}>
                                <ListaCards cards={eventosRelacionados} limite={limiteDeEventos} />
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
                        link={eventoUrl}
                        imagem={evento.url_imagem}
                        tipo="evento"
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default PaginaDetalhesEvento;