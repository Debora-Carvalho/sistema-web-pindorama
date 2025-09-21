import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import EditorDeArtigo from '../../../components/EditorDeArtigo/EditorDeArtigo.jsx';
import styles from './CriarArtigo.module.scss';
import Logo from '../../../assets/images/pindorama_logo5.png';
import { FaTags, FaMapMarkerAlt } from 'react-icons/fa';
import PopupConfirmar from '../../../components/Popups/PopupConfirmar/PopupConfirmar.jsx';
import PopupSucesso from '../../../components/Popups/PopupSucesso/PopupSucesso.jsx';

const nomeAutora = "Kelly Cristina Marques";


function PaginaCriarArtigo() {
    useTituloDocumento("Criar Artigo | Pindorama");

    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);

    const handleExcluirClick = () => {
        setMostrarConfirmacao(true);
    };

    // 3. Função para LIMPAR TUDO após a confirmação
    const handleConfirmarExclusao = () => {
        // Reseta todos os estados para os valores iniciais
        setTitulo('');
        setConteudo(''); // Você precisará passar o setConteudo para o EditorDeArtigo
        setImagemCapa(null);
        setPreviewCapa('');
        setMostrarConfirmacao(false);
        setMostrarSucesso(true);
    };

    // 4. Função para cancelar a exclusão
    const handleCancelarExclusao = () => {
        setMostrarConfirmacao(false);
    };

    const handleFecharPopupSucesso = () => {
        setMostrarSucesso(false);
    };

    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [imagemCapa, setImagemCapa] = useState(null);
    const [previewCapa, setPreviewCapa] = useState('');

    const handleEditorChange = (content) => {
        setConteudo(content);
    };

    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagemCapa(file);
            setPreviewCapa(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const artigoParaEnviar = {
            titulo: titulo,
            conteudo: conteudo,
            imagemCapa: imagemCapa,
            autora: nomeAutora,
            dataPublicacao: new Date(),
        };

        console.log("Objeto do artigo pronto para ser enviado:", artigoParaEnviar);
        alert("Artigo enviado! Verifique o console para ver os dados.");
    };

    useEffect(() => {
        return () => {
            if (previewCapa) {
                URL.revokeObjectURL(previewCapa);
            }
        };
    }, [previewCapa]);

    return (
        <main className={styles.base}>
            <header className={styles.cabecalho}>
                <Link to="/inicio" className={styles.logo}>
                    <img className={styles.logoImage} src={Logo} alt="Logo Pindorama - Voltar para a página inicial" />
                </Link>
                <h1 className={styles.titulo}>Artigos</h1>
            </header>

            {/* Apenas UMA tag <form> envolvendo tudo e com o onSubmit */}
            <form className={styles.formGrid} onSubmit={handleSubmit}>

                <div className={styles.campoTitulo}>
                    <input
                        type="text"
                        placeholder="Adicione o título aqui"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>

                {/* A form vazia foi removida */}

                <div className={styles.campoEditor}>
                    <EditorDeArtigo
                        value={conteudo}
                        onContentChange={handleEditorChange}
                    />
                </div>

                <div className={styles.campoDropdowns}>
                    <button type='button' className={styles.selectWrapper}>
                        <FaTags />
                        Tags
                    </button>

                    <button type='button' className={styles.selectWrapper}>
                        <FaMapMarkerAlt />
                        Local
                    </button>
                </div>

                <div className={styles.campoMidia}>
                    <label htmlFor="upload-capa">
                        {previewCapa ? (
                            <img src={previewCapa} alt="Prévia da capa" className={styles.previewImagem} />
                        ) : (
                            <div className={styles.placeholderMidia}>
                                Adicione sua mídia aqui
                            </div>
                        )}
                    </label>

                    <input
                        id="upload-capa"
                        type="file"
                        accept="image/png, image/jpeg, image/webp" // Aceita apenas imagens
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
                        <button type="button" className={styles.botaoRascunho}>Salvar como rascunho</button>
                        <button type="submit" className={styles.botaoEnviar}>Enviar</button>
                    </div>
                </div>
                <PopupConfirmar
                    aberto={mostrarConfirmacao}
                    mensagem="Tem certeza que deseja excluir?"
                    onCancelar={handleCancelarExclusao}
                    onConfirmar={handleConfirmarExclusao}
                />

                <PopupSucesso
                    aberto={mostrarSucesso}
                    mensagem="Informações excluídas com sucesso!"
                    textoBotao="Concluído"
                    onBotaoClick={handleFecharPopupSucesso}
                />
            </form>
        </main>
    );
}

export default PaginaCriarArtigo;