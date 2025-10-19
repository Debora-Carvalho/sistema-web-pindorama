import { useState } from 'react';
import styles from './FooterCopy.module.scss';
import PoliticasDePrivacidade from '../../Telas Estaticas/PoliticasDePrivacidade/PoliticasDePrivacidade';
import TermosDeUso from '../../Telas Estaticas/TermosDeUso/TermosDeUso';

function FooterCopy() {

	 const [mostrarPoliticas, setMostrarPoliticas] = useState(false);
     const [mostrarTermos, setMostrarTermos] = useState(false);

	return (
		<div className={styles.containerFooterCopy}>
			<p className={styles.text}>
				Copyright &copy; {new Date().getFullYear()} Pindorama. Todos os direitos reservados.
				Desenvolvido com 🤍 por ALIJAD
			</p>

			<div className={styles.linksFooterCopy}>
				<button
          className={styles.itemLinkFooterCopy}
          onClick={() => setMostrarPoliticas(true)}
        >
          Políticas de Privacidade
        </button>

        <button
          className={styles.itemLinkFooterCopy}
          onClick={() => setMostrarTermos(true)}
        >
           Termos de Uso
        </button>
			{mostrarPoliticas && (
        <PoliticasDePrivacidade onClose={() => setMostrarPoliticas(false)} />
      )}

      {mostrarTermos && (
        <TermosDeUso onClose={() => setMostrarTermos(false)} />
      )}
			</div>
		</div>
	);
};

export default FooterCopy;