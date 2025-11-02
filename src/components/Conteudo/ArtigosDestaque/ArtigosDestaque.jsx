import styles from "./ArtigosDestaque.module.scss";

import { Link } from "react-router-dom";

// import artigos from "../../../json/db-mock-artigos.json";
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import ListaCards from "../../ListaCards/Usuario/ListaCards.jsx";
import Loading from "../../Loading/Loading.jsx";
import { decodeHtml } from "../../../Helpers/decodeHtml.js";

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
                {loading && <Loading />}
                {error && <p>Ocorreu um erro ao carregar os artigos: {error}</p>}
                <Link to="/artigos" className={styles.btnVerMais}>Ver mais</Link>
            </div>

            <ListaCards cards={artigosAdaptados} limite={3} />
        </div>
    );
};


export default ArtigosDestaque;