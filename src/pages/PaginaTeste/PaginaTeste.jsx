import { useState, useEffect } from 'react';
import styles from './PaginaTeste.module.scss';
import useTituloDocumento from '../../hooks/useTituloDocumento.js';
import Loading from "../../components/Loading/Loading.jsx";

import ThemeToggle from '../../components/ThemeToggle/ThemeToggle.jsx';
import PopupSucesso from "../../components/Popups/PopupSucesso/PopupSucesso.jsx";
import PopupConfirmar from "../../components/Popups/PopupConfirmar/PopupConfirmar.jsx";
import PopupCriar from "../../components/Popups/PopupCriar/PopupCriar.jsx";

import PopupAdicionarTag from "../../components/Popups/PopupAdicionarTag/PopupAdicionarTag.jsx";
import CardPadraoAdmin from '../../components/CardPadrao/Admin/CardPadraoAdmin/CardPadraoAdmin.jsx';
import PlayerCustomizado from '../../components/PlayerCustomizado/PlayerCustomizado.jsx'
import audioTeste from '../../assets/audio/Final.mp3'

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

	const [popupTagAberto, setPopupTagAberto] = useState(false);
	const [tagsSelecionadas, setTagsSelecionadas] = useState([]);

	const handleConfirmarTags = (tags) => {
		setTagsSelecionadas(tags);
		setPopupTagAberto(false);
	};

	
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// simula um carregamento (API, dados, etc.)
		const timer = setTimeout(() => setLoading(false), 4500);
		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return <Loading />; // mostra a tela de carregamento
	}

	return (
		<>

			<div className={styles.container}>

				<p className={styles.titulo}>
					Olá, sou uma página teste
				</p>

				<p className={styles.paragrafo}>
					Utilize os botões abaixo para navegar pelos temas.
				</p>

				<PlayerCustomizado src={audioTeste} />

				<CardPadraoAdmin
					imagem="https://i.pinimg.com/originals/ae/75/bb/ae75bb989466498589f4faa1e3e5b426.jpg"
					tipo="artigo"
					titulo="A Língua Tupi"
					link="/artigos/4"
				/>

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

				<button onClick={() => setPopupTagAberto(true)}>
					Adicionar Tags ao Artigo
				</button>

				<PopupAdicionarTag
					aberto={popupTagAberto}
					onCancelar={() => setPopupTagAberto(false)}
					onConfirmar={handleConfirmarTags}
				/>

				{tagsSelecionadas.length > 0 && (
					<div>
						<h3>Tags escolhidas:</h3>
						<ul>
							{tagsSelecionadas.map((tag) => (
								<li key={tag}>#{tag}</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</>
	)
}

export default PaginaTeste;