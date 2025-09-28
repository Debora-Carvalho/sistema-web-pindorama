import styles from "./ArtigosDestaque.module.scss";

import { Link } from "react-router-dom";

// import artigos from "../../../json/db-mock-artigos.json";
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import ListaCards from "../../ListaCards/Usuario/ListaCards.jsx";

function ArtigosDestaque() {
    const { artigos, loading, error } = useGetArtigos();
    
    return (
        <div className={styles.container}>
            <div className={styles.containerTopo}>
                <h2>
                    Destaques
                </h2>
                {/* Lembrar de colocar o component de carregamento e erro */}
                {loading && <p>Carregando artigos...</p>}
                {error && <p>Ocorreu um erro ao carregar os artigos: {error}</p>}
                <Link to="/artigos" className={styles.btnVerMais}>
                    Ver mais
                </Link>
            </div>

            <ListaCards cards={artigos} limite={3} />
        </div>
    );
};

export default ArtigosDestaque;