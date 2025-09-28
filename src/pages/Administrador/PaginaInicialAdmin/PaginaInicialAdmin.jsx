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

const mockEventos = [
    { id: 1, dia: '04', mes: 'AGO', titulo: 'Palestra na FATEC...' },
    { id: 2, dia: '04', mes: 'AGO', titulo: 'Palestra na FATEC...' },
    { id: 3, dia: '04', mes: 'AGO', titulo: 'Palestra na FATEC...' },
    { id: 4, dia: '04', mes: 'AGO', titulo: 'Palestra na FATEC...' },
];

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
                            <ListaEventos eventos={mockEventos} />
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
                                <div className={styles.cardsWrapper}>
                                    <ListaCardsAdmin cards={artigos} limite={limiteDeCards} />
                                </div>

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