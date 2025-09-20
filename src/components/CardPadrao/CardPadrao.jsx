import styles from './CardPadrao.module.scss';

function CardPadrao() {
	return (
		<>
			<div className={styles.containerVisualizar}>
				<p className={styles.texto}>
					card de eventos/artigos
				</p>
			</div>
		</>
	)
}

export default CardPadrao;