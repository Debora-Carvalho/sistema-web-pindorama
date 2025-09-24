import React, { useRef, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from './EditorDeTexto.module.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

function EditorDeTexto({ value, onContentChange }) {
    const editorRef = useRef(null);
    const { globalTheme } = useContext(ThemeContext);

    return (
        <div className={styles.editorWrapper}>
            <div className={styles.editorContainer}>
                <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API}
                    onInit={(evt, editor) => {
                        // Sua lógica existente para a ref, se precisar dela
                        editorRef.current = editor;

                        // Adicionamos um pequeno delay para garantir que o CSS foi aplicado
                        setTimeout(() => {
                            // Disparamos um evento de 'resize' na janela
                            window.dispatchEvent(new Event('resize'));
                        }, 200); // 200ms é um valor geralmente seguro
                    }}
                    value={value}
                    onEditorChange={(content, editor) => {
                        if (onContentChange) {
                            onContentChange(content);
                        }
                    }}
                    init={{
                        height: 450, // Use 100% para ser flexível
                        language: 'pt-BR',
                        menubar: false,
                        elementpath: false,
                        branding: false,
                        placeholder: "Digite seu texto aqui",
                        body_class: globalTheme,
                        toolbar_mode: 'floating',
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | image | link | help',

                        mobile: {
                            toolbar_mode: 'floating'
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default EditorDeTexto;