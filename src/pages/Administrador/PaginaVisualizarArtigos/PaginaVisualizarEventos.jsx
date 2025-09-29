import styles from './PaginaVisualizarEventos.module.scss';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';
import { useAuth } from '../../../contexts/AuthContext.jsx';

import ListaCardsAdmin from '../../../components/ListaCards/Admin/ListaCardsAdmin.jsx';
// import eventos from '../../../json/db-mock-eventos.json';
import { useGetEventosAdmin } from '../../../hooks/administradores/useGetEventosAdmin.js'

function PaginaVisualizarEventosAdmin() {
    const handleSelect = (item) => {
        console.log("Selecionado:", item);
        alert(`Você selecionou: ${item.titulo}`);
    };

    const { id, loading: authLoading } = useAuth();
    const { eventos, loading: eventosLoading, error } = useGetEventosAdmin(id);

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
                {/* Lembrar de colocar o component de carregamento e erro */}
                    {authLoading || eventosLoading ? (
                        <p>Carregando...</p>
                    ) : error ? (
                        <p>Ocorreu um erro ao carregar os eventos: {error}</p>
                    ) : (
                <ListaCardsAdmin cards={eventos} limite={null} />
                    )}
            </div>
        </div>
    )
}

export default PaginaVisualizarEventosAdmin;
