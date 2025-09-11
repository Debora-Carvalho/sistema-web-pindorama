import styles from './PaginaTeste.module.scss';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';

import CardPadrao from '../../components/CardPadrao/CardPadrao.jsx';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle.jsx';

function PaginaTeste() {
	useTituloDocumento("Teste | Pindorama"); // mudando o Title da pagina

	return (
		<>
			<div className={styles.container}>
				<p className={styles.titulo}>
					Olá, sou uma página teste
				</p>

				<p className={styles.paragrafo}>
					Utilize os botões abaixo para navegar pelos temas.
				</p>

				<ThemeToggle />

				<CardPadrao />
			</div>
		</>
	)
}

export default PaginaTeste;