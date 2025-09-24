//POPUP PARA ADICIONAR DATA NA PÁGINA DE CRIAR EVENTOS

import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './PopupCalendario.module.scss';

registerLocale('pt-BR', ptBR);

function PopupCalendario({ aberto, onClose, onConfirmar, dataSelecionada }) {
  const [data, setData] = useState(dataSelecionada || new Date());
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);

  if (!aberto) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupBox}>
        <DatePicker
          selected={data}
          onChange={(date) => setData(date)}
          locale="pt-BR"
          inline
          minDate={amanha}
        />
        <div className={styles.popupActions}>
          <button className={styles.btnCancelar} onClick={onClose}>Cancelar</button>
          <button className={styles.btnConfirmar} onClick={() => onConfirmar(data)}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default PopupCalendario;