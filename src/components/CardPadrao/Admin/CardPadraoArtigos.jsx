import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import styles from './CardPadraoArtigos.module.scss';
import { FaRegEdit } from "react-icons/fa";
import { PiHighlighterFill } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";

function CardPadrao() {
	const [aberto, setAberto] = useState(false);

	const toggleMenu = () => {
		setAberto(!aberto);
	};

	return (
		<div className={styles.containerVisualizar}>
		<div className={styles.cardGeral}>
				<img
					className={styles.imgCard}
					src="https://i.pinimg.com/736x/59/5d/cf/595dcf5a6404fed875a1be2d36078375.jpg"
					alt="Imagem do artigo"
				/>
			<div className={styles.cardInfos}>
				<p className={styles.cardTitulo}>
					A ancestralidade na dança
				</p>
				<button className={styles.btnCompleto}>
					Ver artigo completo
				</button>
			</div>

			<div className={styles.cardMenu}>
				<button onClick={toggleMenu} className={styles.iconeMenu}>
					<FaEllipsisV />
				</button>

				{aberto && (
					<ul className={styles.opcoesMenu}>
						<li>
							<button className={styles.btnEditar}>Editar
								<FaRegEdit  className={styles.iconOptions} />
							</button>
						</li>
						<li>
							<button className={styles.btnDestacar}>Destacar
								<PiHighlighterFill  className={styles.iconOptions} />
							</button>
						</li>
						<li>
							<button className={styles.btnExcluir}>Excluir
								<FaRegTrashAlt  className={styles.iconOptions}/>
							</button>
						</li>
					</ul>
				)}
			</div>
		</div>
		</div>
	);
}

export default CardPadrao;
