import styles from './PaginaLogin.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import cachorro from '../../../assets/images/CachorroPaginaLogin.png';
import { FaArrowCircleRight } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { useState } from 'react';
import { useLogin } from '../../../hooks/login/useLogin.js'
import PopupErro from '../../../components/Popups/PopupErro/PopupErro.jsx';
import { tratamentoErro as tratarErro } from '../../../Helpers/tratamentoErro.js';
import Carregando from '../../../components/Carregando/Carregando.jsx';


function PaginaLogin() {
  useTituloDocumento("Login | Pindorama");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senha, setSenha] = useState('')
  const [erroMensagem, setErroMensagem] = useState('');
  const [erroSenha, setErroSenha] = useState('');


  const { data, loading, error, login } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErroMensagem(null);
      await login(senha);
      window.location.href = "/adm/inicio";
    } catch (err) {
      const erroTratado = tratarErro(err);
      setErroMensagem(erroTratado);
    }
  };

  return (
    <>
      <div className={styles.containerLogin}>
        <div className={styles.columDoguinho}>
          <img className={styles.imageLogin} src={cachorro} alt="Cachorro caramelo" />
        </div>
        <div className={styles.columForm}>
          <button onClick={() => window.location.href = "/pagina-inicial-usuario"}>
            <abbr title="Voltar para a página inicial de Pindorama">
              <IoArrowBackCircleOutline className={styles.btnVoltarInicial} />
            </abbr>
          </button>
          <form onSubmit={handleSubmit}>
            <p className={styles.tituloLogin}>Bem vinda ao Pindorama</p>
            <p className={styles.word}>Digite sua senha para entrar</p>

            <div className={styles.sectionSenha}>
              <label htmlFor="senha"></label>
              <input
                className={`${styles.inputLogin} ${erroSenha ? styles.inputErro : ''}`}
                type={mostrarSenha ? "text" : "password"}
                id="senha"
                name="senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  if (!/^.{6,}$/.test(e.target.value)) {
                    setErroSenha('A senha precisa ter pelo menos 6 caracteres.');
                  } else {
                    setErroSenha('');
                  }
                }}
              />

              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className={styles.btnMostrarSenha}
              >
                {mostrarSenha ? <IoEyeSharp /> : <BsEyeSlashFill />}
              </button>

              <button
                className={styles.btnLogin}
                //onClick={() => window.location.href = "/adm/inicio"}
                type="submit"
                disabled={loading}
              >
                <FaArrowCircleRight className={styles.btnEntrarLogin} />
              </button>
            </div>

            {loading && (
              <div className={styles.loaderOverlay}>
                <Carregando />
              </div>
            )}


            {erroMensagem && (
              <PopupErro
                aberto={!!erroMensagem}
                mensagem={erroMensagem.mensagem}
                tipo={erroMensagem.tipo}
                onClose={() => setErroMensagem(null)}
              />
            )}

            {erroSenha && <p className={styles.mensagemErro}>{erroSenha}</p>}


          </form>
          <div className={styles.resetSenha}>
            <a href="/redefinir-senha">Esqueceu sua senha?</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaginaLogin;
