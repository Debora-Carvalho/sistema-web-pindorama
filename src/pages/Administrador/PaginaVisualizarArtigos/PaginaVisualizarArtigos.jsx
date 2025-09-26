import styles from './PaginaVisualizarArtigos.module.scss';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';
import { motion } from 'framer-motion';

import ListaCardsAdmin from '../../../components/ListaCards/Admin/ListaCardsAdmin.jsx';
import artigos from '../../../json/db-mock-artigos.json';

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
};

function PaginaVisualizarArtigosAdmin() {
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
                    <BarraPesquisa itens={artigos} onSelect={handleSelect} />
                    <button className={styles.btnAdicionar} onClick={() => window.location.href = "/adm/criar-artigo"}>
                        <BiSolidAddToQueue className={styles.iconAdd} />
                    </button>
                </div>
                <div className={styles.containerCards}>
                    <ListaCardsAdmin cards={artigos} limite={null} />
                </div>
            </div>
        </motion.div>
    )
}

export default PaginaVisualizarArtigosAdmin;
