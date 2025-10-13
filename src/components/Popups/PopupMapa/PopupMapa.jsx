import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './PopupMapa.module.scss';

import { AiOutlineClose } from "react-icons/ai";

function PopupMapa({ aberto, titulo, descricao, textoBotao, linkDestino, onFechar }) {
    if (!aberto) return null;

    return (
        <div className={styles.popupOverlayMapa}>
            <div className={styles.popupBoxMapa}>
                <button className={styles.btnFecharPopup} onClick={onFechar}>
                    <AiOutlineClose />
                </button>

                <h3>{titulo}</h3>
                <p>{descricao}</p>

                {/* Botão principal como link */}
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
        </div>
    );
}

export default PopupMapa;
