import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import styles from './PopupMapa.module.scss';

function PopupMapa({ aberto, titulo, descricao, textoBotao, linkDestino, onFechar }) {
    const nodeRef = useRef(null); //ref para o Draggable

    if (!aberto) return null;

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

                    <p>{descricao}</p>

                    {linkDestino ? (
                        <Link to={linkDestino} className={styles.btnPopupMapa}>
                            {textoBotao}
                        </Link>
                    ) : (
                        <button className={styles.btnPopupMapa} onClick={onFechar}>
                            {textoBotao}
                        </button>
                    )}
                </div>
            </Draggable>
        </div>
    );
}

export default PopupMapa;
