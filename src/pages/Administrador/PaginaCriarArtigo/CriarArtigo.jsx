// Style e React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTags, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './CriarArtigo.module.scss';
// Components
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import EditorDeTexto from '../../../components/EditorDeTexto/EditorDeTexto.jsx';
import PopupConfirmar from '../../../components/Popups/PopupConfirmar/PopupConfirmar.jsx';
import PopupSucesso from '../../../components/Popups/PopupSucesso/PopupSucesso.jsx';
import PopupTagArtigo from "../../../components/Popups/PopupAdicionarTag/PopupAdicionarTag.jsx";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import PopupLocal from '../../../components/Popups/PopupLocal/PopupLocal.jsx';
import PopupErro from '../../../components/Popups/PopupErro/PopupErro.jsx';
import Logotipo from '../../../components/Logotipo/Logotipo.jsx';
// hooks and helpers
import { useArtigos } from '../../../hooks/artigos/useArtigos.js';

import { tratamentoErro as tratarErro } from '../../../Helpers/tratamentoErro.js';
import { validarFormulario } from '../../../Helpers/validarFormulario.js';

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
    const { id } = useParams();
    const navigate = useNavigate();

    // --- Hook personalizado para lidar com artigos ---
    const { putArtigo, getArtigoById, postArtigo, loading, erro } = useArtigos();

    // --- Estados do Formulário ---
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [imagemCapa, setImagemCapa] = useState(null);
    const [previewCapa, setPreviewCapa] = useState('');
    const [localSelecionado, setLocalSelecionado] = useState(null);
    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
    const [erroFormulario, setErroFormulario] = useState(null);

    // --- Estados de Controle dos Popups ---
    const [localModalAberto, setLocalModalAberto] = useState(false);
    const [popupTagAberto, setPopupTagAberto] = useState(false);
    const [popupErroAberto, setPopupErroAberto] = useState(false);
    const [mostrarConfirmacaoExcluir, setMostrarConfirmacaoExcluir] = useState(false);
    const [mostrarConfirmacaoEnvio, setMostrarConfirmacaoEnvio] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);
    const [popupSucessoMensagem, setPopupSucessoMensagem] = useState('');
    const [acaoAposSucesso, setAcaoAposSucesso] = useState(null);
    const [enviando, setEnviando] = useState(false);

    // Novo estado para controlar o status
    const [statusEnvio, setStatusEnvio] = useState("publicado");

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

    const handleSelecionarLocal = (local) => {
        setLocalSelecionado(local);
        setLocalModalAberto(false);
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
            !localSelecionado;

        if (status === "publicado") {
            // Publicação: todos os campos obrigatórios
            if (!titulo.trim()) return mostrarErro('Por favor, adicione um título.');
            if (conteudoVazio) return mostrarErro('O conteúdo do artigo não pode estar vazio.');
            if (!imagemCapa && !previewCapa) return mostrarErro('Por favor, adicione uma imagem de capa.');
            if (tagsSelecionadas.length === 0) return mostrarErro('Selecione pelo menos uma tag.');
            if (!localSelecionado) return mostrarErro('Selecione um local.');
        } else if (status === "rascunho") {
            // Rascunho: pelo menos um campo deve estar preenchido
            if (formularioVazio) return mostrarErro('Preencha pelo menos um campo para salvar como rascunho.');

            if (!titulo.trim()) setTitulo("Rascunho sem título");
            if (conteudoVazio) setConteudo("<p>Conteúdo do rascunho</p>");
        }

        // Se passou nas validações
        setMostrarConfirmacaoEnvio(true);
        setAcaoAposSucesso("redirecionar");
    };

    const executarEnvio = async (status = "publicado") => {
        if (enviando) return; // impede cliques duplos
        setEnviando(true);

        try {
            const artigoParaEnviar = {
                titulo,
                conteudo,
                autor_id: 7,
                status: statusEnvio, // "rascunho" ou "publicado"
                local: localSelecionado ? `${localSelecionado.cidade} - ${localSelecionado.estado}` : null,
                tags: tagsSelecionadas,
                data: new Date().toISOString()
            };

            if (id) {
                await putArtigo(id, artigoParaEnviar, imagemCapa || null); // modo edição
            } else {
                await postArtigo(artigoParaEnviar, imagemCapa); // modo criação
            }

            setMostrarConfirmacaoEnvio(false);
            setPopupSucessoMensagem(
                status === "rascunho"
                    ? "Artigo salvo como rascunho!"
                    : id
                        ? "Artigo atualizado com sucesso!"
                        : "Artigo enviado com sucesso!"
            );
            setMostrarSucesso(true);
        } catch (e) {
            console.error(e);
            setErroFormulario({ mensagem: e.message, tipo: "erro" });
        } finally {
            setEnviando(false);
        }
    };

    const handleCancelarEnvio = () => { setMostrarConfirmacaoEnvio(false); };

    // --- Lógica do Popup de Sucesso ---
    const handleFecharPopupSucesso = () => {
        setMostrarSucesso(false);
        if (acaoAposSucesso === 'redirecionar') {
            navigate('/adm/visualizar-artigos');
        }
        setAcaoAposSucesso(null);
    };

    useEffect(() => {
        if (id) {
            async function carregar() {
                try {
                    const artigo = await getArtigoById(id);
                    setTitulo(artigo.titulo);
                    setConteudo(artigo.conteudo);
                    setTagsSelecionadas(artigo.tags || []);
                    if (artigo.local && artigo.local.includes(" - ")) {
                        const [cidade, estado] = artigo.local.split(" - ");
                        setLocalSelecionado({ cidade, estado });
                    } else {
                        setLocalSelecionado(null);
                    }
                    setPreviewCapa(artigo.url_imagem || "");
                    // imagemCapa não precisa ser setado agora, só quando trocar
                } catch (e) {
                    console.error("Erro ao carregar artigo", e);
                }
            }
            carregar();
        }
    }, [id]);

    return (
        <main className={styles.base}>
            <header className={styles.cabecalho}>
                <Logotipo tipo='admin' />
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
                    <EditorDeTexto
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
                mensagem={
                    statusEnvio === "rascunho"
                        ? "Tudo pronto para enviar como rascunho?"
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

            <PopupLocal
                aberto={localModalAberto}
                locais={mockLocais}
                onClose={() => setLocalModalAberto(false)}
                onSelect={handleSelecionarLocal}
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

export default PaginaCriarArtigo;