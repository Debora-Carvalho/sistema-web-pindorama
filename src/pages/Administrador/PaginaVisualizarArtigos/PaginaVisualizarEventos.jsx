import styles from './PaginaVisualizarEventos.module.scss';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';
import { useAuth } from '../../../contexts/AuthContext.jsx';

import ListaCardsAdmin from '../../../components/ListaCards/Admin/ListaCardsAdmin.jsx';
// import eventos from '../../../json/db-mock-eventos.json';
import { useGetEventosAdmin } from '../../../hooks/administradores/useGetEventosAdmin.js'
import Loading from '../../../components/Loading/Loading.jsx';
import Logotipo from '../../../components/Logotipo/Logotipo.jsx';

function PaginaVisualizarEventosAdmin() {
    const handleSelect = (item) => {
        console.log("Selecionado:", item);
        alert(`Você selecionou: ${item.titulo}`);
    };

    const { id, loading: authLoading } = useAuth();
    const { eventos, loading: eventosLoading, error } = useGetEventosAdmin(id);

    return (
        <div className={styles.containerVisualizar}>
            <div className={styles.header}>
                <Logotipo tipo='admin' />
                <HeaderAdmin />
            </div>
            <div className={styles.topo}>
                <BarraPesquisa itens={eventos} onSelect={handleSelect} />
                <button className={styles.btnAdicionar} onClick={() => window.location.href = "/adm/criar-evento"}>
                    <BiSolidAddToQueue className={styles.iconAdd} />
                </button>
            </div>
            <div className={styles.containerCards}>
                {/* Lembrar de colocar o component de carregamento e erro */}
                {authLoading || eventosLoading ? (
                    <Loading />
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
