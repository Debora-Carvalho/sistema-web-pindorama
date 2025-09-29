import { useEffect, useState } from "react";
import styles from './PaginaVisualizarArtigos.module.scss';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';
import { useArtigos } from '../../../hooks/artigos/useArtigos.js';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import ListaCardsAdmin from '../../../components/ListaCards/Admin/ListaCardsAdmin.jsx';
// import artigos from '../../../json/db-mock-artigos.json';
import { useGetArtigosAdmin } from '../../../hooks/administradores/useGetArtigosAdmin.js';

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
};

function PaginaVisualizarArtigosAdmin() {
    const navigate = useNavigate();
    const { listarArtigos, deletarArtigo, loading, erro } = useArtigos();
    const [artigos, setArtigos] = useState([]);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        async function carregar() {
            try {
                const data = await listarArtigos();
                setArtigos(data);
            } catch (e) {
                console.error(e);
            }
        }
        carregar();
    }, []);

    const handleExcluir = async (id) => {
        await deletarArtigo(id);
        setArtigos((prev) => prev.filter((a) => a.id !== id));
    };

    const handleEditar = (id) => {
        navigate(`/adm/criar-artigo/${id}`);
    };

    const artigosFiltrados = artigos.filter((a) =>
        a.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    // adaptando artigos para o formato esperado pelo ListaCardsAdmin
    const artigosAdaptados = artigosFiltrados.map((a) => ({
        id: a.id,
        tipo: "artigo",
        titulo: a.titulo,
        url_imagem: a.url_imagem,
        link: `/artigo/${a.id}`,
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
                <img className={styles.logo} src={Logo} alt="Logo do Pindorama" onClick={() => navigate("/adm/inicio")} style={{ cursor: "pointer" }}/>
                <nav className={styles.navbar}>
                    <HeaderAdmin />
                </nav>
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
                    {loading && <p>Carregando artigos...</p>}
                    {erro && <p style={{ color: "red" }}>{erro}</p>}
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
