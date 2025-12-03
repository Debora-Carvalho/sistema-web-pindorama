// React and Style
import { useState } from "react";
import styles from './PaginaVisualizarArtigos.module.scss';
// Components
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import Loading from '../../../components/Loading/Loading.jsx';
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";
// Hooks e Helpers
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js';
import { decodeHtml } from "../../../Helpers/decodeHtml.js";

function PaginaVisualizarArtigos() {
    useTituloDocumento("Artigos | Pindorama"); // mudando o Title da pagina
    const { artigos, loading, error } = useGetArtigos();
    const [textoBusca, setTextoBusca] = useState("");

    const artigosAdaptados = artigos
        .filter(a => a.status === "publicado")
        .map(a => ({
            id: a.id,
            tipo: "artigo",
            titulo: a.titulo,
            url_imagem: a?.imagem?.url_imagem,
            conteudo: decodeHtml(a.conteudo),
            link: `/detalhes-artigo/${a.id}`
        }));

    const artigosFiltrados = artigosAdaptados.filter(a =>
        a.titulo.toLowerCase().includes(textoBusca.toLowerCase())
    );// filtro do texto da barra de pesquisa

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Artigos</h2>

                    <div className={styles.barraPesquisa}>
                        <BarraPesquisa
                            itens={artigosAdaptados}
                            onInputChange={setTextoBusca}
                            onSelect={(item) => setTextoBusca(item.titulo)}
                        />
                    </div>

                    {loading && <Loading/>}
                    {error && <p>Ocorreu um erro ao carregar os artigos: {error}</p>}
                    <ListaCards cards={artigosFiltrados} limite={null} />
                </main>

                <Footer />
            </div>
        </>
    );
}

export default PaginaVisualizarArtigos;