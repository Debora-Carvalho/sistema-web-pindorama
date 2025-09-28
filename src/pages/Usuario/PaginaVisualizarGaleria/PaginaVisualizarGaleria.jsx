import styles from './PaginaVisualizarGaleria.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

// import imagens from '../../../json/db-mock-imagens.json';
import ListaImagens from '../../../components/ListaImagens/ListaImagens.jsx';
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import { useGetEventos } from '../../../hooks/usuario/useGetEventos.js'

function PaginaVisualizarGaleria() {
    useTituloDocumento("Galeria | Pindorama"); // mudando o Title da pagina
    const { artigos, loading: artigosLoading, error: artigosError } = useGetArtigos();
    const { eventos, loading: eventosLoading, error: eventosError } = useGetEventos();

    if (artigosLoading || eventosLoading) {
        return <div>Carregando...</div>;
    }

    if (artigosError || eventosError) {
        return <div>Ocorreu um erro ao carregar os dados.</div>;
    }

    const imagens = [
        ...(artigos || []).map((item) => ({
            id: item.id,
            titulo: item.titulo,
            descricao: item.conteudo.replace(/<[^>]+>/g, ''),
            imagem: item.url_imagem,
            link: `/artigos/${item.id}`
        })),
        ...(eventos || []).map((item) => ({
            id: item.id,
            titulo: item.titulo,
            descricao: item.conteudo.replace(/<[^>]+>/g, ''),
            imagem: item.url_imagem,
            link: `/eventos/${item.id}`
        }))
    ];

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Galeria de fotos</h2>

                    <ListaImagens imagens={imagens} limite={null} />
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaVisualizarGaleria;