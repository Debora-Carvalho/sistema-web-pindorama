import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './PaginaDetalhesEvento.module.scss'
import useTituloDocumento from '../../../hooks/useTituloDocumento.js'
import windowSize from '../../../components/HeaderAdmin/useWindowSize.js'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import PopupCompartilhar from '../../../components/Popups/PopupCompartilhar/PopupCompartilhar.jsx'
import { AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify'
import capaImagem from '../../../assets/images/igreja-artigo.png'
import BtnCompartilhar from '../../../components/BtnCompartilhar/BtnCompartilhar.jsx'
import CardPadrao from '../../../components/CardPadrao/Usuario/CardPadrao/CardPadrao.jsx'
import capaRelacionado1 from '../../../assets/images/igreja-artigo.png'
import capaRelacionado2 from '../../../assets/images/igreja-artigo.png'
import capaRelacionado3 from '../../../assets/images/igreja-artigo.png'
import { formatarData } from "../../../Helpers/formatarDataHora.js"
import MiniPlayer from '../../../components/MiniPlayer/MiniPlayer.jsx'
import { FaPlay } from 'react-icons/fa'
import audioTeste from '../../../assets/audio/Final.mp3'

const mockEvento = {
    id: 1,
    titulo: "Festança de Forró",
    autora: "Feito por: Kelly",
    imagemCapa: capaImagem,
    local: "https://www.google.com/maps/place/Av.+Padre+José+Maria,+202+-+Santo+Amaro,+São+Paulo+-+SP,+04753-060/@-23.653867,-46.7115142,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce5054b5923947:0x2a11c1747845520f!8m2!3d-23.653867!4d-46.7089339!16s%2Fg%2F11c1k9bxvp?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D",
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

const mockRelacionados = [
    {
        id: 2,
        imagem: capaRelacionado1,
        tipo: 'evento',
        titulo: 'As Cores e Significados por Trás das Fitinhas do Bonfim',
        descricao: 'Cada cor tem um desejo, uma prece. Descubra o que cada fitinha do Bonfim representa e como essa tradição se espalhou pelo mundo.',
        link: '/artigo/2'
    },
    {
        id: 3,
        imagem: capaRelacionado2,
        tipo: 'evento',
        titulo: 'Um Roteiro Histórico pelo Pelourinho em Salvador',
        descricao: 'Caminhe pelas ruas de paralelepípedos e explore a rica história, arquitetura e cultura do coração de Salvador. Um guia completo para o seu passeio.',
        link: '/artigo/3'
    },
    {
        id: 4,
        imagem: capaRelacionado3,
        tipo: 'evento',
        titulo: 'A Culinária Baiana: Sabores que Contam Histórias',
        descricao: 'Do acarajé ao vatapá, a culinária da Bahia é uma experiência única. Conheça os pratos principais e onde encontrar os melhores sabores.',
        link: '/artigo/4'
    },
    {
        id: 5,
        imagem: capaRelacionado1,
        tipo: 'evento',
        titulo: 'Festas Juninas: A Tradição que Aquece o Coração do Brasil',
        descricao: 'Das quadrilhas coloridas às comidas típicas, explore a magia das festas de São João pelo país.',
        link: '/artigo/5'
    }
];

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

function PaginaDetalhesEvento({ evento = mockEvento }) {
    useTituloDocumento(`${evento.titulo} | Pindorama`)

    const [playerAtivado, setPlayerAtivado] = useState(false);

    const { width } = windowSize();
    const limiteDeEventos = width <= 1080 ? 4 : 3;

    const conteudoSeguro = DOMPurify.sanitize(evento.conteudoHTML);

    const [popupCompartilharAberto, setPopupCompartilharAberto] = useState(false);
    const eventoUrl = window.location.href;

    return (
        <>
            <div className={styles.container}>
                <Header />
                <main className={styles.conteudo}>
                    <div className={styles.headerEvento}>
                        <h1 className={styles.tituloEvento}>{evento.titulo}</h1>
                        <p className={styles.autora}>{evento.autora}</p>
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
                                    <strong>Data e Hora:</strong> {formatarData(evento.dataEvento, "datahora")}
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
                                        <h4>Ouça este artigo</h4>
                                        <FaPlay className={styles.playIconCompacto} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={styles.colunaDireita}>
                            <div className={styles.imagemCapa}>
                                <img src={evento.imagemCapa} alt={`Imagem de capa para o evento: ${evento.titulo}`} />
                            </div>

                            <div className={styles.botoesAcaoDireita}>
                                <div className={styles.tags}>
                                    {evento.tags.map((tag, index) => (
                                        <span key={`${tag}-${index}`} className={styles.tag}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className={styles.infoInferior}>
                                    <BtnCompartilhar
                                        className={styles.botaoShareLayout} // Passa a classe de layout
                                        onClick={() => setPopupCompartilharAberto(true)}
                                    />


                                </div>
                            </div>
                        </div>
                    </div>

                    <section className={styles.eventosRelacionadosContainer}>
                        <div className={styles.relacionadosHeader}>
                            <h2 className={styles.tituloRelacionados}>Eventos relacionados</h2>
                            <Link to="/artigos" className={styles.verMaisBotao}>
                                Ver mais Eventos
                            </Link>
                        </div>
                        <div className={styles.cardsContainer}>
                            {mockRelacionados.slice(0, limiteDeEventos).map((eventoRelacionado) => (
                                <CardPadrao
                                    key={eventoRelacionado.id}
                                    imagem={eventoRelacionado.imagem}
                                    tipo={eventoRelacionado.tipo}
                                    titulo={eventoRelacionado.titulo}
                                    descricao={eventoRelacionado.descricao}
                                    link={eventoRelacionado.link}
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
                        imagem={evento.imagemCapa}
                        tipo="evento"
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default PaginaDetalhesEvento;