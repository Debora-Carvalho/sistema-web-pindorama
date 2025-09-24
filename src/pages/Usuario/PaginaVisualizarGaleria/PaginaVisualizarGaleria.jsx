import styles from './PaginaVisualizarGaleria.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

import imagens from '../../../json/db-mock-imagens.json';
import ListaImagens from '../../../components/ListaImagens/ListaImagens.jsx';

function PaginaVisualizarGaleria() {
    useTituloDocumento("Galeria | Pindorama"); // mudando o Title da pagina

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Galeria de fotos</h2>

                    <ListaImagens cards={imagens} limite={null} />
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaVisualizarGaleria;