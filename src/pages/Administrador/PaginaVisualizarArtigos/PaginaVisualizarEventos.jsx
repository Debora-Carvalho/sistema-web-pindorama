import styles from './PaginaVisualizarEventos.module.scss';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';

import ListaCardsAdmin from '../../../components/ListaCards/Admin/ListaCardsAdmin.jsx';
import eventos from '../../../json/db-mock-eventos.json';

function PaginaVisualizarEventosAdmin() {
    const handleSelect = (item) => {
        console.log("Selecionado:", item);
        alert(`Você selecionou: ${item.titulo}`);
    };

    return (
        <div className={styles.containerVisualizar}>
            <img className={styles.logo} src={Logo} alt="Logo do Pindorama" />
            <nav className={styles.navbar}>
                <HeaderAdmin />
            </nav>
            <div className={styles.topo}>
                <BarraPesquisa itens={eventos} onSelect={handleSelect} />
                <button className={styles.btnAdicionar} onClick={() => window.location.href = "/adm/criar-evento"}>
                    <BiSolidAddToQueue className={styles.iconAdd} />
                </button>
            </div>
            <div className={styles.containerCards}>
                <ListaCardsAdmin cards={eventos} limite={null} />
            </div>
        </div>
    )
}

export default PaginaVisualizarEventosAdmin;
