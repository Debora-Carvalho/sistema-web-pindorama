import styles from './PaginaVisualizarArtigos.module.scss';
import CardPadraoArtigos from '../../../components/CardPadrao/Admin/CardPadraoArtigos.jsx';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';

function PaginaVisualizarArtigos() {
    
    return (
        <div className={styles.containerVisualizar}>
            <img className={styles.logo} src={Logo} alt="Logo do Pindorama" />
            <nav className={styles.navbar}>
                <HeaderAdmin />
            </nav>
            <div className={styles.topo}>
                <BarraPesquisa />
                <BiSolidAddToQueue className={styles.iconAdd} />
            </div>
            <div className={styles.containerCards}>
                <CardPadraoArtigos />
                <CardPadraoArtigos />
                <CardPadraoArtigos />
                <CardPadraoArtigos />
                <CardPadraoArtigos />
                <CardPadraoArtigos />
            </div>
        </div>
    )
}

export default PaginaVisualizarArtigos;