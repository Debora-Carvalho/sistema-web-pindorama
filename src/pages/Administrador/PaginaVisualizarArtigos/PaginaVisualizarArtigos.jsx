import styles from './PaginaVisualizarArtigos.module.scss';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import { useArtigos } from '../../../hooks/artigos/useArtigos.js';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import ListaCardsAdmin from '../../../components/ListaCards/Admin/ListaCardsAdmin.jsx';
import { useGetArtigosAdmin } from '../../../hooks/administradores/useGetArtigosAdmin.js';
import Loading from "../../../components/Loading/Loading.jsx";
import Logotipo from "../../../components/Logotipo/Logotipo.jsx";

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
};

function PaginaVisualizarArtigosAdmin() {
    const { id, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { artigos, loading: artigosLoading, error: artigosError } = useGetArtigosAdmin(id);
    const { deleteArtigo } = useArtigos();

    const handleExcluir = async (id) => {
        await deleteArtigo(id);
    };

    const handleEditar = (id) => {
        navigate(`/adm/criar-artigo/${id}`);
    };

    const artigosAdaptados = artigos.map((a) => ({
        id: a.id,
        tipo: "artigo",
        titulo: a.titulo,
        url_imagem: a.url_imagem,
        link: `/detalhes-artigo/${a.id}`,
        status: a.status
    }));

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={pageTransition.transition}
        >
            <div className={styles.containerVisualizar}>
                <div className={styles.header}>
                    <Logotipo tipo='admin' />
                    <HeaderAdmin />
                </div>
                <div className={styles.topo}>
                    <BarraPesquisa
                        itens={artigos}
                        onSelect={(item) => console.log("Selecionado:", item)}
                        onInputChange={(valor) => setFiltro(valor)}
                    />
                    <button
                        className={styles.btnAdicionar}
                        onClick={() => window.location.href = "/adm/criar-artigo"}
                    >
                        <BiSolidAddToQueue className={styles.iconAdd} />
                    </button>
                </div>
                <div className={styles.containerCards}>
                    {artigosLoading && <Loading />}
                    <ListaCardsAdmin
                        cards={artigosAdaptados}
                        limite={null}
                        actions={{
                            onEditar: handleEditar,
                            onExcluir: handleExcluir
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default PaginaVisualizarArtigosAdmin;