import { useState } from 'react';
import styles from './PaginaTeste.module.scss';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';

import CardPadrao from '../../components/CardPadrao/CardPadrao.jsx';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle.jsx';
import PopupSucesso from "../../components/Popups/PopupSucesso/PopupSucesso.jsx";
import PopupConfirmar from "../../components/Popups/PopupConfirmar/PopupConfirmar.jsx";
import PopupCriar from "../../components/Popups/PopupCriar/PopupCriar.jsx";

function PaginaTeste() {
	useTituloDocumento("Teste | Pindorama"); // mudando o Title da pagina

	const [popupAberto, setPopupAberto] = useState(false);

	const [popupConfirmarAberto, setPopupConfirmarAberto] = useState(false);
	const [popupSucessoAberto, setPopupSucessoAberto] = useState(false);
	const [popupCriarAberto, setPopupCriarAberto] = useState(false);

	const handleConfirmar = () => {
		setPopupConfirmarAberto(false); // fecha o confirmar
		setPopupSucessoAberto(true); // abre o sucesso
	};

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

				<button onClick={() => setPopupAberto(true)}>
					Mostrar Popup de Sucesso
				</button>

				<PopupSucesso
					aberto={popupAberto}
					mensagem="Seu artigo foi criado com sucesso."
					textoBotao="Ok, entendi!"
					onBotaoClick={() => setPopupAberto(false)}
				/>

				<button onClick={() => setPopupConfirmarAberto(true)}>
					Mostrar Popup de Confirmação
				</button>

				<PopupConfirmar
					aberto={popupConfirmarAberto}
					mensagem="Tem certeza que deseja confirmar esta ação?"
					onCancelar={() => setPopupConfirmarAberto(false)}
					onConfirmar={handleConfirmar}
				/>

				<PopupSucesso
					aberto={popupSucessoAberto}
					mensagem="Ação confirmada com sucesso!"
					textoBotao="Fechar"
					onBotaoClick={() => setPopupSucessoAberto(false)}
				/>

				<button onClick={() => setPopupCriarAberto(true)}>
					Mostrar Popup para selecionar criação de artigo ou evento
				</button>

				<PopupCriar
					aberto={popupCriarAberto}
					onFechar={() => setPopupCriarAberto(false)}
				/>

				<CardPadrao />
			</div>
		</>
	)
}

export default PaginaTeste;