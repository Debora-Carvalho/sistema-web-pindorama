import React from 'react';
import styles from './PopupConfirmar.module.scss';

function PopupConfirmar({ aberto, mensagem, onCancelar, onConfirmar, disabled=false }) {
    if (!aberto) return null;

    return (
        <div className={styles.popupOverlayConfirmar}>
            <div className={styles.popupBoxConfirmar}>
                <p>{mensagem}</p>
                <div className={styles.popupActions}>
                    <button 
                        className={styles.btnCancelar} 
                        onClick={onCancelar}
                    >
                        Cancelar
                    </button>
                    <button 
                        className={`${styles.btnConfirmar} ${disabled ? styles.btnConfirmarDisabled : ""}`} 
                        onClick={onConfirmar}
                        disabled={disabled}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupConfirmar;
