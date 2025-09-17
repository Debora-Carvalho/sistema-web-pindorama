import { Link } from 'react-router-dom';
import styles from './FooterCopy.module.scss';

function FooterCopy() {
	return (
		<div className={styles.containerFooterCopy}>
			<p className={styles.text}>
				Copyright &copy; {new Date().getFullYear()} Pindorama. Todos os direitos reservados.
				Desenvolvido com 🤍 por ALIJAD
			</p>

			<div className={styles.linksFooterCopy}>
				<Link className={styles.itemLinkFooterCopy}>Políticas de privacidade</Link>
				<Link className={styles.itemLinkFooterCopy}>Termos de uso</Link>
			</div>
		</div>
	);
};

export default FooterCopy;