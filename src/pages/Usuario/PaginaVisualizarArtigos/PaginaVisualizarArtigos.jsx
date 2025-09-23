import styles from './PaginaVisualizarArtigos.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

function PaginaVisualizarArtigos() {
    useTituloDocumento("Artigos | Pindorama"); // mudando o Title da pagina

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    cards de artigos
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaVisualizarArtigos;