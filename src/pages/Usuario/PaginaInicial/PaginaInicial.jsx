import styles from './PaginaInicial.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import BannerPrincipal from '../../../components/BannerPrincipal/BannerPrincipal.jsx';

function PaginaInicial() {
	useTituloDocumento("Início | Pindorama"); // mudando o Title da pagina

	return (
		<>
			<div className={styles.container}>
				<Header />

				<main className={styles.containerInicioItems}>
					<BannerPrincipal />
				</main>

				<Footer />

			</div>
		</>
	)
}

export default PaginaInicial;