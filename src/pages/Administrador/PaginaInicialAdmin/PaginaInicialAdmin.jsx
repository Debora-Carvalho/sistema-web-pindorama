import React, { useState } from 'react';
import styles from './PaginaInicialAdmin.module.scss';
import { Link } from 'react-router-dom'
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import { MdLibraryAdd } from "react-icons/md";
import ListaEventos from '../../../components/ListaEventos/ListaEventos.jsx';
import { FaArrowRight } from 'react-icons/fa';
import LogoPindorama from "../../../assets/images/pindorama_logo5.png";
import PopupCriar from '../../../components/Popups/PopupCriar/PopupCriar.jsx'
import { motion } from 'framer-motion';
import ListaCardsAdmin from '../../../components/ListaCards/Admin/ListaCardsAdmin.jsx';
import artigos from '../../../json/db-mock-artigos.json';
import useWindowSize from '../../../components/HeaderAdmin/useWindowSize.js';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import CardPadraoArtigos from '../../../components/CardPadrao/Admin/CardPadraoArtigos.jsx';
import { useGetArtigosAdmin } from '../../../hooks/administradores/useGetArtigosAdmin.js'
import { useGetEventosAdmin } from '../../../hooks/administradores/useGetEventosAdmin.js'

const getSaudacao = () => {
    const horaAtual = new Date().getHours();

    if (horaAtual >= 5 && horaAtual < 12) {
        return 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual < 18) {
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
};

const formatarDataEvento = (dataString) => {
    const data = new Date(dataString);
    const meses = [
        'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
        'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
    ];

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = meses[data.getMonth()];

    return { dia, mes };
};

// const mockEventos = [
//     { id: 1, dia: '04', mes: 'AGO', titulo: 'Palestra na FATEC...' },
//     { id: 2, dia: '04', mes: 'AGO', titulo: 'Palestra na FATEC...' },
//     { id: 3, dia: '04', mes: 'AGO', titulo: 'Palestra na FATEC...' },
//     { id: 4, dia: '04', mes: 'AGO', titulo: 'Palestra na FATEC...' },
// ];

// const artigosFake = [
//     { id: 1, titulo: 'Inteligência Artificial no Brasil', imagem: 'https://images.unsplash.com/photo-1662692735672-544412d65934?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', url: '/artigo/1' },
//     { id: 2, titulo: 'Agricultura Sustentável', imagem: 'https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', url: '/artigo/2' },
//     { id: 3, titulo: 'Cultura Afro-Brasileira', imagem: 'https://museuafrobrasileiro.com.br/wp-content/uploads/2011/11/heitor_dos_prazeres.jpg', url: '/artigo/3' },
//     { id: 4, titulo: 'Eventos de Tecnologia 2025', imagem: 'https://www.tiespecialistas.com.br/imagens/2022/09/evento-msp-summit-op3.jpeg', url: '/artigo/4' },
//     { id: 5, titulo: 'Artes Visuais Contemporâneas', imagem: 'https://usfx.info/wp-content/uploads/2023/12/Povos_nativos_dos_5_continentes-1400x933.jpg', url: '/artigo/5' },
// ];

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
};

function PaginaInicialAdmin() {
    const saudacaoTexto = getSaudacao();
    const [popupCriarAberto, setPopupCriarAberto] = useState(false);
    const { width } = useWindowSize();
    const limiteDeCards = width <= 1080 ? 4 : 3;
    const { id, loading: authLoading } = useAuth();
    const { artigos, loading: artigosLoading, error: artigosError } = useGetArtigosAdmin(id);
    const { eventos, loading: eventosLoading, error: eventosError } = useGetEventosAdmin(id);
    const artigosRecentes = artigos.slice(0, 3);
    const eventosFormatados = eventos.map(evento => ({
        ...evento,
        ...formatarDataEvento(evento.data)
    }));

    return (
        <>
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
                transition={pageTransition.transition}
            >
                <main className={styles.base}>
                    <img className={styles.logo} src={LogoPindorama} alt="Logo do site Pindorama" />
                    <HeaderAdmin />

                    <div className={styles.gridContainer}>

                        <h1 className={styles.saudacao}>{saudacaoTexto}, Admin!</h1>

                        <button type='button' className={styles.botaoCriar} onClick={() => setPopupCriarAberto(true)}>
                            <span className={styles.addIcon}><MdLibraryAdd /></span>
                            <div className={styles.criarTitles}>
                                <h2 className={styles.criarTitulo}>Crie sua nova história aqui!</h2>
                                <h3 className={styles.criarSubt}>Criação de artigos e eventos</h3>
                            </div>
                        </button>

                        <h2 className={styles.tituloSecao}>Próximos eventos</h2>

                        <div className={styles.listaEventosContainer}>
                            {eventosLoading ? (
                                <p>Carregando eventos...</p>
                            ) : eventosError ? (
                                <p>Erro ao carregar os eventos: {eventosError}</p>
                            ) : (
                                <ListaEventos eventos={eventosFormatados} />
                            )}
                        </div>

                        <section className={styles.secaoArtigos}>
                            <div className={styles.secaoHeader}>
                                <h2>Seus últimos artigos</h2>

                                <Link to="/adm/artigos" className={styles.verTodosBotaoMobile}>
                                    <span className={styles.verTodosTexto}>Ver todos</span>
                                    <FaArrowRight />
                                </Link>
                            </div>

                            <div className={styles.gridArtigos}>
                              {/* MERGE itar depois */}
                                <div className={styles.cardsWrapper}>
                                    <ListaCardsAdmin cards={artigos} limite={limiteDeCards} />
                                </div>

                                {/* EDITANDO Lembrar de colocar o component de carregamento e erro */}
                                {/* {authLoading || artigosLoading ? (
                                    <p>Carregando...</p>
                                ) : artigosError ? (
                                    <p>Ocorreu um erro ao carregar os artigos: {error}</p>
                                ) : (
                                    artigosRecentes.map(artigo => (
                                        <CardPadraoArtigos
                                            key={artigo.id}
                                            id={artigo.id}
                                            imagem={artigo.url_imagem}
                                            titulo={artigo.titulo}
                                            url={artigo.url}
                                        />
                                    ))
                                )} */}
                                <Link to="/adm/artigos" className={styles.verTodosBotao}>
                                    <span className={styles.verTodosTexto}>Ver todos</span>
                                    <FaArrowRight />
                                </Link>
                            </div>
                        </section>

                    </div>

                    <PopupCriar
                        aberto={popupCriarAberto}
                        onFechar={() => setPopupCriarAberto(false)}
                    />
                </main>
            </motion.div>
        </>
    )
}

export default PaginaInicialAdmin;