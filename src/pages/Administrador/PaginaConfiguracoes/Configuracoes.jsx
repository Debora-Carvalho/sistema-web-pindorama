import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from "../PaginaConfiguracoes/Configuracoes.module.scss";
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Loading from "../../../components/Loading/Loading.jsx";
import HeaderAdmin from '../../../components/HeaderAdmin/HeaderAdmin.jsx';
import Logotipo from '../../../components/Logotipo/Logotipo.jsx';

function PaginaConfiguracoes() {
  useTituloDocumento("Configurações | Pindorama");

  const navigate = useNavigate();
  const [leituraVozAtiva, setLeituraVozAtiva] = useState(false);
  const [modoNoturnoAtivo, setModoNoturnoAtivo] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Logotipo tipo='admin' />
        <HeaderAdmin />
      </header>

      <div className={styles.configuracoesContainer}>

        <h1 className={styles.titleConfig}>Configurações</h1>

        <div className={styles.backgroundConfiguracoes}>
          <div className={styles.infoAcessibilidade}>
            <p className={styles.titleAcessibilidade}>Acessibilidade</p>

            <div className={styles.leituraVoz}>
              <p>Leitura em voz alta</p>
              <button
                className={styles.btnConfig}
                aria-pressed={leituraVozAtiva}
                onClick={() => setLeituraVozAtiva(!leituraVozAtiva)}
              >
                {leituraVozAtiva ? "Desabilitar" : "Habilitar"}
              </button>
            </div>

            <div className={styles.noturnoConfig}>
              <p>Modo Noturno</p>
              <button
                className={styles.btnConfig}
                aria-pressed={modoNoturnoAtivo}
                onClick={() => setModoNoturnoAtivo(!modoNoturnoAtivo)}
              >
                {modoNoturnoAtivo ? "Desabilitar" : "Habilitar"}
              </button>
            </div>
          </div>

          <div className={styles.infoSobreMim}>
            <p>Sobre mim</p>
            <button
              className={styles.btnConfig}
              onClick={() => navigate("/adm/sobre-mim")}
            >
              Editar
            </button>
          </div>

          <div className={styles.infoTema}>
            <p>Mudar tema</p>
            <button
              className={styles.btnConfig}
              onClick={() => navigate("/adm/")}
            >
              Alterar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaginaConfiguracoes;
