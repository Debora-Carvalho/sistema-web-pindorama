//popup para colocar o local no artigo

import React, { useState } from 'react';
import styles from './PopupLocal.module.scss';
import { FaTimes } from 'react-icons/fa';

function PopupLocal({ aberto, onClose, onSelect, locais = [] }) {
  const [busca, setBusca] = useState('');

  if (!aberto) return null;

  // Filtro para buscar
  const locaisFiltrados = locais.filter(local => 
    local.cidade.toLowerCase().includes(busca.toLowerCase()) ||
    local.estado.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={styles.popup} onClick={onClose}>
      <div className={styles.popupAberto} onClick={e => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h2>Selecione o Local</h2>
          <button onClick={onClose} className={styles.btnFechar}><FaTimes /></button>
        </div>

        <div className={styles.popupBusca}>
          <input 
            type="text" 
            placeholder="Buscar cidade ou estado..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>

        <ul className={styles.popupLista}>
          {locaisFiltrados.map(local => (
            <li key={local.id} onClick={() => onSelect(local)}>
              {local.cidade} - {local.estado}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PopupLocal;