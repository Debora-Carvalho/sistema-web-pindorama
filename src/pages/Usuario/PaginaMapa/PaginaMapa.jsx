import styles from './PaginaMapa.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

function PaginaMapa() {
    useTituloDocumento("Mapa | Pindorama"); // mudando o Title da pagina

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerMapa}>
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaMapa;