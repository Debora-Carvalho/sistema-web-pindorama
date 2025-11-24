import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from "../PaginaConfiguracoes/Configuracoes.module.scss";
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
//import Loading from "../../../components/Loading/Loading.jsx";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logotipo from '../../../components/Logotipo/Logotipo.jsx';
import ThemeToggle from '../../../components/ThemeToggle/ThemeToggle.jsx';

function PaginaConfiguracoes() {
  useTituloDocumento("Configurações | Pindorama");

  const navigate = useNavigate();
  const [modoNoturnoAtivo, setModoNoturnoAtivo] = useState(false);
  const [modalTemaAberto, setModalTemaAberto] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Logotipo tipo='admin' />
        <HeaderAdmin />
      </header>

      <div className={styles.configuracoesContainer}>

        <h1 className={styles.titleConfig}>Configurações</h1>

        <div className={styles.backgroundConfiguracoes}>
           

          <div className={styles.infoSobreMim}>
            <p className={styles.titleInfo}>Sobre mim</p>
            <button
              className={styles.btnConfig}
              onClick={() => navigate("/sobre")}
            >
              Editar
            </button>
          </div>

          <div className={styles.infoTema}>
            <p className={styles.titleInfo}>Mudar tema</p>
            <button
              className={styles.btnConfig}
              onClick={() => setModalTemaAberto(true)}
              >
              Alterar
            </button>
          </div>
      </div>

      {modalTemaAberto && (
        <ThemeToggle
          aberto={modalTemaAberto}
          onCancelar={() => setModalTemaAberto(false)}
          onConfirmar={() => setModalTemaAberto(false)}
          />
      )}
          </div>
    </>
  );
}
export default PaginaConfiguracoes;
