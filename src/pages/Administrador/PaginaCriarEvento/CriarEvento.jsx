import React, { useState, useEffect } from 'react';
// Importação do 'useParams' para ler o ID da URL
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import EditorDeTexto from '../../../components/EditorDeTexto/EditorDeTexto.jsx';
import styles from './CriarEvento.module.scss';
import Logo from '../../../assets/images/pindorama_logo5.png';
import { FaTags, FaMapMarkerAlt } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import PopupConfirmar from '../../../components/Popups/PopupConfirmar/PopupConfirmar.jsx';
import PopupSucesso from '../../../components/Popups/PopupSucesso/PopupSucesso.jsx';
import PopupTagArtigo from "../../../components/Popups/PopupAdicionarTag/PopupAdicionarTag.jsx";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import PopupErro from '../../../components/Popups/PopupErro/PopupErro.jsx';
import { tratamentoErro as tratarErro } from '../../../Helpers/tratamentoErro.js';
import PopupCalendario from '../../../components/Popups/PopupCalendario/PopupCalendario';
import PopupLocalLink from '../../../components/Popups/PopupLocalLink/PopupLocalLink';
// Certifique-se de que o useEventos exporta 'buscarEventoPorId' e 'atualizarEvento'
import { useEventos } from '../../../hooks/Eventos/useEventos.js';

function PaginaCriarEvento() {
    // 1. Obter o ID da URL. Se for edição, 'id' terá um valor.
    const { id } = useParams();
    const isEdicao = !!id;
    
    useTituloDocumento(isEdicao ? "Editar Evento | Pindorama" : "Criar Evento | Pindorama");
    const navigate = useNavigate();
    
    // 2. Integração do hook para criação, atualização e busca
    const { 
        criarEvento, 
        atualizarEvento, // Adicionado
        buscarEventoPorId, // Adicionado
        loading, 
        erro 
    } = useEventos();

    // --- Estados do Formulário ---
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [imagemCapa, setImagemCapa] = useState(null);
    const [previewCapa, setPreviewCapa] = useState('');
    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
    const [erroFormulario, setErroFormulario] = useState(null);
    const [dataEvento, setDataEvento] = useState(null);
    const [linkLocal, setLinkLocal] = useState('');
    const [statusInicial, setStatusInicial] = useState('rascunho'); // Estado para guardar o status atual na edição

    // --- Estados de Controle dos Popups (mantidos) ---
    const [popupTagAberto, setPopupTagAberto] = useState(false);
    const [mostrarConfirmacaoExcluir, setMostrarConfirmacaoExcluir] = useState(false);
    const [mostrarConfirmacaoEnvio, setMostrarConfirmacaoEnvio] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);
    const [popupSucessoMensagem, setPopupSucessoMensagem] = useState('');
    const [acaoAposSucesso, setAcaoAposSucesso] = useState(null);
    const [calendarioAberto, setCalendarioAberto] = useState(false);
    const [localLinkModalAberto, setLocalLinkModalAberto] = useState(false);
    const [statusEnvio, setStatusEnvio] = useState("publicado");
    
    // Novo estado de carregamento para busca inicial
    const [loadingBusca, setLoadingBusca] = useState(isEdicao);


    // 3. Efeito para carregar dados do evento em modo de edição
    useEffect(() => {
        if (isEdicao && id) {
            const carregarEvento = async () => {
                setLoadingBusca(true);
                try {
                    const evento = await buscarEventoPorId(id);
                    if (evento) {
                        setTitulo(evento.titulo || '');
                        setConteudo(evento.conteudo || '');
                        setTagsSelecionadas(evento.tags || []);
                        setLinkLocal(evento.local || '');
                        setStatusInicial(evento.status || 'rascunho');
                        
                        // Define a data: evento.data deve ser uma string YYYY-MM-DD
                        if (evento.data) {
                            setDataEvento(new Date(evento.data + 'T00:00:00'));
                        }

                        // Configura a pré-visualização da imagem existente (URL do banco)
                        if (evento.url_imagem) {
                            setPreviewCapa(evento.url_imagem);
                        }
                    } else {
                        throw new Error("Evento não encontrado.");
                    }
                } catch (e) {
                    setErroFormulario({ mensagem: `Erro ao carregar o evento: ${e.message}`, tipo: "erro" });
                    navigate('/adm/visualizar-eventos'); // Redireciona em caso de erro
                } finally {
                    setLoadingBusca(false);
                }
            };
            carregarEvento();
        }
    }, [id, isEdicao, navigate, buscarEventoPorId]); // Dependências ajustadas

    // --- Funções de Handler (mantidas) ---
    const handleEditorChange = (content) => { setConteudo(content); };
    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagemCapa(file);
            // Cria um novo preview URL para o novo arquivo selecionado
            setPreviewCapa(URL.createObjectURL(file)); 
        }
    };
    // ... (handleConfirmarTags, handleConfirmarData, handleConfirmarLocalLink) mantidas ...

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

    // --- Lógica de Exclusão/Limpeza (mantida) ---
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

    // --- Lógica de Envio (Função de validação - mantida) ---
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
            !imagemCapa && // Na Edição, imagemCapa pode ser null se for manter a antiga
            tagsSelecionadas.length === 0 &&
            !dataEvento &&
            !linkLocal;

        // Se for Edição e o evento já tiver uma capa, não precisa exigir uma nova
        const imagemNecessaria = isEdicao ? (!imagemCapa && !previewCapa) : !imagemCapa;


        if (status === "publicado") {
            if (!titulo.trim()) return mostrarErro('Por favor, preencha o campo de título.');
            if (conteudoVazio) return mostrarErro('Por favor, preencha o campo de texto para o evento.');
            if (imagemNecessaria) return mostrarErro('Por favor, adicione uma capa ou mantenha a existente.');
            if (tagsSelecionadas.length === 0) return mostrarErro('Selecione pelo menos uma tag.');
            if (!dataEvento) return mostrarErro('Por favor, selecione uma data para o evento.');
            if (!linkLocal) return mostrarErro('Por favor, adicione um link para o local do evento.');
        } else if (status === "rascunho") {
            // Permite salvar como rascunho se houver qualquer alteração em qualquer modo
            if (formularioVazio) return mostrarErro('Preencha pelo menos um campo para salvar como rascunho.');
        }

        setMostrarConfirmacaoEnvio(true);
    };

    // 4. Lógica de Execução do Envio/Criação/Atualização (Modificada) ---
    const executarEnvio = async () => {
        try {
            const eventoParaEnviar = {
                titulo,
                conteudo,
                autor_id: 7, // Placeholder - ajustar com a lógica de autenticação
                status: statusEnvio,
                data: dataEvento ? dataEvento.toISOString().split('T')[0] : null, // Formato YYYY-MM-DD
                local: linkLocal,
                tags: tagsSelecionadas,
                // Na Edição, o back-end saberá qual imagem manter ou substituir com base no 'imagemCapa'
            };

            setMostrarConfirmacaoEnvio(false);
            setAcaoAposSucesso('redirecionar');

            if (isEdicao) {
                // Se for Edição, chama a função de ATUALIZAÇÃO
                await atualizarEvento(id, eventoParaEnviar, imagemCapa);
            } else {
                // Se for Criação, chama a função de CRIAÇÃO
                await criarEvento(eventoParaEnviar, imagemCapa);
            }

            setPopupSucessoMensagem(
                isEdicao 
                    ? `Evento atualizado como ${statusEnvio}!` 
                    : (statusEnvio === "rascunho" ? "Evento salvo como rascunho!" : "Evento enviado com sucesso!")
            );
            setMostrarSucesso(true);
        } catch (e) {
            setErroFormulario({ mensagem: e.message, tipo: "erro" });
            setMostrarConfirmacaoEnvio(false);
        }
    };

    const handleCancelarEnvio = () => { setMostrarConfirmacaoEnvio(false); };

    // --- Lógica dos Popups de Erro e Sucesso (mantida) ---
    const handleFecharPopupSucesso = () => {
        setMostrarSucesso(false);
        if (acaoAposSucesso === 'redirecionar') {
            navigate('/adm/visualizar-eventos');
        }
        setAcaoAposSucesso(null);
    };
    
    // 5. Novo Loading: Aguarda a busca inicial OU o envio.
    if (loadingBusca || loading) {
        return (
            <main className={styles.base}>
                <p>{loadingBusca ? 'Carregando Evento...' : 'Enviando Evento...'}</p>
            </main>
        );
    }

    // Limpeza da URL de pré-visualização (mantida)
    useEffect(() => {
        return () => { if (previewCapa && previewCapa.startsWith('blob:')) { URL.revokeObjectURL(previewCapa); } };
    }, [previewCapa]);

    return (
        <main className={styles.base}>
            <header className={styles.cabecalho}>
                <Link to="/adm/inicio" className={styles.logo}>
                    <img className={styles.logoImage} src={Logo} alt="Logo Pindorama - Voltar para a página inicial" />
                </Link>
                {/* Título dinâmico */}
                <h1 className={styles.titulo}>{isEdicao ? "Editar Evento" : "Criar Evento"}</h1>
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
                {/* ... (Restante do formulário mantido) ... */}
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
                    {/* Em Edição, o botão Limpar é menos comum, mas mantemos o comportamento de resetar o formulário */}
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
                            {/* Texto dinâmico */}
                            {isEdicao ? "Salvar Alterações" : "Enviar"}
                        </button>
                    </div>
                </div>
            </form>

            {/* ... (Popups mantidos) ... */}
            <PopupConfirmar
                aberto={mostrarConfirmacaoExcluir}
                mensagem="Tem certeza que deseja limpar todos os campos?"
                onCancelar={handleCancelarExclusao}
                onConfirmar={handleConfirmarExclusao}
            />

            <PopupConfirmar
                aberto={mostrarConfirmacaoEnvio}
                mensagem={statusEnvio === "rascunho" ? "Tudo pronto para salvar como rascunho?" : (isEdicao ? "Tudo pronto para salvar as alterações?" : "Tudo pronto para enviar?")}
                onCancelar={handleCancelarEnvio}
                onConfirmar={executarEnvio}
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