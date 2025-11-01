import { useContext, useEffect, useState } from 'react';
import styles from './ThemeToggle.module.scss';
import {
	ThemeContext,
	DEFAULT_THEME,
	DARK_THEME,
	NORDESTINO_THEME,
	INDIGENA_THEME
} from '../../contexts/ThemeContext';

import { LuSun } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
import { RiCactusLine } from "react-icons/ri";
import { BsFeather } from "react-icons/bs";

export default function ThemeToggle({ aberto, onCancelar, onConfirmar }) {
	const { globalTheme, setGlobalTheme } = useContext(ThemeContext);
	const [modalAberto, setModalAberto] = useState(aberto);
	const [temaSelecionado, setTemaSelecionado] = useState(globalTheme);
	const [temaAnterior, setTemaAnterior] = useState(globalTheme);

	// abre/fecha o modal conforme prop externa
	useEffect(() => {
		setModalAberto(aberto);
		if (aberto) setTemaAnterior(globalTheme); // salva o tema atual antes da troca
	}, [aberto]);

	// quando o usuário clica em um botão de tema → apenas pré-visualiza
	const handlePreview = (novoTema) => {
		setTemaSelecionado(novoTema);
		setGlobalTheme(novoTema);
	};

	// cancelar: volta o tema anterior e fecha o modal
	const handleCancelar = () => {
		setGlobalTheme(temaAnterior);
		setModalAberto(false);
		if (onCancelar) onCancelar();
	};

	// confirmar: mantém o novo tema e fecha o modal
	const handleConfirmar = () => {
		setTemaAnterior(temaSelecionado);
		setModalAberto(false);
		if (onConfirmar) onConfirmar(temaSelecionado);
	};

	if (!modalAberto) return null;

	return (
		<div className={styles.modalOverlayTheme}>
			<div className={styles.containerModalTheme}>
				<div className={styles.containerInfos}> 
					<h3>Alterar tema</h3>

					<p>
						Selecione abaixo um tema de cor para pré-visualizar a aparência do site.
						Ao clicar em <b>Confirmar</b>, o novo tema será aplicado em todo o site para todos os usuários de Pindorama.
					</p>
				</div>

				<div className={styles.containerButtons}>
					<button
						className={`${styles.btnTheme} ${
      temaSelecionado === DEFAULT_THEME ? styles.btnSelecionado : ""
    }`}
						onClick={() => handlePreview(DEFAULT_THEME)}
						disabled={temaSelecionado === DEFAULT_THEME}
					>
						<LuSun className={styles.btnThemeIcon} />
						Default (tema padrão)
					</button>

					<button
						className={`${styles.btnTheme} ${
      temaSelecionado === DARK_THEME ? styles.btnSelecionado : ""
    }`}
						onClick={() => handlePreview(DARK_THEME)}
						disabled={temaSelecionado === DARK_THEME}
					>
						<LuMoon className={styles.btnThemeIcon} />
						Dark (tema escuro)
					</button>

					<button
						className={`${styles.btnTheme} ${
      temaSelecionado === NORDESTINO_THEME ? styles.btnSelecionado : ""
    }`}
						onClick={() => handlePreview(NORDESTINO_THEME)}
						disabled={temaSelecionado === NORDESTINO_THEME}
					>
						<RiCactusLine className={styles.btnThemeIcon} />
						Nordestino
					</button>

					<button
						className={`${styles.btnTheme} ${
      temaSelecionado === INDIGENA_THEME ? styles.btnSelecionado : ""
    }`}
						onClick={() => handlePreview(INDIGENA_THEME)}
						disabled={temaSelecionado === INDIGENA_THEME}
					>
						<BsFeather className={styles.btnThemeIcon} />
						Indígena
					</button>
				</div>

				<div className={styles.modalActions}>
					<button
						type="button"
						className={styles.btnCancelar}
						onClick={handleCancelar}>
						Cancelar
					</button>

					<button
						type="button"
						className={styles.btnConfirmar}
						onClick={handleConfirmar}>
						Confirmar
					</button>
				</div>
			</div>
		</div>
	);
};
