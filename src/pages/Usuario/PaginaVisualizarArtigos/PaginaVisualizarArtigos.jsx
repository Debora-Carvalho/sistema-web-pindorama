import styles from './PaginaVisualizarArtigos.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

// import artigos from "../../../json/db-mock-artigos.json";
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";

function PaginaVisualizarArtigos() {
    useTituloDocumento("Artigos | Pindorama"); // mudando o Title da pagina
    const { artigos, loading, error } = useGetArtigos();

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Artigos</h2>
                {/* Lembrar de colocar o component de carregamento e erro */}
                {loading && <p>Carregando artigos...</p>}
                {error && <p>Ocorreu um erro ao carregar os artigos: {error}</p>}
                    <ListaCards cards={artigos} limite={null} />
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaVisualizarArtigos;