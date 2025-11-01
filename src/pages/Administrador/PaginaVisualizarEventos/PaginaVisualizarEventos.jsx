import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './PaginaVisualizarEventos.module.scss';
import BarraPesquisa from '../../../components/Barra de pesquisa/BarraPesquisa.jsx';
import { BiSolidAddToQueue } from "react-icons/bi";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { useEventos } from '../../../hooks/Eventos/useEventos.js';
import ListaCardsAdmin from '../../../components/ListaCards/Admin/ListaCardsAdmin.jsx';

function PaginaVisualizarEventosAdmin() {
    const navigate = useNavigate(); // usando navigate para vincular ListCards a pag detalhes eventos
    
    // 1. Estados e Hooks
    const { id: autorId, loading: authLoading } = useAuth();
    // Pega as funções de ação e o loading/erro do hook unificado
    const { listarEventos, deletarEvento, loading: crudLoading } = useEventos();

    // Estados locais para a lista de eventos e UI (necessário porque useEventos retorna funções de ação, não o estado)
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Lógica de Carregamento de Eventos
    const carregarEventos = async (id) => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            // Chama a função listarEventos do hook, passando o ID do autor
            const data = await listarEventos(id);
            setEventos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            carregarEventos(autorId);
        }
    }, [autorId, authLoading]);

    // 3. Handlers de Ação (CRUD: Selecionar, Editar, Deletar, Visualizar)
    const handleSelect = (item) => {
        console.log("Selecionado:", item);
        alert(`Você selecionou: ${item.titulo}`);
    };

    const handleView = (eventoId) => {
        // navega para detalhes do evento
        navigate(`/detalhes-evento/${eventoId}`);
    };

    const handleEdit = (eventoId) => {
        // navega para editar evento
        navigate(`/adm/criar-evento?id=${eventoId}`);
    };

    const handleDelete = async (eventoId) => {
        if (!window.confirm("Tem certeza que deseja excluir este evento?")) {
            return;
        }

        try {
            // Chama a função deletarEvento do hook
            await deletarEvento(eventoId);

            // Remove o evento da lista local para atualizar a visualização
            setEventos(prevEventos => prevEventos.filter(evento => evento.id !== eventoId));
            alert("Evento excluído com sucesso!");
        } catch (err) {
            // Exibe erro na tela
            setError(err.message);
            alert(`Erro ao excluir o evento: ${err.message}`);
        }
    };

    const handleAddEvento = () => {
        // navega para criar evento
        navigate("/adm/criar-evento");
    };

    const overallLoading = loading || authLoading || crudLoading;

    return (
        <div className={styles.containerVisualizar}>
            <link to="/adm/inicio">
                <img className={styles.logo} src={Logo} alt="Logo do Pindorama" />
            </link>
            <nav className={styles.navbar}>
                <HeaderAdmin />
            </nav>
            <div className={styles.topo}>
                <BarraPesquisa itens={eventos} onSelect={handleSelect} />
                <button className={styles.btnAdicionar} onClick={handleAddEvento}>
                    <BiSolidAddToQueue className={styles.iconAdd} />
                </button>
            </div>
            <div className={styles.containerCards}>
                {overallLoading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p>Ocorreu um erro ao carregar os eventos: {error}</p>
                ) : (
                    <ListaCardsAdmin
                        cards={eventos}
                        limite={null}
                        actions={{
                            onView: handleView,    //para ver detalhes
                            onEdit: handleEdit,
                            onDelete: handleDelete
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default PaginaVisualizarEventosAdmin;