import { Link } from 'react-router-dom';
import FooterCopy from './FooterCopy/FooterCopy.jsx';
import FormContato from './FormContato/FormContato.jsx';
import styles from './Footer.module.scss';
import IconElementoApoio from '../../assets/icons/icon-cacto-apoio-footer.png';

function Footer() {
	return (
		<footer>
			<div className={styles.containerFooter}>
				<p className={styles.nomeDestaque}>
					Pindorama
				</p>

				<div>
					<FormContato />
				</div>

				<div className={styles.linksFooter}>
					<h2>Links</h2>

					<div>
						<Link to='/artigos' className={styles.itemLinkFooter}>Artigos</Link>
						<Link to='/eventos' className={styles.itemLinkFooter}>Eventos</Link>
						<Link to='/organizacoes' className={styles.itemLinkFooter}>Organizações</Link>
						<Link to='/sobre' className={styles.itemLinkFooter}>Sobre mim</Link>
					</div>
				</div>

				<div>
					<img src={IconElementoApoio} alt='Ilustração de apoio' className={styles.iconFooter} />
				</div>
			</div>

			<FooterCopy />
		</footer>
	);
};

export default Footer;