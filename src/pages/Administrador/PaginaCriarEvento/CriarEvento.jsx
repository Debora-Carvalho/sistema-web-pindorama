import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useEventos } from '../../../hooks/Eventos/useEventos';


function PaginaCriarEvento() {
    useTituloDocumento("Criar Evento | Pindorama");
    const navigate = useNavigate();

    const { criarEvento, loading, error } = useEventos();

    // --- Estados do Formulário ---
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [imagemCapa, setImagemCapa] = useState(null);
    const [previewCapa, setPreviewCapa] = useState('');
    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
    const [erroFormulario, setErroFormulario] = useState(null); // Corrigido para null
    const [dataEvento, setDataEvento] = useState(null);
    const [linkLocal, setLinkLocal] = useState('');

    // --- Estados de Controle dos Popups ---
    const [popupTagAberto, setPopupTagAberto] = useState(false);
    const [popupErroAberto, setPopupErroAberto] = useState(false);
    const [mostrarConfirmacaoExcluir, setMostrarConfirmacaoExcluir] = useState(false);
    const [mostrarConfirmacaoEnvio, setMostrarConfirmacaoEnvio] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);
    const [popupSucessoMensagem, setPopupSucessoMensagem] = useState('');
    const [acaoAposSucesso, setAcaoAposSucesso] = useState(null);
    const [calendarioAberto, setCalendarioAberto] = useState(false);
    const [localLinkModalAberto, setLocalLinkModalAberto] = useState(false);

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
        const formularioEstaVazio = !titulo.trim() && (!conteudo || conteudo === '<p><br data-mce-bogus="1"></p>') && !imagemCapa && tagsSelecionadas.length === 0;
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
    const handleSubmit = (event) => {
        event.preventDefault();
        setErroFormulario(null);

        // A função mostrarErro precisa estar aqui para o handleSubmit funcionar.
        const mostrarErro = (mensagem) => {
            const erroTratado = tratarErro(mensagem);
            setErroFormulario({ mensagem: erroTratado, tipo: 'aviso' });
        };
        // REMOVEMOS O '};' EXTRA QUE ESTAVA QUEBRANDO O CÓDIGO AQUI.

        const formularioEstaVazio =
            !titulo.trim() &&
            (!conteudo || conteudo === '<p><br data-mce-bogus="1"></p>') &&
            !imagemCapa &&
            tagsSelecionadas.length === 0 &&
            !dataEvento &&
            !linkLocal

        // Lógica de validação para enviar o treco
        if (formularioEstaVazio) {
            mostrarErro('Todos os campos precisam ser preenchidos para o envio de um novo evento.');
            return;
        }
        if (!titulo.trim()) {
            mostrarErro('Por favor, adicione um título.');
            return;
        }
        if (!conteudo || conteudo === '<p><br data-mce-bogus="1"></p>') {
            mostrarErro('O conteúdo do evento não pode estar vazio.');
            return;
        }
        if (!imagemCapa) {
            mostrarErro('Por favor, adicione uma imagem de capa.');
            return;
        }
        if (tagsSelecionadas.length === 0) {
            mostrarErro('Selecione pelo menos uma tag.');
            return;
        }
        if (!dataEvento) {
            mostrarErro('Por favor, selecione uma data para o evento.');
            return;
        }
        if (!linkLocal) {
            mostrarErro('Por favor, adicione um link para o local do evento.');
            return;
        }
        setMostrarConfirmacaoEnvio(true);
    };

    /* Código antigo de execução de envio
	const executarEnvio = () => {
		const eventoParaEnviar = {
			titulo,
			conteudo,
			imagemCapa,
			tags: tagsSelecionadas,
			data: dataEvento,
			localLink: linkLocal
		};
		// console.log("Evento pronto para ser enviado:", eventoParaEnviar); // Removido console.log
		setMostrarConfirmacaoEnvio(false);
		setPopupSucessoMensagem('Evento enviado com sucesso!');
		setAcaoAposSucesso('redirecionar');
		setMostrarSucesso(true);
	};
	*/
    // Nova função 'executarEnvio' que utiliza o hook.
    const executarEnvio = async () => {
        setMostrarConfirmacaoEnvio(false);

        const eventoParaEnviar = {
            titulo,
            conteudo,
            imagemCapa,
            tags: tagsSelecionadas,
            data: dataEvento,
            localLink: linkLocal
        };

        try {
            await criarEvento(eventoParaEnviar);
            setPopupSucessoMensagem('Evento enviado com sucesso!');
            setAcaoAposSucesso('redirecionar');
            setMostrarSucesso(true);
        } catch (err) {
            setErroFormulario({ mensagem: err.message, tipo: 'aviso' });
        }
    };

    const handleCancelarEnvio = () => { setMostrarConfirmacaoEnvio(false); };

    // --- Lógica dos Popups de Erro e Sucesso ---
    const handleFecharPopupErro = () => { setPopupErroAberto(false); };
    const handleFecharPopupSucesso = () => {
        setMostrarSucesso(false);
        if (acaoAposSucesso === 'redirecionar') {
            navigate('/adm/visualizar-eventos');
        }
        setAcaoAposSucesso(null);
    };

    useEffect(() => {
        return () => { if (previewCapa) { URL.revokeObjectURL(previewCapa); } };
    }, [previewCapa]);

    return (
        <main className={styles.base}>
            <header className={styles.cabecalho}>
                <Link to="/inicio" className={styles.logo}>
                    <img className={styles.logoImage} src={Logo} alt="Logo Pindorama - Voltar para a página inicial" />
                </Link>
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
                        {dataEvento ? dataEvento.toLocaleDateString('pt-BR') : 'Data do Evento'}
                    </button>
                    <button
                        type='button'
                        className={styles.selectWrapperTags}
                        onClick={() => setLocalLinkModalAberto(true)}
                    >
                        <FaMapMarkerAlt />
                        Local
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
                        Excluir
                    </button>
                    <div className={styles.botoesDireita}>
                        <button
                            type="button"
                            className={styles.botaoRascunho}
                        >
                            Salvar como rascunho
                        </button>
                        <button
                            type="button"
                            className={styles.botaoEnviar}
                            onClick={handleSubmit}
                            
                            disabled={loading}
                        >
                            
                            {loading ? 'Enviando...' : 'Enviar'}
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
                mensagem="Tudo pronto para enviar?"
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