import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from './EditorDeArtigo.module.sass';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle.jsx';

const EditorDeArtigo = () => {
    const editorRef = useRef(null);

    const handleSalvar = () => {
        if (editorRef.current) {
            const conteudo = editorRef.current.getContent();
            console.log("Conteúdo do artigo:", conteudo);
            alert("Artigo salvo!");
        }
    };

    return (
        <div className={styles.editorWrapper}>
            <div className={styles.editorContainer}>
                <Editor
                    apiKey="m4q23tgp22m5gvy98ggkq2t9apl11rflio4cz1bfnvujqbj6"
                    onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                        height: 500,
                        language: 'pt-BR',
                        menubar: false,
                        elementpath: false,
                        branding: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 
                            `body { 
                                background-color: $themes;
                                font-family: $text
                            }`
                    }}
                />
            </div>
            <button onClick={handleSalvar} className={styles.botaoSalvar}>
                Salvar Artigo
            </button>
        </div>
    );
};

export default EditorDeArtigo;