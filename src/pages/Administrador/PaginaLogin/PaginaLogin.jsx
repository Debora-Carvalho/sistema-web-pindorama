import styles from './PaginaLogin.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import cachorro from '../../../assets/images/CachorroPaginaLogin.png';
import { FaArrowCircleRight } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import { useState } from 'react';
import { useLogin } from '../../../hooks/login/useLogin.js'

function PaginaLogin() {
  useTituloDocumento("Login | Pindorama");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senha, setSenha] = useState('')

  const { data, loading, error, login } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      await login(senha)
      window.location.href = "/pagina-inicial-admin";
    } catch (err){
    }
  }
  return (
    <>
      <div className={styles.containerLogin}>
        <div className={styles.columDoguinho}>
          <img className={styles.doguinho} src={cachorro} alt="Cachorro caramelo" />
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
              className={styles.inputLogin}
              type={mostrarSenha ? "text" : "password"}
              id="senha"
              name="senha"
              minLength="6"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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
              // onClick={() => window.location.href = "/pagina-inicial-admin"}
              type="submit"
              disabled={loading}
            >
              <FaArrowCircleRight className={styles.btnEntrarLogin} />
            </button>
          </div>

          {/* Adicionar o componente de carregamento aqui */}
          {loading && <p>Entrando...</p>}

          {/* Adicionar componente ou pop-up de erro aqui */}
          {error && <p> {error} </p>}
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
