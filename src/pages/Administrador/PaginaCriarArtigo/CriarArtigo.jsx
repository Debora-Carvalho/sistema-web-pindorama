import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import EditorDeArtigo from '../../../components/EditorDeArtigo/EditorDeArtigo.jsx';
import styles from './CriarArtigo.module.scss';
import Logo from '../../../assets/images/pindorama_logo5.png';
import { FaTags, FaMapMarkerAlt } from 'react-icons/fa';
import PopupConfirmar from '../../../components/Popups/PopupConfirmar/PopupConfirmar.jsx';
import PopupSucesso from '../../../components/Popups/PopupSucesso/PopupSucesso.jsx';
import PopupTagArtigo from "../../../components/Popups/PopupAdicionarTag/PopupAdicionarTag.jsx";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import PopupLocal from '../../../components/Popups/PopupLocal/PopupLocal.jsx';
import PopupErro from '../../../components/Popups/PopupErro/PopupErro.jsx';

// --- Constantes ---
const nomeAutora = "Kelly Cristina Marques";
const mockLocais = [
    { id: 1, cidade: 'Recife', estado: 'PE' },
    { id: 2, cidade: 'Salvador', estado: 'BA' },
    { id: 3, cidade: 'São Paulo', estado: 'SP' },
    { id: 4, cidade: 'Rio de Janeiro', estado: 'RJ' },
    { id: 5, cidade: 'Belo Horizonte', estado: 'MG' },
    { id: 6, cidade: 'Vitória', estado: 'ES' },
    { id: 7, cidade: 'Palmas', estado: 'TO' },
];

function PaginaCriarArtigo() {
    useTituloDocumento("Criar Artigo | Pindorama");
    const navigate = useNavigate();

    // --- Estados do Formulário ---
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [imagemCapa, setImagemCapa] = useState(null);
    const [previewCapa, setPreviewCapa] = useState('');
    const [localSelecionado, setLocalSelecionado] = useState(null);
    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
    const [erroFormulario, setErroFormulario] = useState('');

    // --- Estados de Controle dos Popups ---
    const [localModalAberto, setLocalModalAberto] = useState(false);
    const [popupTagAberto, setPopupTagAberto] = useState(false);
    const [popupErroAberto, setPopupErroAberto] = useState(false);
    const [mostrarConfirmacaoExcluir, setMostrarConfirmacaoExcluir] = useState(false);
    const [mostrarConfirmacaoEnvio, setMostrarConfirmacaoEnvio] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);
    const [popupSucessoMensagem, setPopupSucessoMensagem] = useState('');
    const [acaoAposSucesso, setAcaoAposSucesso] = useState(null);

    // --- Funções de Handler ---
    const handleEditorChange = (content) => { setConteudo(content); };
    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagemCapa(file);
            setPreviewCapa(URL.createObjectURL(file));
        }
    };
    const handleSelecionarLocal = (local) => {
        setLocalSelecionado(local);
        setLocalModalAberto(false);
    };
    const handleConfirmarTags = (tags) => {
        setTagsSelecionadas(tags);
        setPopupTagAberto(false);
    };

    // --- Lógica de Exclusão ---
    const handleExcluirClick = () => {
        const formularioEstaVazio = !titulo.trim() && (!conteudo || conteudo === '<p><br data-mce-bogus="1"></p>') && !imagemCapa && tagsSelecionadas.length === 0 && !localSelecionado;
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
        setLocalSelecionado(null);
        setTagsSelecionadas([]);
        setMostrarConfirmacaoExcluir(false);
        setPopupSucessoMensagem('Informações excluídas com sucesso!');
        setAcaoAposSucesso('permanecer');
        setMostrarSucesso(true);
    };
    const handleCancelarExclusao = () => { setMostrarConfirmacaoExcluir(false); };

    // --- Lógica de Envio ---
    const handleSubmit = (event) => {
        event.preventDefault();
        const mostrarErro = (mensagem) => {
            setErroFormulario(mensagem);
            setPopupErroAberto(true);
        };
        const formularioEstaVazio =
            !titulo.trim() &&
            (!conteudo || conteudo === '<p><br data-mce-bogus="1"></p>') &&
            !imagemCapa &&
            tagsSelecionadas.length === 0 &&
            !localSelecionado;

        // Lógica de validação para enviar o treco
        if (formularioEstaVazio) {
            mostrarErro('Todos os campos precisam ser preenchidos para o envio de um novo artigo.');
            return;
        }
        if (!titulo.trim()) {
            mostrarErro('Por favor, adicione um título.');
            return;
        }
        if (!conteudo || conteudo === '<p><br data-mce-bogus="1"></p>') {
            mostrarErro('O conteúdo do artigo não pode estar vazio.');
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
        if (!localSelecionado) {
            mostrarErro('Selecione um local.');
            ;
        }
        setMostrarConfirmacaoEnvio(true);
    };

    const executarEnvio = () => {
        const artigoParaEnviar = { titulo, conteudo, imagemCapa, autora: nomeAutora, dataPublicacao: new Date(), local: localSelecionado, tags: tagsSelecionadas };
        console.log("Artigo pronto para ser enviado:", artigoParaEnviar);
        setMostrarConfirmacaoEnvio(false);
        setPopupSucessoMensagem('Artigo enviado com sucesso!');
        setAcaoAposSucesso('redirecionar');
        setMostrarSucesso(true);
    };

    const handleCancelarEnvio = () => { setMostrarConfirmacaoEnvio(false); };

    // --- Lógica dos Popups de Erro e Sucesso ---
    const handleFecharPopupErro = () => { setPopupErroAberto(false); };
    const handleFecharPopupSucesso = () => {
        setMostrarSucesso(false);
        if (acaoAposSucesso === 'redirecionar') {
            navigate('/visualizar-artigos');
        }
        setAcaoAposSucesso(null);
    };

    useEffect(() => {
        return () => { if (previewCapa) { URL.revokeObjectURL(previewCapa); } };
    }, [previewCapa]);

    useEffect(() => {
        if (popupErroAberto) {
            const timer = setTimeout(() => {
                setPopupErroAberto(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [popupErroAberto]);

    return (
        <main className={styles.base}>
            <header className={styles.cabecalho}>
                <Link to="/inicio" className={styles.logo}>
                    <img className={styles.logoImage} src={Logo} alt="Logo Pindorama - Voltar para a página inicial" />
                </Link>
                <h1 className={styles.titulo}>Artigos</h1>
                <HeaderAdmin />
            </header>

            <form className={styles.formGrid}>
                <div className={styles.campoTitulo}>
                    <input
                        type="text"
                        id="tituloArtigo"
                        name="titulo"
                        placeholder="Adicione o título aqui"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div className={styles.campoEditor}>
                    <EditorDeArtigo
                        value={conteudo}
                        onContentChange={handleEditorChange}
                    />
                </div>
                <div className={styles.campoDropdowns}>
                    <button
                        type='button'
                        className={styles.selectWrapper}
                        onClick={() => setPopupTagAberto(true)}
                    >
                        <FaTags /> Tags
                    </button>
                    <button
                        type='button'
                        className={styles.selectWrapper}
                        onClick={() => setLocalModalAberto(true)}
                    >
                        <FaMapMarkerAlt /> {localSelecionado ? `${localSelecionado.cidade} - ${localSelecionado.estado}` : 'Local'}
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

            <PopupLocal
                aberto={localModalAberto}
                locais={mockLocais}
                onClose={() => setLocalModalAberto(false)}
                onSelect={handleSelecionarLocal}
            />

            <PopupErro
                aberto={popupErroAberto}
                mensagem={erroFormulario}
                onClose={handleFecharPopupErro}
            />
        </main>
    );
};

export default PaginaCriarArtigo;