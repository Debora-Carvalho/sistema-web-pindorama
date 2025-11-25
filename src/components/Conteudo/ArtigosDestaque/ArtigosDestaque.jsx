// React and Style
import styles from "./ArtigosDestaque.module.scss";
import { Link } from "react-router-dom";
// Components
import ListaCards from "../../ListaCards/Usuario/ListaCards.jsx";
// Hooks and Helpers
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import { decodeHtml } from "../../../Helpers/decodeHtml.js";
import Loading from "../../Loading/Loading.jsx";

const LIMITE_CARDS = 3;

function ArtigosDestaque() {
    const { artigos, loading, error } = useGetArtigos();

    const artigosDestacados = artigos
        // Filtra apenas os artigos com status "destacado"
        .filter(a => a.status === "destacado")
        // Ordena por ID decrescente para ter os mais recentes primeiro
        .sort((a, b) => b.id - a.id) 
        .map(a => ({
            id: a.id,
            tipo: "artigo",
            titulo: a.titulo,
            url_imagem: a.url_imagem,
            conteudo: decodeHtml(a.conteudo),
            link: `/detalhes-artigo/${a.id}`
        }));

    const artigosPublicados = artigos
        // Filtra os artigos que são "publicado" (mas não "destacado")
        .filter(a => a.status === "publicado")
        // Ordena por ID decrescente para ter os mais recentes primeiro
        .sort((a, b) => b.id - a.id) 
        .map(a => ({
            id: a.id,
            tipo: "artigo",
            titulo: a.titulo,
            url_imagem: a.url_imagem,
            conteudo: decodeHtml(a.conteudo),
            link: `/detalhes-artigo/${a.id}`
        }));

    // 2. COMBINAR AS LISTAS: Destacados primeiro, seguidos pelos Publicados
    let artigosCombinados = [...artigosDestacados, ...artigosPublicados];

    // Pegamos apenas os primeiros LIMITE_CARDS (3) artigos da lista combinada
    const artigosAdaptados = artigosCombinados.slice(0, LIMITE_CARDS);

    return (
        <div className={styles.container}>
            <div className={styles.containerTopo}>
                <h2>Destaques</h2>
                {error && <p>Ocorreu um erro ao carregar os artigos: {error}</p>}
                <Link to="/artigos" className={styles.btnVerMais}>Ver mais</Link>
            </div>
            {loading && <Loading />}
            {/* O limite já foi aplicado na variável artigosAdaptados, 
                mas mantemos o prop por segurança */}
            <ListaCards cards={artigosAdaptados} limite={LIMITE_CARDS} />
        </div>
    );
};


export default ArtigosDestaque;