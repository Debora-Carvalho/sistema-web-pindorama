// src/pages/Administrador/PaginaVisualizarEventos/PaginaVisualizarEventos.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import styles from './PaginaVisualizarEventos.module.scss'; // Certifique-se de que este CSS existe
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logo from '../../../assets/images/pindorama_logo5.png';
import Loading from '../../../components/Loading/Loading.jsx';
import PopupConfirmar from '../../../components/Popups/PopupConfirmar/PopupConfirmar.jsx';
import PopupSucesso from '../../../components/Popups/PopupSucesso/PopupSucesso.jsx';
import PopupErro from '../../../components/Popups/PopupErro/PopupErro.jsx';
import { useEventos } from '../../../hooks/Eventos/useEventos.js'; 
import ListaCardsAdmin from "../../../components/ListaCards/Admin/ListaCardsAdmin.jsx"; 

function PaginaVisualizarEventosAdmin() {
    useTituloDocumento("Gerenciar Eventos | Pindorama"); 

    // O useEventos é usado para buscar e deletar
    const { 
        eventos: eventosCompletos, 
        loading, 
        erro: erroBusca, 
        deletarEvento, 
        buscarTodosEventos // Função para recarregar a lista
    } = useEventos();

    // --- Estados para Ações de Usuário ---
    const [eventoParaExcluir, setEventoParaExcluir] = useState(null);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [popupSucessoMensagem, setPopupSucessoMensagem] = useState('');
    const [popupErroMensagem, setPopupErroMensagem] = useState('');

    // --- Lógica de Exclusão ---
    const handleExcluirClick = (id) => {
        setEventoParaExcluir(id);
        setMostrarConfirmacao(true);
    };

    const handleConfirmarExclusao = async () => {
        setMostrarConfirmacao(false);
        if (eventoParaExcluir) {
            try {
                await deletarEvento(eventoParaExcluir);
                setPopupSucessoMensagem(`Evento ID ${eventoParaExcluir} excluído com sucesso!`);
                setEventoParaExcluir(null);
                // Recarrega a lista após a exclusão
                buscarTodosEventos(); 
            } catch (e) {
                setPopupErroMensagem(`Erro ao excluir o evento: ${e.message}`);
            }
        }
    };

    const handleCancelarExclusao = () => {
        setEventoParaExcluir(null);
        setMostrarConfirmacao(false);
    };

    // --- Adaptação e Renderização dos Eventos ---
    const eventosAdaptados = eventosCompletos.map(e => ({
        ...e,
        // Define o link de edição. Este link será usado no ListaCardsAdmin
        linkEdicao: `/adm/criar-evento/${e.id}` 
    }));


    return (
        <main className={styles.base}>
            <header className={styles.cabecalho}>
                <Link to="/adm/inicio" className={styles.logo}>
                    <img className={styles.logoImage} src={Logo} alt="Logo Pindorama - Voltar para a página inicial" />
                </Link>
                <h1 className={styles.titulo}>Gerenciar Eventos</h1>
                <HeaderAdmin />
            </header>

            <div className={styles.containerItems}>
                <div className={styles.containerBotoes}>
                    <Link to="/adm/criar-evento" className={styles.btnCriar}>
                        Criar Novo Evento
                    </Link>
                </div>
                
                {loading && <Loading />}
                {erroBusca && <p className={styles.mensagemErro}>Ocorreu um erro ao carregar os eventos: {erroBusca}</p>}

                {!loading && eventosCompletos.length === 0 && !erroBusca && (
                    <p className={styles.mensagemVazio}>Nenhum evento encontrado.</p>
                )}

                {!loading && eventosCompletos.length > 0 && (
                    <ListaCardsAdmin 
                        cards={eventosAdaptados} 
                        onDelete={handleExcluirClick} 
                        tipo="evento"
                    />
                )}
            </div>

            {/* Popups de Ação */}
            <PopupConfirmar
                aberto={mostrarConfirmacao}
                mensagem={`Tem certeza que deseja excluir o evento permanentemente? Esta ação é irreversível.`}
                onCancelar={handleCancelarExclusao}
                onConfirmar={handleConfirmarExclusao}
            />

            {popupSucessoMensagem && (
                <PopupSucesso
                    aberto={!!popupSucessoMensagem}
                    mensagem={popupSucessoMensagem}
                    textoBotao="Ok"
                    onBotaoClick={() => setPopupSucessoMensagem('')}
                />
            )}

            {popupErroMensagem && (
                <PopupErro
                    aberto={!!popupErroMensagem}
                    mensagem={popupErroMensagem}
                    tipo="erro"
                    onClose={() => setPopupErroMensagem('')}
                />
            )}
        </main>
    );
}

export default PaginaVisualizarEventosAdmin;