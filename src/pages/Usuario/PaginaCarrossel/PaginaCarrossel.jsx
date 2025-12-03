import EmblaCarousel from '../../../components/Carrossel/EmblaCarousel'
import Header from '../../../components/Header/Header'
import carrosselStyles from './PaginaCarrossel.module.scss'
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import Loading from '../../../components/Loading/Loading.jsx'
import { decodeHtml } from '../../../Helpers/decodeHtml.js'

const PaginaCarrossel = () => {
    const OPTIONS = { dragFree: true, loop: true }

    const criarSumario = (htmlContent, maxLength = 100) => {
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
            imagem: artigo?.imagem?.url_imagem,
            titulo: artigo.titulo,
            subtitulo: criarSumario(artigo.conteudo),
            botao: 'Ver artigo completo',
            link: `/detalhes-artigo/${artigo.id}`
        }));

    if (loading) return <Loading />
    if (error) return <p>Erro ao carregar artigos.</p>;

    return (
        <div>
            <div className={carrosselStyles.paginaCarrossel}>
                <Header
                    acessibilidadeOverride={carrosselStyles.overrideContainer}
                    overrideClass={carrosselStyles.headerOverride} 
                    ocultarAcessibilidade
                />
            </div>
            <div className={carrosselStyles.carrosselFundo}>
                <EmblaCarousel slides={slidesMapeados} options={OPTIONS} />
            </div>
        </div>
    )
}

export default PaginaCarrossel