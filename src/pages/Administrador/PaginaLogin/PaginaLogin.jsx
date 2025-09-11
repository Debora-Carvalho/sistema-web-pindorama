import styles from './PaginaLogin.module.scss';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';

function PaginaLogin() {
	useTituloDocumento("Login | Pindorama"); // mudando o Title da pagina

	return (
		<>
			<div className={styles.container}>
				<p className={styles.titulo}>
					Pagina Login aqui
				</p>
			</div>
		</>
	)
}

export default PaginaLogin;