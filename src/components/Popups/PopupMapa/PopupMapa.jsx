import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import styles from './PopupMapa.module.scss';

function PopupMapa({ aberto, titulo, descricao, textoBotao, linkDestino, onFechar }) {
    const popupRef = useRef(null);
    const nodeRef = useRef(null); // ✅ ref para o Draggable

    if (!aberto) return null;

    const handleOverlayClick = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            onFechar();
        }
    };

    return (
        <div className={styles.popupOverlayMapa} onClick={handleOverlayClick}>
            <Draggable nodeRef={nodeRef} handle={`.${styles.tituloDraggable}`}>
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
