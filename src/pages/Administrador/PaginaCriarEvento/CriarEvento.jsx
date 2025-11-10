// Styles e React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTags, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import styles from './CriarEvento.module.scss';
// Components
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import EditorDeTexto from '../../../components/EditorDeTexto/EditorDeTexto.jsx';
import PopupConfirmar from '../../../components/Popups/PopupConfirmar/PopupConfirmar.jsx';
import PopupSucesso from '../../../components/Popups/PopupSucesso/PopupSucesso.jsx';
import PopupTagArtigo from "../../../components/Popups/PopupAdicionarTag/PopupAdicionarTag.jsx";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import PopupErro from '../../../components/Popups/PopupErro/PopupErro.jsx';
import Logotipo from '../../../components/Logotipo/Logotipo.jsx';
import PopupLocalLink from '../../../components/Popups/PopupLocalLink/PopupLocalLink';
import PopupCalendario from '../../../components/Popups/PopupCalendario/PopupCalendario';
// Hooks e Helpers
import { useEventos } from '../../../hooks/Eventos/useEventos.js';

import { tratamentoErro as tratarErro } from '../../../Helpers/tratamentoErro.js';


function PaginaCriarEvento() {
    const { id } = useParams();
    const isEdicao = !!id;

    useTituloDocumento(isEdicao ? "Editar Evento | Pindorama" : "Criar Evento | Pindorama");
    const navigate = useNavigate();

    // --- Hook personalizado para lidar com eventos ---
    const { criarEvento, atualizarEvento, buscarEvento, loading, erro } = useEventos();

    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [imagemCapa, setImagemCapa] = useState(null);
    const [previewCapa, setPreviewCapa] = useState('');
    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
    const [erroFormulario, setErroFormulario] = useState(null);
    const [dataEvento, setDataEvento] = useState(null);
    const [linkLocal, setLinkLocal] = useState('');
    const [statusInicial, setStatusInicial] = useState('rascunho');
    const [statusEnvio, setStatusEnvio] = useState("publicado");

    const [popupTagAberto, setPopupTagAberto] = useState(false);
    const [mostrarConfirmacaoExcluir, setMostrarConfirmacaoExcluir] = useState(false);
    const [mostrarConfirmacaoEnvio, setMostrarConfirmacaoEnvio] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);
    const [popupSucessoMensagem, setPopupSucessoMensagem] = useState('');
    const [acaoAposSucesso, setAcaoAposSucesso] = useState(null);
    const [calendarioAberto, setCalendarioAberto] = useState(false);
    const [localLinkModalAberto, setLocalLinkModalAberto] = useState(false);


    const [loadingBusca, setLoadingBusca] = useState(isEdicao);
    // --- Funções de Handler ---
    const handleEditorChange = (content) => { setConteudo(content); };
    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagemCapa(file);
            setPreviewCapa(URL.createObjectURL(file));
        }
    };

    const handleConfirmarTags = (tags) => {
        setTagsSelecionadas(tags);
        setPopupTagAberto(false);
    };

    const handleConfirmarData = (data) => {
        setDataEvento(data);
        setCalendarioAberto(false);
    };

    const handleConfirmarLocalLink = (link) => {
        setLinkLocal(link);
        setLocalLinkModalAberto(false);
    };

    // --- Lógica de Exclusão ---
    const handleExcluirClick = () => {
        const formularioEstaVazio = !titulo.trim() && (!conteudo || conteudo === '<p><br data-mce-bogus="1"></p>') && !imagemCapa && tagsSelecionadas.length === 0 && !dataEvento && !linkLocal;
        if (formularioEstaVazio) {
            setPopupSucessoMensagem('Não há informações para excluir.');
            setAcaoAposSucesso('permanecer');
            setMostrarSucesso(true);
        } else {
            setMostrarConfirmacaoExcluir(true);
        }
    };

    const handleConfirmarExclusao = () => {
        setTitulo('');
        setConteudo('');
        setImagemCapa(null);
        setPreviewCapa('');
        setTagsSelecionadas([]);
        setDataEvento(null);
        setLinkLocal('');
        setMostrarConfirmacaoExcluir(false);
        setPopupSucessoMensagem('Informações excluídas com sucesso!');
        setAcaoAposSucesso('permanecer');
        setMostrarSucesso(true);
    };

    const handleCancelarExclusao = () => { setMostrarConfirmacaoExcluir(false); };    

    // --- Lógica de Envio ---
    const handleSubmit = (event, status = "publicado") => {
        event.preventDefault();
        setErroFormulario(null);

        setStatusEnvio(status);

        const mostrarErro = (mensagem) => {
            const erroTratado = tratarErro(mensagem);
            setErroFormulario(erroTratado);
        };

        const conteudoVazio = !conteudo || conteudo === '<p><br data-mce-bogus="1"></p>';
        const formularioVazio =
            !titulo.trim() &&
            conteudoVazio &&
            !imagemCapa &&
            tagsSelecionadas.length === 0 &&
            !dataEvento &&
            !linkLocal;

        if (status === "publicado") {
            if (!titulo.trim()) return mostrarErro('Por favor, preencha o campo de título.');
            if (conteudoVazio) return mostrarErro('Por favor, preencha o campo de texto para o evento.');
            if (!imagemCapa && !previewCapa) return mostrarErro('Por favor, adicione uma capa ou mantenha a existente.');
            if (tagsSelecionadas.length === 0) return mostrarErro('Selecione pelo menos uma tag.');
            if (!dataEvento) return mostrarErro('Por favor, selecione uma data para o evento.');
            if (!linkLocal) return mostrarErro('Por favor, adicione um link para o local do evento.');
        } else if (status === "rascunho") {
            if (formularioVazio) return mostrarErro('Preencha pelo menos um campo para salvar como rascunho.');

            if (!titulo.trim()) setTitulo("Rascunho sem título");
            if (conteudoVazio) setConteudo("<p>Conteúdo do rascunho</p>");
        }

        setMostrarConfirmacaoEnvio(true);
        setAcaoAposSucesso("redirecionar");

    };

    const executarEnvio = async (status = "publicado") => {
        try {
            const eventoParaEnviar = {
                titulo,
                conteudo,
                autor_id: 7,
                status: statusEnvio,
                data: dataEvento ? dataEvento.toISOString().split('T')[0] : null,
                local: linkLocal,
                tags: tagsSelecionadas,
            };

            if (id) {
                await atualizarEvento(id, eventoParaEnviar, imagemCapa || null); //edição
            } else {
                await criarEvento(eventoParaEnviar, imagemCapa);
            }
            
            setMostrarConfirmacaoEnvio(false);
            setPopupSucessoMensagem(
              status === "rascunho"
                ? "Evento salvo como rascunho!"
                : id
                ? "Evento atualizado com sucesso!"
                : "Evento enviado com sucesso!"
            );
            setMostrarSucesso(true);
        } catch (e) {
            console.error(e);
            setErroFormulario({ mensagem: e.message, tipo: "erro" });
        }
    };

    const handleCancelarEnvio = () => { setMostrarConfirmacaoEnvio(false); };

    // --- Lógica do Popup de Sucesso ---
    const handleFecharPopupSucesso = () => {
        setMostrarSucesso(false);
        if (acaoAposSucesso === 'redirecionar') {
            navigate('/adm/visualizar-eventos');
        }
        setAcaoAposSucesso(null);
    };

    useEffect(() => {
        if (id) {
            async function carregarEvento() {
                try {
                    // AJUSTE: A chamada da função também foi corrigida
                    const evento = await buscarEvento(id);
                    if (evento) {
                        setTitulo(evento.titulo || '');
                        setConteudo(evento.conteudo || '');
                        setTagsSelecionadas(evento.tags || []);
                        setLinkLocal(evento.local || '');
                        if (evento.data) {
                            const dataUTC = new Date(evento.data);
                            const dataLocal = new Date(dataUTC.getUTCFullYear(), dataUTC.getUTCMonth(), dataUTC.getUTCDate());
                            setDataEvento(dataLocal);
                          }
                        setPreviewCapa(evento.url_imagem || "");
                    } else {
                        throw new Error("Evento não encontrado.");
                    }
                } catch (e) {
                    // setErroFormulario({ mensagem: `Erro ao carregar o evento: ${e.message}`, tipo: "erro" });
                    console.error("Erro ao carregar artigo", e);
                    navigate('/adm/visualizar-eventos');
                }
            };
            carregarEvento();
        }
        // AJUSTE: Dependência atualizada para 'buscarEvento'
    }, [id]);

    return (
        <main className={styles.base}>
            <header className={styles.cabecalho}>
                <Logotipo tipo='admin' />
                <h1 className={styles.titulo}>Eventos</h1>
                <HeaderAdmin />
            </header>

            <form className={styles.formGrid}>
                <div className={styles.campoTitulo}>
                    <input
                        type="text"
                        id="tituloEvento"
                        name="titulo"
                        placeholder="Adicione o título aqui"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div className={styles.campoEditor}>
                    <EditorDeTexto
                        value={conteudo}
                        onContentChange={handleEditorChange}
                    />
                </div>
                <div className={styles.campoDropdowns}>
                    <button
                        type='button'
                        className={styles.selectWrapperTags}
                        onClick={() => setPopupTagAberto(true)}
                    >
                        <FaTags /> Tags
                    </button>
                    <button
                        type='button'
                        className={styles.selectWrapperTags}
                        onClick={() => setCalendarioAberto(true)}
                    >
                        <FaCalendarAlt />
                        {dataEvento ? new Date(dataEvento).toLocaleDateString('pt-BR') : 'Data do Evento'}
                    </button>
                    <button
                        type='button'
                        className={styles.selectWrapperTags}
                        onClick={() => setLocalLinkModalAberto(true)}
                    >
                        <FaMapMarkerAlt />
                        {linkLocal ? 'Link/Local Adicionado' : 'Local'}
                    </button>
                </div>
                <div className={styles.campoMidia}>
                    <label htmlFor="upload-capa">
                        {previewCapa ? <img src={previewCapa} alt="Prévia da capa" className={styles.previewImagem} /> : <div className={styles.placeholderMidia}>Adicione sua mídia aqui</div>}
                    </label>
                    <input
                        id="upload-capa"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleImagemChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className={styles.campoBotoes}>
                    <button
                        type="button"
                        className={styles.botaoExcluir}
                        onClick={handleExcluirClick}
                    >
                        Limpar
                    </button>
                    <div className={styles.botoesDireita}>
                        <button
                            type="button"
                            className={styles.botaoRascunho}
                            onClick={(e) => handleSubmit(e, "rascunho")}
                        >
                            Salvar como rascunho
                        </button>
                        <button
                            type="button"
                            className={styles.botaoEnviar}
                            onClick={(e) => handleSubmit(e, "publicado")}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </form>

            <PopupConfirmar
                aberto={mostrarConfirmacaoExcluir}
                mensagem="Tem certeza que deseja limpar todos os campos?"
                onCancelar={handleCancelarExclusao}
                onConfirmar={handleConfirmarExclusao}
            />

            <PopupConfirmar
                aberto={mostrarConfirmacaoEnvio}
                mensagem={statusEnvio === "rascunho" 
                  ? "Tudo pronto para salvar como rascunho?" 
                  : "Tudo pronto para publicar?"
                }
                onCancelar={handleCancelarEnvio}
                onConfirmar={() => executarEnvio(statusEnvio)}
            />

            <PopupSucesso
                aberto={mostrarSucesso}
                mensagem={popupSucessoMensagem}
                textoBotao="Ok"
                onBotaoClick={handleFecharPopupSucesso}
            />

            <PopupTagArtigo
                aberto={popupTagAberto}
                tagsIniciais={tagsSelecionadas}
                onCancelar={() => setPopupTagAberto(false)}
                onConfirmar={handleConfirmarTags}
            />

            <PopupCalendario
                aberto={calendarioAberto}
                onClose={() => setCalendarioAberto(false)}
                onConfirmar={handleConfirmarData}
                dataSelecionada={dataEvento}
            />

            <PopupLocalLink
                aberto={localLinkModalAberto}
                onClose={() => setLocalLinkModalAberto(false)}
                onConfirmar={handleConfirmarLocalLink}
                linkAtual={linkLocal}
            />

            {erroFormulario && (
                <PopupErro
                    aberto={!!erroFormulario}
                    mensagem={erroFormulario.mensagem}
                    tipo={erroFormulario.tipo}
                    onClose={() => setErroFormulario(null)}
                />
            )}
        </main>
    );
};

export default PaginaCriarEvento;