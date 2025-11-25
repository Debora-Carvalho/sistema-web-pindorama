import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import styles from './PopupMapa.module.scss';
import { decodeHtml } from '../../../Helpers/decodeHtml';

// Adicionamos a prop 'linkDestino' (que pode vir do Mapa.jsx como artigoSelecionado.link)
function PopupMapa({ aberto, titulo, descricao, textoBotao, linkDestino, onFechar }) {
    const nodeRef = useRef(null); 

    if (!aberto) return null;

    const htmlDecodificado = decodeHtml(descricao);

    const textoLimpo = htmlDecodificado.replace(/<[^>]*>?/gm, '');

    return (
        <div className={styles.popupOverlayMapa}>
            <Draggable 
                nodeRef={nodeRef} 
                handle={`.${styles.tituloDraggable}`}
                bounds={{
                    left: 0,
                    right: window.innerWidth - 540,  
                    bottom: window.innerHeight - 800
                }}
            >
                <div ref={nodeRef} className={styles.popupBoxMapa}>
                    <div className={styles.tituloDraggable}>
                        <h3>{titulo}</h3>
                        <button className={styles.btnFecharPopup} onClick={onFechar}>
                            <AiOutlineClose />
                        </button>
                    </div>

                    <p className={styles.conteudoLimitado}>
                        {textoLimpo}
                    </p>

                    {/* NOVO BOTÃO: Ver Artigo (só aparece se houver um linkDestino) */}
                    {linkDestino && (
                        <Link to={linkDestino} className={styles.btnPopupMapa}>
                            Ver Artigo
                        </Link>
                    )}

                    {/* BOTÃO EXISTENTE: Fechar */}
                    {/* A lógica foi simplificada, mantendo apenas o botão Fechar */}
                    <button 
                        className={styles.btnPopupMapa + (linkDestino ? ` ${styles.btnSecundario}` : '')} 
                        onClick={onFechar}
                    >
                        Fechar
                    </button>
                    
                </div>
            </Draggable>
        </div>
    );
}

export default PopupMapa;