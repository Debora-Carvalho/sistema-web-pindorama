import styles from "./ProximosEventos.module.scss";

// import eventos from "../../../json/db-mock-eventos.json";
import { useGetEventos } from '../../../hooks/usuario/useGetEventos.js'
import ListaCards from "../../ListaCards/Usuario/ListaCards.jsx";

function ProximosEventos() {
    const { eventos, loading, error } = useGetEventos();

    return (
        <div className={styles.container}>
            <h2>
                Próximos Eventos
            </h2>

            {/* Lembrar de colocar o component de carregamento e erro */}
            {loading && <p>Carregando eventos...</p>}
            {error && <p>Ocorreu um erro ao carregar os eventos: {error}</p>}
            <ListaCards cards={eventos} limite={3} />
        </div>
    );
};

export default ProximosEventos;