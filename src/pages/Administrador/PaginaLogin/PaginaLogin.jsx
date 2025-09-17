import styles from './PaginaLogin.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import cachorro from '../../../assets/images/CachorroPaginaLogin.jpg'
import { FaArrowCircleRight } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";


function PaginaLogin() {
  useTituloDocumento("Login | Pindorama");

  return (
    <>
	<div className={styles.containerLogin}>
	<div className={styles.columDoguinho}> 
	 <img className={styles.doguinho} src={cachorro} alt="Cachorro caramelo" />
	</div>
      <div className={styles.columForm}>
	    <button onClick={() => window.location.href = "/pagina-inicial-usuario"}>
         <IoArrowBackCircleOutline className={styles.btnVoltarInicial}/>
        </button>
        <p className={styles.tituloLogin}>Bem vinda ao Pindorama</p>
        <p className={styles.word}>Digite sua senha para entrar</p>

        <div className={styles.sectionSenha}>
          <label htmlFor="senha"></label>
          <input  
		    className={styles.inputLogin}
            type="password"
            id="senha"
            name="senha"
            minLength="6"
            required
          />
          <button className={styles.btnLogin} 
		     onClick={() => window.location.href = "/pagina-inicial-admin"}>
		     < FaArrowCircleRight className={styles.btnEntrarLogin}/>
          </button>
        </div>

        <div className={styles.resetSenha}>
          <p >Esqueceu sua senha?</p>
          <a href="/redefinir-senha">Redefinir senha</a>
        </div>
      </div>
</div>
    </>
  );
}

export default PaginaLogin;
