import styles from './PaginaVisualizarGaleria.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

function PaginaVisualizarGaleria() {
    useTituloDocumento("Galeria | Pindorama"); // mudando o Title da pagina

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    cards de Galeria
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaVisualizarGaleria;