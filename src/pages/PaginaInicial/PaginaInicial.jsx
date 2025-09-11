import styles from './PaginaInicial.module.scss';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';

import CardPadrao from '../../components/CardPadrao/CardPadrao.jsx';

function PaginaInicial() {
	useTituloDocumento("Início | Pindorama"); // mudando o Title da pagina

	return (
		<>
			<div className={styles.container}>
				<p className={styles.titulo}>
					Pagina inicial aqui
				</p>

				<CardPadrao />
			</div>
		</>
	)
}

export default PaginaInicial;