import styles from './PaginaVisualizarEventos.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

// import eventos from "../../../json/db-mock-eventos.json";
import { useGetEventos } from '../../../hooks/usuario/useGetEventos.js'
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";

function PaginaVisualizarEventos() {
    useTituloDocumento("Eventos | Pindorama"); // mudando o Title da pagina
    const { eventos, loading, error } = useGetEventos();

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Eventos</h2>
                {/* Lembrar de colocar o component de carregamento e erro */}
                {loading && <p>Carregando eventos...</p>}
                {error && <p>Ocorreu um erro ao carregar os eventos: {error}</p>}
                    <ListaCards cards={eventos} limite={null} />
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaVisualizarEventos;