import React, { useEffect } from 'react';
import styles from './PopupErro.module.scss';

function PopupErro({ aberto, mensagem, tipo = 'padrao', onClose, duracao = 3000 }) {
  useEffect(() => {
    if (aberto) {
      const timer = setTimeout(() => {
        onClose?.(); 
      }, duracao);

      return () => clearTimeout(timer); 
    }
  }, [aberto, duracao, onClose]);

  if (!aberto) return null;

  return (
    <div className={styles.popupOverlayErro}>
      <div className={`${styles.popupBoxErro} ${styles[tipo]}`}>
        <p>{mensagem}</p>
      </div>
    </div>
  );
}

export default PopupErro;
