import styles from './PaginaNaoEncontrado.module.scss';
import { Link } from 'react-router-dom';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

import { AiFillHome } from "react-icons/ai";
import IconApoio from "../../assets/icons/icon-tamandua.png";

function PaginaNaoEncontrado() {
    useTituloDocumento("Ops! Página não encontrada | Pindorama"); // mudando o Title da pagina

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Ops!</h2>
                    <p>A página que você está tentando acessar não foi encontrada.</p>

                    <img src={IconApoio} className={styles.iconApoio} alt="Ícone de apoio - Tamanduá" />

                    <Link to="/inicio" className={styles.btnVoltar}>
                        <AiFillHome className={styles.btnVoltarIcon} /> 
                        Voltar para a página inicial
                    </Link>
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaNaoEncontrado;