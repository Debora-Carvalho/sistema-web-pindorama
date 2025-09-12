import styles from './CardPadrao.module.scss';

function CardPadrao() {
	return (
		<>
			<div className={styles.container}>
				<p className={styles.texto}>
					card de eventos/artigos
				</p>
			</div>
		</>
	)
}

export default CardPadrao;