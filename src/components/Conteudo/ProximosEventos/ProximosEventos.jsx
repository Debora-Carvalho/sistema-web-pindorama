// React and Style
import styles from "./ProximosEventos.module.scss";
import { Link } from "react-router-dom";
// Components
import ListaCards from "../../ListaCards/Usuario/ListaCards.jsx";
// Hooks and Helpers
import { useGetEventos } from '../../../hooks/usuario/useGetEventos.js'
import { decodeHtml } from "../../../Helpers/decodeHtml.js";
import Loading from "../../Loading/Loading.jsx";

function ProximosEventos() {
    const { eventos, loading, error } = useGetEventos();

    const eventosAdaptados = eventos
    .filter(e => e.status === "publicado")
    .map(e => ({
        id: e.id,
        tipo: "evento",
        titulo: e.titulo,
        url_imagem: e.url_imagem,
        conteudo: decodeHtml(e.conteudo),
        link: `/detalhes-evento/${e.id}`
    }));

    return (
        <div className={styles.container}>
            <div className={styles.containerTopo}>
            <h2>Próximos Eventos</h2>
            {error && <p>Ocorreu um erro ao carregar os eventos: {error}</p>}
            <Link to="/eventos" className={styles.btnVerMais}>Ver mais</Link>
            </div>
            {loading && <Loading />}
            <ListaCards cards={eventosAdaptados} limite={3} />
        </div>

    );
};

export default ProximosEventos;