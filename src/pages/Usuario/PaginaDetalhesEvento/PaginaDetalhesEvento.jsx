import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './PaginaDetalhesEvento.module.scss'
import useTituloDocumento from '../../../hooks/useTituloDocumento.js'
import windowSize from '../../../components/HeaderAdmin/useWindowSize.js'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import PopupCompartilhar from '../../../components/Popups/PopupCompartilhar/PopupCompartilhar.jsx'
import { AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify'
import capaImagem from '../../../assets/images/forro-evento.jpg'
import { FaRegPaperPlane, FaExpandAlt, FaCompressAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import useMediaQuery from '../../../hooks/useMediaQuery.js'
import CardPadrao from '../../../components/CardPadrao/Usuario/CardPadrao/CardPadrao.jsx'
import { useEventos } from '../../../hooks/Eventos/useEventos.js';

// Mock para fallback (será removido quando o backend funcionar)
const mockEvento = {
    id: 1,
    titulo: "Festança de Forró",
    autora: "Feito por: Kelly",
    imagemCapa: capaImagem,
    local: "https://www.google.com/maps/place/Av.+Padre+José+Maria,+202+-+Santo+Amaro,+São+Paulo+-+SP,+04753-060/@-23.653867,-46.7115142,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce5054b5923947:0x2a11c1747845520f!8m2!3d-23.653867!4d-46.7089339!16s%2Fg%2F11c1k9bxvp?entry=ttu&g_ep=EgoyMDI1MTAxNC.0wIKXMDSoASAFQAw%3D%3D",
    dataEvento: "2025-08-13T12:00:00",
    conteudoHTML: `
        <h2>🎶 A Sanfona Vai Tocar! Prepare-se para uma Festa de Forró Inesquecível!</h2>
        <p>Prepare-se para uma noite mágica, onde a sanfona chora, a zabumba bate e o triângulo não para!</p>
        <p>Temos o prazer de convidar você para a nossa grande festa de forró, um evento pensado para celebrar a alegria da nossa música e da nossa dança.</p>
        <p>A noite será comandada por <strong>shows ao vivo</strong> de tirar o fôlego, com bandas que trazem a autêntica energia do forró. Do xote romântico ao baião acelerado, a diversão é garantida!</p>
        <p>E o mais importante: teremos um <strong>espaçoso salão de dança</strong> esperando por você. Não importa se você dança há anos ou se só quer arriscar os primeiros passos, o clima será de pura festa e confraternização.</p>
        <p>Junte os amigos e venha viver essa experiência!</p>
    `,
    tags: ["Dança", "Festa", "Forró", "Nordeste"]
};

function formatarDataHoraEvento(dataString) {
    const data = new Date(dataString);
    const opcoes = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Intl.DateTimeFormat('pt-BR', opcoes).format(data).replace(',', ' às');
}

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
    const { id } = useParams();
    const { buscarEvento, listarEventos, loading, erro } = useEventos();
    const [evento, setEvento] = useState(null);
    const [eventosRelacionados, setEventosRelacionados] = useState([]);

    // Carrega o evento específico
    useEffect(() => {
        const carregarEvento = async () => {
            if (id) {
                try {
                    const eventoData = await buscarEvento(id);
                    setEvento(eventoData);
                } catch (err) {
                    console.error('Erro ao carregar evento:', err);
                    // Fallback para mock enquanto o backend não funciona
                    setEvento(mockEvento);
                }
            }
        };
        carregarEvento();
    }, [id]); // CORRIGIDO: removido buscarEvento

    // Carrega eventos relacionados
    useEffect(() => {
        const carregarRelacionados = async () => {
            try {
                const todosEventos = await listarEventos();
                const relacionados = todosEventos
                    .filter(e => e.id !== parseInt(id))
                    .slice(0, 4);
                setEventosRelacionados(relacionados);
            } catch (err) {
                console.error('Erro ao carregar eventos relacionados:', err);
            }
        };
        if (id) {
            carregarRelacionados();
        }
    }, [id]); //  CORRIGIDO: removido listarEventos

    const { width } = windowSize();
    const limiteDeEventos = width <= 1080 ? 4 : 3;

    const [popupCompartilharAberto, setPopupCompartilharAberto] = useState(false);
    const eventoUrl = window.location.href;

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

    // Use título do evento real ou fallback
    useTituloDocumento(evento ? `${evento.titulo} | Pindorama` : "Evento | Pindorama");

    // Loading state
    if (loading) return <div className={styles.loading}>Carregando evento...</div>;
    if (!evento) return <div className={styles.error}>Evento não encontrado</div>;

    // Ajustado para a estrutura real da API (quando funcionar) ou mock
    const conteudoSeguro = DOMPurify.sanitize(evento.conteudoHTML || evento.conteudo || '');
    const imagemEvento = evento.imagemCapa || evento.url_imagem || capaImagem;
    const tagsEvento = evento.tags || [];
    const dataEvento = evento.dataEvento || evento.data;
    const autoraTexto = evento.autora || `Feito por: ${evento.autor_id === 7 ? 'Kelly' : 'Autor desconhecido'}`;

    return (
        <>
            <div className={styles.container}>
                <Header />
                <main className={styles.conteudo}>
                    <div className={styles.headerEvento}>
                        <h1 className={styles.tituloEvento}>{evento.titulo}</h1>
                        <p className={styles.autora}>{autoraTexto}</p>
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
                                    <strong>Data e Hora:</strong> {formatarDataHoraEvento(dataEvento)}
                                </p>
                            </div>
                        </div>

                        <div className={styles.colunaDireita}>
                            <div className={styles.imagemCapa}>
                                <img src={imagemEvento} alt={`Imagem de capa para o evento: ${evento.titulo}`} />
                            </div>

                            <div className={styles.botoesAcaoDireita}>
                                <div className={styles.tags}>
                                    {tagsEvento.map((tag, index) => (
                                        <span key={`${tag}-${index}`} className={styles.tag}>
                                            #{tag}
                                        </span>
                                    ))}
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
                                    >
                                        Compartilhar
                                    </motion.span>
                                </motion.button>
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
                            {eventosRelacionados.slice(0, limiteDeEventos).map((eventoRelacionado) => (
                                <CardPadrao
                                    key={eventoRelacionado.id}
                                    imagem={eventoRelacionado.url_imagem || capaImagem}
                                    tipo={'evento'}
                                    titulo={eventoRelacionado.titulo}
                                    descricao={(eventoRelacionado.conteudo || '').substring(0, 100) + '...'}
                                    link={`/detalhes-evento/${eventoRelacionado.id}`}
                                />
                            ))}
                        </div>
                    </section>

                </main>
                <Footer />
            </div>

            <AnimatePresence>
                {popupCompartilharAberto && (
                    <PopupCompartilhar
                        aoFechar={() => setPopupCompartilharAberto(false)}
                        link={eventoUrl}
                        imagem={imagemEvento}
                        tipo="evento"
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default PaginaDetalhesEvento;