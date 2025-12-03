// React and Style
import { useState } from 'react';
import styles from './PaginaVisualizarEventos.module.scss';
// Components
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import Loading from '../../../components/Loading/Loading.jsx';
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";
// Hooks e Helpers
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import { useGetEventos } from '../../../hooks/usuario/useGetEventos.js'
import { decodeHtml } from "../../../Helpers/decodeHtml.js";

function PaginaVisualizarEventos() {
    useTituloDocumento("Eventos | Pindorama"); // mudando o Title da pagina
    const { eventos, loading, error } = useGetEventos();
    const [textoBusca, setTextoBusca] = useState("");

    const eventosAdaptados = eventos
        .filter(e => e.status === "publicado")
        .map(e => ({
            id: e.id,
            tipo: "evento",
            titulo: e.titulo,
            url_imagem: e?.imagem?.url_imagem,
            conteudo: decodeHtml(e.conteudo),
            link: `/detalhes-evento/${e.id}`
        }));

    const eventosFiltrados = eventosAdaptados.filter(a =>
        a.titulo.toLowerCase().includes(textoBusca.toLowerCase())
    );// filtro do texto da barra de pesquisa

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Eventos</h2>

                    <div className={styles.barraPesquisa}>
                        <BarraPesquisa
                            itens={eventosAdaptados}
                            onInputChange={setTextoBusca}
                            onSelect={(item) => setTextoBusca(item.titulo)}
                        />
                    </div>

                    {loading && <Loading />}{/* Lembrar de colocar o component de carregamento e erro */}
                    {error && <p>Ocorreu um erro ao carregar os eventos: {error}</p>}
                    <ListaCards cards={eventosFiltrados} limite={null} />
                </main>

                <Footer />
            </div>
        </>
    )
}

export default PaginaVisualizarEventos;