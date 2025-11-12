// React and Style
import { useState } from "react";
import styles from './PaginaVisualizarArtigos.module.scss';
import { Link } from "react-router-dom";
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

    // Adaptando os artigos: filtrando apenas publicados e decodificando HTML
    const artigosAdaptados = artigos
        .filter(a => a.status === "publicado")
        .map(a => ({
            id: a.id,
            tipo: "artigo",
            titulo: a.titulo,
            url_imagem: a.url_imagem,
            conteudo: decodeHtml(a.conteudo),
            link: `/detalhes-artigo/${a.id}`
        }));


        
    // filtro do texto da barra de pesquisa
    const artigosFiltrados = artigosAdaptados.filter(a =>
        a.titulo.toLowerCase().includes(textoBusca.toLowerCase())
    );

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
                    
                    {/* Botão de voltar ou outros links podem ser adicionados */}
                    {/* <Link to="/" className={styles.btnVerMais}>Voltar para a home</Link> */}
                </main>

                <Footer />
            </div>
        </>
    );
}

export default PaginaVisualizarArtigos;
