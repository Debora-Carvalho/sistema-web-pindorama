import React, { useState, useEffect } from 'react';
import styles from './PopupLocalLink.module.scss';
import { FaTimes } from 'react-icons/fa';

const isUrlValida = (string) => {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
};

function PopupLocalLink({ aberto, onClose, onConfirmar, linkAtual }) {
  const [link, setLink] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (aberto) {
      setLink(linkAtual || '');
      setErro('');
    }
  }, [aberto, linkAtual]);

  if (!aberto) return null;

  const handleConfirmar = () => {
    if (isUrlValida(link)){
      onConfirmar(link.trim());
    }else{
      setErro('Por favor, insira um link válido (ex: https://...)');
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupBox} onClick={e => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2>Local do Evento</h2>
          <button onClick={onClose} className={styles.btnClose}><FaTimes /></button>
        </div>

        <div className={styles.popupContent}>
          <label htmlFor="link-local">Seja presencial ou online...</label>
          <input
            id="link-local"
            type="url"
            placeholder="Adicione o link do Google Maps ou Google Meet"
            value={link}
            onChange={e => setLink(e.target.value)}
          />

          {erro && <p className={styles.mensagemErro}>{erro}</p>}
        </div>

        <div className={styles.popupActions}>
          <button className={styles.btnCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.btnConfirmar} onClick={handleConfirmar}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default PopupLocalLink;