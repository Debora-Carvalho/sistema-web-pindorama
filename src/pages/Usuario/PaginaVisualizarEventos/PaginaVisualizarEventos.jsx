import styles from './PaginaVisualizarEventos.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

import eventos from "../../../json/db-mock-eventos.json";
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";

function PaginaVisualizarEventos() {
    useTituloDocumento("Eventos | Pindorama"); // mudando o Title da pagina

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Eventos</h2>
                    
                    <ListaCards cards={eventos} limite={null} />
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaVisualizarEventos;