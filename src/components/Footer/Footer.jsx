import { Link } from 'react-router-dom';
import FooterCopy from './FooterCopy/FooterCopy.jsx';
import FormContato from './FormContato/FormContato.jsx';
import styles from './Footer.module.scss';
import iconElementoApoio from '../../assets/icons/icon-cacto-apoio-footer.png';

function Footer() {
	return (
		<footer>
			<div className={styles.containerFooter}>
				<p>Pindorama</p>

				<div>
					<FormContato />
				</div>

				<div className={styles.linksFooter}>
					<h2>Links</h2>

					<Link className={styles.itemLinkFooter}>Artigos</Link>
					<Link className={styles.itemLinkFooter}>Eventos</Link>
					<Link className={styles.itemLinkFooter}>Organizações</Link>
					<Link className={styles.itemLinkFooter}>Sobre mim</Link>
				</div>

				<div>
					<img src={iconElementoApoio} alt='Ilustração de apoio' className={styles.iconFooter} />
				</div>
			</div>

			<FooterCopy />
		</footer>
	);
};

export default Footer;