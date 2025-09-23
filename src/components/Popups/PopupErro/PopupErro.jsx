import React from 'react';
import styles from './PopupErro.module.scss';

function PopupErro({ aberto, mensagem, onClose, tipo = 'padrao' }) {
  if (!aberto) return null;

  return (
    <div className={styles.popupOverlayErro}>
      <div className={`${styles.popupBoxErro} ${styles[tipo]}`}>
        <p>{mensagem}</p>
        <button className={styles.btnPopupErro} onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
}


export default PopupErro;
