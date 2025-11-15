import styles from './Header.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';

// import GroupBtnAcessibilidade from './GroupBtnAcessibilidade/GroupBtnAcessibilidade.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import Logotipo from '../Logotipo/Logotipo.jsx';
import BtnToggleLightDark from '../BtnToggleLightDark/BtnToggleLightDark.jsx';
import BtnToggleLightDarkMobile from "../BtnToggleLightDark/BtnToggleLightDarkMobile/BtnToogleLightDarkMobile.jsx";

function Header({ acessibilidadeOverride, overrideClass, ocultarAcessibilidade }) {
	const location = useLocation();
	const navigate = useNavigate();

	const handleClick = (section) => {
		if (section === 'inicio') {
			navigate("/inicio");
		}
		if (section === 'artigos') {
			navigate('/artigos');
		}
		if (section === 'eventos') {
			navigate('/eventos');
		}
		if (section === 'galeria') {
			navigate('/galeria');
		}
		if (section === 'mapa') {
			navigate('/mapa');
		}
		if (section === 'organizacoes') {
			navigate('/organizacoes');
		}

		if (section === 'sobre') {
			navigate('/sobre');
		}
	}

	return (
		<header className={styles.container}>
			<div className={`${styles.containerHeaderPrincipal} ${overrideClass || ''}`}>
				<Logotipo tipo='user' />

				<div className={styles.headerPrincipal}>
					<div className={styles.headerPrincipalItems}>
						<button
							className={`${styles['headerBtn']} ${location.pathname === '/inicio' ? styles.active : ''}`}
							onClick={() => handleClick('inicio')}
						>
							Início
						</button>

						<button
							className={`${styles['headerBtn']} ${location.pathname === '/artigos' ? styles.active : ''}`}
							onClick={() => handleClick('artigos')}
						>
							Artigos
						</button>

						<button
							className={`${styles['headerBtn']} ${location.pathname === '/eventos' ? styles.active : ''}`}
							onClick={() => handleClick('eventos')}
						>
							Eventos
						</button>

						<button
							className={`${styles['headerBtn']} ${location.pathname === '/galeria' ? styles.active : ''}`}
							onClick={() => handleClick('galeria')}
						>
							Galeria
						</button>

						<button
							className={`${styles['headerBtn']} ${location.pathname === '/mapa' ? styles.active : ''}`}
							onClick={() => handleClick('mapa')}
						>
							Mapa
						</button>

						<button
							className={`${styles['headerBtn']} ${location.pathname === '/organizacoes' ? styles.active : ''}`}
							onClick={() => handleClick('organizacoes')}
						>
							Organizações
						</button>

						<button
							className={`${styles['headerBtn']} ${location.pathname === '/sobre' ? styles.active : ''}`}
							onClick={() => handleClick('sobre')}
						>
							Sobre a autora
						</button>

						{!ocultarAcessibilidade && (
							<BtnToggleLightDark overrideClass={acessibilidadeOverride} />
						)}
					</div>

					<div className={styles.navbarLateral}>
						<BtnToggleLightDarkMobile />
						<Navbar />
					</div>
				</div>
			</div>
		</header>


	);
}

export default Header;