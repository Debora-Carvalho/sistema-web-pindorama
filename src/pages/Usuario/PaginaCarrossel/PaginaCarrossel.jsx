import EmblaCarousel from '../../../components/Carrossel/EmblaCarousel'
import Header from '../../../components/Header/Header'
import carrosselStyles from './PaginaCarrossel.module.scss'
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import Loading from '../../../components/Loading/Loading.jsx'

const PaginaCarrossel = () => {
    const OPTIONS = { dragFree: true, loop: true }

    const criarSumario = (htmlContent, maxLength = 200) => {
        const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
        const decodedTexto = doc.documentElement.textContent;

        const textoSemRefs = decodedTexto.replace(/\[\d+\]/g, '');

        const textoLimpo = textoSemRefs.replace(/<[^>]*>?/gm, '');

        if (textoLimpo.length > maxLength) {
            return `${textoLimpo.substring(0, maxLength)}...`;
        }
        return textoLimpo;
    };

    const { artigos, loading, error } = useGetArtigos();
    const slidesMapeados = artigos
        .filter(artigo => artigo.status === "publicado" && artigo.url_imagem)
        .map(artigo => ({
            imagem: artigo.url_imagem,
            titulo: artigo.titulo,
            subtitulo: criarSumario(artigo.conteudo),
            botao: 'Ver artigo completo'
        }));

    if (loading) return <Loading />
    if (error) return <p>Erro ao carregar artigos.</p>;

    return (
        <div>
            <div className={carrosselStyles.paginaCarrossel}>
                <Header
                    acessibilidadeOverride={carrosselStyles.overrideContainer}
                    overrideClass={carrosselStyles.headerOverride} />
            </div>
            <div className={carrosselStyles.carrosselFundo}>
                <EmblaCarousel slides={slidesMapeados} options={OPTIONS} />
            </div>
        </div>
    )
}

export default PaginaCarrossel