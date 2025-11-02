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
import { useArtigos } from '../../../hooks/artigos/useArtigos.js';
import { useNavigate } from "react-router-dom";
import Loading from '../../../components/Loading/Loading.jsx';
import Logotipo from '../../../components/Logotipo/Logotipo.jsx';

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

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
};

function PaginaInicialAdmin() {
    const saudacaoTexto = getSaudacao();
    const navigate = useNavigate();
    const [popupCriarAberto, setPopupCriarAberto] = useState(false);
    const { width } = useWindowSize();
    const limiteDeCards = width <= 1080 ? 4 : 3;
    const { id, loading: authLoading } = useAuth();
    const { artigos, loading: artigosLoading, error: artigosError } = useGetArtigosAdmin(id);
    const { eventos, loading: eventosLoading, error: eventosError } = useGetEventosAdmin(id);
    const { deletarArtigo } = useArtigos();
    const artigosRecentes = artigos.slice(0, 3);

    const eventosLimitados = eventos ? eventos.slice(0, 4) : [];

    const eventosFormatados = eventosLimitados.map(evento => ({
        ...evento,
        ...formatarDataEvento(evento.data)
    }));

    const handleExcluir = async (id) => {
        await deletarArtigo(id);
    };

    const handleEditar = (id) => {
        navigate(`/adm/criar-artigo/${id}`);
    };

    const artigosAdaptados = artigos.map((a) => ({
        id: a.id,
        tipo: "artigo",
        titulo: a.titulo,
        url_imagem: a.url_imagem,
        link: `/detalhes-artigo/${a.id}`,
        status: a.status
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
                    <header className={styles.header}>
                        <Logotipo tipo='admin' />
                        <HeaderAdmin />
                    </header>

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
                                <Loading />
                            ) : eventosError ? (
                                <p>Erro ao carregar os eventos: {eventosError}</p>
                            ) : (
                                <ListaEventos eventos={eventosFormatados} />
                            )}
                        </div>

                        <section className={styles.secaoArtigos}>
                            <div className={styles.secaoHeader}>
                                <h2>Seus últimos artigos</h2>

                                <Link to="/adm/visualizar-artigos" className={styles.verTodosBotaoMobile}>
                                    <span className={styles.verTodosTexto}>Ver todos</span>
                                    <FaArrowRight />
                                </Link>
                            </div>

                            <div className={styles.gridArtigos}>
                                {/* MERGE itar depois */}
                                <div className={styles.cardsWrapper}>
                                    <ListaCardsAdmin
                                        cards={artigosAdaptados}
                                        limite={limiteDeCards}
                                        actions={{
                                            onEditar: handleEditar,
                                            onExcluir: handleExcluir
                                        }}
                                    />
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
                                <Link to="/adm/visualizar-artigos" className={styles.verTodosBotao}>
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