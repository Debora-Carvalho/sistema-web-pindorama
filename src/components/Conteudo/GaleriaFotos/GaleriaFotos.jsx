import styles from "./GaleriaFotos.module.scss";
import { Link } from "react-router-dom";

import ListaImagens from "../../ListaImagens/ListaImagens.jsx";
import { useGetArtigos } from '../../../hooks/usuario/useGetArtigos.js'
import { useGetEventos } from '../../../hooks/usuario/useGetEventos.js'

function GaleriaFotos() {
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
        <div className={styles.container}>
            <div className={styles.containerTopo}>
                <h2>
                    Galeria de fotos
                </h2>

                <Link to="/galeria" className={styles.btnVerMais}>
                    Ver mais
                </Link>
            </div>

            <ListaImagens imagens={imagens} limite={4} />

        </div>
    );
};

export default GaleriaFotos;