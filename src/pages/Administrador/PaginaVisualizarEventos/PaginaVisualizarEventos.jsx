//Style e React
import { useState } from 'react';
import styles from './PaginaVisualizarEventos.module.scss';
import { BiSolidAddToQueue } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
//Components
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logotipo from "../../../components/Logotipo/Logotipo.jsx";
import ListaCardsAdmin from '../../../components/ListaCards/Admin/ListaCardsAdmin.jsx';
import Loading from "../../../components/Loading/Loading.jsx";
//Contexts e Hooks
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { useGetEventosAdmin } from '../../../hooks/administradores/useGetEventosAdmin.js';
import { useEventos } from '../../../hooks/Eventos/useEventos.js';

const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
};

function PaginaVisualizarEventosAdmin() {
    const navigate = useNavigate(); // usando navigate para vincular ListCards a pag detalhes eventos
    
    // 1. Estados e Hooks
    const { id, loading: authLoading } = useAuth();
    const { eventos, loading: eventosLoading, error: eventosError } = useGetEventosAdmin(id);
    const { deletarEvento } = useEventos();
    const [filtro, setFiltro] = useState("");

    const handleEditar = (id) => {
        navigate(`/adm/criar-evento/${id}`);// navega para editar evento
    };

    const handleExcluir = async (id) => {
      await deletarEvento(id);
    };

    const eventosFiltrados = eventos.filter((a) =>
        a.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    const eventosAdaptados = eventosFiltrados.map((a) => ({
        id: a.id,
        tipo: "evento",
        titulo: a.titulo,
        url_imagem: a.url_imagem,
        link: `/detalhes-evento/${a.id}`,
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
                        itens={eventos}
                        onSelect={(item) => console.log("Selecionado:", item)}
                        onInputChange={(valor) => setFiltro(valor)}
                    />
                    <button
                        className={styles.btnAdicionar}
                        onClick={() => window.location.href = "/adm/criar-evento"}
                    >
                        <BiSolidAddToQueue className={styles.iconAdd} />
                    </button>
              </div>
              <div className={styles.containerCards}>
                  {eventosLoading && <Loading />}
                      <ListaCardsAdmin
                          cards={eventosAdaptados}
                          limite={null}
                          actions={{
                              onEditar: handleEditar,
                              onExcluir: handleExcluir
                          }}
                      />
              </div>
          </div>
        </motion.div>
    )
}

export default PaginaVisualizarEventosAdmin;