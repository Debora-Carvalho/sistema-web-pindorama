import styles from './PaginaInicial.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';

function PaginaInicial() {
	useTituloDocumento("Início | Pindorama"); // mudando o Title da pagina

	return (
		<>
			<div className={styles.container}>
				<Header />

				<p className={styles.titulo}>
					Página inicial aqui
				</p>

				<Footer />

			</div>
		</>
	)
}

export default PaginaInicial;