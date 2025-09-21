import React from 'react';
import { Link } from 'react-router-dom'
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import styles from './PaginaInicialAdmin.module.scss';
import { MdLibraryAdd } from "react-icons/md";
import ListaEventos from '../../../components/ListaEventos/ListaEventos.jsx';
import CardArtigo from '../../../components/CardArtigo/CardArtigo.jsx'

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

function PaginaInicialAdmin() {
    const saudacaoTexto = getSaudacao();

    return (
        <>
            <main className={styles.base}>
                <img className={styles.logo} src="../../../Imagens/pindorama_logo5(pipa e solzinho).png" alt="" />
                <HeaderAdmin />

                <div className={styles.gridContainer}>

                    {/* Item 1 do Grid */}
                    <h1 className={styles.saudacao}>{saudacaoTexto}, Admin!</h1>

                    {/* Item 2 do Grid */}
                    <Link to='/admin/criar-artigo' className={styles.botaoCriar}>
                        <span className={styles.addIcon}><MdLibraryAdd /></span>
                        <div className={styles.criarTitles}>
                            <h2 className={styles.criarTitulo}>Crie sua nova história aqui!</h2>
                            <h3 className={styles.criarSubt}>Criação de artigos e eventos</h3>
                        </div>
                    </Link>

                    {/* Item 3 do Grid */}
                    <h2 className={styles.tituloSecao}>Próximos eventos</h2>

                    {/* Item 4 do Grid */}
                    <div className={styles.listaEventosContainer}>
                        <ListaEventos eventos={mockEventos} />
                    </div>

                </div>

                <section className={styles.secaoArtigos}>
                    <div className={styles.secaoHeader}>
                        <h2>Seus ultimos artigos</h2>
                        <Link to="/todos-os-artigos" className={styles.verTodosBotao}>
                            <FaArrowRight />
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PaginaInicialAdmin;