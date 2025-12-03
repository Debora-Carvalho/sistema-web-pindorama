// Style e React
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTags, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
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
    { id: 2, cidade: 'Olinda', estado: 'PE' }, // Adição PE
    { id: 3, cidade: 'Salvador', estado: 'BA' },
    { id: 4, cidade: 'Feira de Santana', estado: 'BA' }, // Adição BA
    { id: 5, cidade: 'São Paulo', estado: 'SP' },
    { id: 6, cidade: 'Guarulhos', estado: 'SP' },
    { id: 7, cidade: 'Rio de Janeiro', estado: 'RJ' }, // Adição RJ
    { id: 8, cidade: 'Niterói', estado: 'RJ' }, // Adição RJ
    { id: 9, cidade: 'Belo Horizonte', estado: 'MG' },
    { id: 10, cidade: 'Contagem', estado: 'MG' }, // Adição MG
    { id: 11, cidade: 'Vitória', estado: 'ES' },
    { id: 12, cidade: 'Vila Velha', estado: 'ES' }, // Adição ES
    { id: 13, cidade: 'Palmas', estado: 'TO' },
    { id: 14, cidade: 'Araguaína', estado: 'TO' }, // Adição TO
    { id: 15, cidade: 'Manaus', estado: 'AM' },
    { id: 16, cidade: 'Parintins', estado: 'AM' }, // Adição AM
    { id: 17, cidade: 'Porto Alegre', estado: 'RS' },
    { id: 18, cidade: 'Canoas', estado: 'RS' }, // Adição RS
    { id: 19, cidade: 'Brasília', estado: 'DF' },
    { id: 20, cidade: 'Taguatinga', estado: 'DF' }, // Adição DF (dentro do Distrito Federal)
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
    
    // Novos estados de metadados da imagem
    const [creditosImagem, setCreditosImagem] = useState(''); 
    const [altImagem, setAltImagem] = useState(''); 

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
        // Verifica se TODOS os campos estão vazios
        const formularioEstaVazio = 
            !titulo.trim() && 
            (!conteudo || conteudo === '<p><br data-mce-bogus="1"></p>') && 
            !imagemCapa && 
            tagsSelecionadas.length === 0 && 
            !localSelecionado && 
            !creditosImagem && 
            !altImagem;

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
        setCreditosImagem('');
        setAltImagem('');
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
            // --- VALIDAÇÕES PARA PUBLICAÇÃO ---
            if (!titulo.trim()) return mostrarErro('Por favor, adicione um título.');
            if (conteudoVazio) return mostrarErro('O conteúdo do artigo não pode estar vazio.');
            if (!imagemCapa && !previewCapa) return mostrarErro('Por favor, adicione uma imagem de capa.');
            
            if (!creditosImagem.trim()) return mostrarErro('Por favor, atribua os créditos da imagem.');
            if (!altImagem.trim()) return mostrarErro('Por favor, adicione uma descrição para a imagem de capa.');
            
            if (tagsSelecionadas.length === 0) return mostrarErro('Selecione pelo menos uma tag.');
            if (!localSelecionado) return mostrarErro('Selecione um local.');
            
        } else if (status === "rascunho") {
            // --- VALIDAÇÕES PARA RASCUNHO ---
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
                creditos_imagem: creditosImagem,
                alt_imagem: altImagem,
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

                    setCreditosImagem(artigo?.imagem?.creditos || '');
                    setAltImagem(artigo?.imagem?.descricao || ''); 
                    
                    if (artigo.local && artigo.local.includes(" - ")) {
                        const [cidade, estado] = artigo.local.split(" - ");
                        setLocalSelecionado({ cidade, estado });
                    } else {
                        setLocalSelecionado(null);
                    }
                    setPreviewCapa(artigo?.imagem?.url_imagem || "");
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
                
                {/* --- ÁREA DE MÍDIA (Capa + Créditos + Alt) --- */}
                <div className={styles.campoMidia}>
                    
                    {/* METADE SUPERIOR: Imagem ou Caixa de Upload */}
                    <div className={styles.midiaSuperior}>
                        <label 
                            htmlFor="upload-capa" 
                            className={styles.labelCapa} 
                        >
                            {previewCapa ? (
                                <img 
                                    src={previewCapa} 
                                    alt="Prévia da capa" 
                                    className={styles.previewImagem} 
                                />
                            ) : (
                                /* CAIXA DE PLACEHOLDER (Estilo original restaurado) */
                                <div className={styles.placeholderMidia}>
                                    <FaCamera className={styles.iconePlaceholder}/>
                                    <span>Adicione a imagem de capa</span>
                                </div>
                            )}
                        </label>
                        <input
                            id="upload-capa"
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleImagemChange}
                            style={{ display: 'none' }}
                        />
                    </div>

                    
                    <div className={styles.midiaInferior}>
                        <textarea 
                            className={styles.inputMidiaInfo}
                            placeholder="Créditos da imagem (Autor ou Link)"
                            value={creditosImagem}
                            onChange={(e) => setCreditosImagem(e.target.value)}
                            maxLength={200}
                            rows={2}
                        />
                        
                        <textarea 
                            className={styles.inputMidiaInfo}
                            placeholder="Descreva a imagem de capa"
                            value={altImagem}
                            onChange={(e) => setAltImagem(e.target.value)}
                            maxLength={200}
                            rows={2}
                        />
                    </div>

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