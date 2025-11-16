// React and Style
import styles from "./ArtigosDestaque.module.scss";
import { Link } from "react-router-dom";
// Components
import ListaCards from "../../ListaCards/Usuario/ListaCards.jsx";
// Hooks and Helpers
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import { decodeHtml } from "../../../Helpers/decodeHtml.js";
import Loading from "../../Loading/Loading.jsx";

function ArtigosDestaque() {
    const { artigos, loading, error } = useGetArtigos();

    const artigosAdaptados = artigos
        .filter(a => a.status === "publicado")
        .map(a => ({
            id: a.id,
            tipo: "artigo", // mandando o tipo pra pegar o titulo correto
            titulo: a.titulo, //titulo não vem em html
            url_imagem: a.url_imagem,
            conteudo: decodeHtml(a.conteudo),
            link: `/detalhes-artigo/${a.id}`
        }));

    return (
        <div className={styles.container}>
            <div className={styles.containerTopo}>
                <h2>Destaques</h2>
                {error && <p>Ocorreu um erro ao carregar os artigos: {error}</p>}
                <Link to="/artigos" className={styles.btnVerMais}>Ver mais</Link>
            </div>
            {loading && <Loading />}
            <ListaCards cards={artigosAdaptados} limite={3} />
        </div>
    );
};


export default ArtigosDestaque;