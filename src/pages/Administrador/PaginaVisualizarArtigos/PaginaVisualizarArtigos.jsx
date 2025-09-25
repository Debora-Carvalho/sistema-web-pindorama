import styles from './PaginaVisualizarArtigos.module.scss';
import CardPadraoArtigos from '../../../components/CardPadrao/Admin/CardPadraoArtigos.jsx';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';
import { motion } from 'framer-motion';

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
};

function PaginaVisualizarArtigosAdmin() {
    const artigosFake = [
        { id: 1, titulo: 'Inteligência Artificial no Brasil', imagem: 'https://images.unsplash.com/photo-1662692735672-544412d65934?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', url: '/artigo/1' },
        { id: 2, titulo: 'Agricultura Sustentável', imagem: 'https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', url: '/artigo/2' },
        { id: 3, titulo: 'Cultura Afro-Brasileira', imagem: 'https://museuafrobrasileiro.com.br/wp-content/uploads/2011/11/heitor_dos_prazeres.jpg', url: '/artigo/3' },
        { id: 4, titulo: 'Eventos de Tecnologia 2025', imagem: 'https://www.tiespecialistas.com.br/imagens/2022/09/evento-msp-summit-op3.jpeg', url: '/artigo/4' },
        { id: 5, titulo: 'Artes Visuais Contemporâneas', imagem: 'https://usfx.info/wp-content/uploads/2023/12/Povos_nativos_dos_5_continentes-1400x933.jpg', url: '/artigo/5' },
        { id: 6, titulo: 'Culinária Típica', imagem: 'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/12/comidas-tipicas-capa2019-01.jpg', url: '/artigo/6' },

    ];

    const handleSelect = (item) => {
        console.log("Selecionado:", item);
        alert(`Você selecionou: ${item.titulo}`);
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={pageTransition.transition}
        >
            <div className={styles.containerVisualizar}>
                <img className={styles.logo} src={Logo} alt="Logo do Pindorama" />
                <nav className={styles.navbar}>
                    <HeaderAdmin />
                </nav>
                <div className={styles.topo}>
                    <BarraPesquisa itens={artigosFake} onSelect={handleSelect} />
                    <button className={styles.btnAdicionar} onClick={() => window.location.href = "/adm/criar-artigo"}>
                        <BiSolidAddToQueue className={styles.iconAdd} />
                    </button>
                </div>
                <div className={styles.containerCards}>
                    {artigosFake.map(artigo => (
                        <CardPadraoArtigos
                            key={artigo.id}
                            id={artigo.id}
                            imagem={artigo.imagem}
                            titulo={artigo.titulo}
                            url={artigo.url}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default PaginaVisualizarArtigosAdmin;
