import React from 'react';
import styles from './PopupSucesso.module.scss';

function PopupSucesso({ aberto, mensagem, textoBotao, onBotaoClick }) {
    if (!aberto) return null;

    return (
        <div className={styles.popupOverlaySucesso}>
            <div className={styles.popupBoxSucesso}>
                <p>{mensagem}</p>
                <button className={styles.btnPopupSucesso} onClick={onBotaoClick}>
                    {textoBotao}
                </button>
            </div>
        </div>
    );
}

export default PopupSucesso;