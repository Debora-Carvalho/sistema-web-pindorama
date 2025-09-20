import styles from './PaginaVisualizarArtigos.module.scss';
import CardPadrao from '../../../components/CardPadrao/CardPadrao.jsx';
import BarraDePesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";


function PaginaVisualizarArtigos() {
    return (
        <div className={styles.containerVisualizar}>
            <nav className={styles.navbar}>

            </nav>
        <div className={styles.topo}>
             <BarraDePesquisa />
             <BiSolidAddToQueue  className={styles.iconAdd}/>
        </div>
            <CardPadrao />
        </div>
    )
}

export default PaginaVisualizarArtigos;