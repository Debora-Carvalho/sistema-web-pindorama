import React from 'react';
import styles from './PopupErro.module.scss';

function PopupErro({ aberto, mensagem }) {
  if (!aberto) return null;

  return (
    <div className={styles.popupOverlayErro}>
      <div className={styles.popupBoxErro}>
        <p>{mensagem}</p>
      </div>
    </div>
  );
}

export default PopupErro;
