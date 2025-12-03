import { useState } from "react";
import styles from './PaginaVisualizarGaleria.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';

// import imagens from '../../../json/db-mock-imagens.json';
import ListaImagens from '../../../components/ListaImagens/ListaImagens.jsx';
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import { useGetEventos } from '../../../hooks/usuario/useGetEventos.js'
import Loading from '../../../components/Loading/Loading.jsx';

function PaginaVisualizarGaleria() {
    useTituloDocumento("Galeria | Pindorama"); // mudando o Title da pagina
    const { artigos, loading: artigosLoading, error: artigosError } = useGetArtigos();
    const { eventos, loading: eventosLoading, error: eventosError } = useGetEventos();

    const [textoBusca, setTextoBusca] = useState("");

    if (artigosLoading || eventosLoading) {
        return <Loading/>;
    }

    if (artigosError || eventosError) {
        return <div>Ocorreu um erro ao carregar os dados.</div>;
    }

    const imagens = [
        ...(artigos || [])
            .filter(item => item.status === "publicado" && item.url_imagem) 
            .map((item) => ({
                id: item.id,
                titulo: item.titulo,
                descricao: item?.imagem?.descricao,
                imagem: item?.imagem?.url_imagem,
                link: `/detalhes-artigo/${item.id}`
            })),

        ...(eventos || [])
            .filter(item => item.status === "publicado" && item.url_imagem) 
            .map((item) => ({
                id: item.id,
                titulo: item.titulo,
                descricao: item?.imagem?.descricao,
                imagem: item?.imagem?.url_imagem,
                link: `/eventos/${item.id}`
            }))
    ];

    // imagens filtradas pelo texto digitado (título da imagem)
    const imagensFiltradas = imagens.filter(img =>
        img.titulo.toLowerCase().includes(textoBusca.toLowerCase())
    );

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Galeria de fotos</h2>

                    <div className={styles.barraPesquisa}>
                        <BarraPesquisa
                            itens={imagens}
                            onInputChange={setTextoBusca}
                            onSelect={(item) => setTextoBusca(item.titulo)}
                        />
                    </div>

                    <ListaImagens imagens={imagensFiltradas} limite={null} />
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaVisualizarGaleria;