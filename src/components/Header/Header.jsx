import styles from './Header.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';

import LogoPindorama from "../../assets/images/pindorama_logo5.png";

import { CgSearch } from "react-icons/cg";
import GroupBtnAcessibilidade from './GroupBtnAcessibilidade/GroupBtnAcessibilidade';

function Header() {
	const location = useLocation();
	const navigate = useNavigate();

	const handleClick = (section) => {
		if (section === 'inicio') {
			navigate("/inicio");
		}
		if (section === 'artigos') {
			navigate('/visualizar-artigos');
		}
		if (section === 'eventos') {
			navigate('/visualizar-eventos');
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
			<div className={styles.containerHeaderPrincipal}>
				<div
					className={styles.logoHeaderPrincipal}
					style={{ cursor: "pointer" }}
					onClick={() => navigate("/")}
				>
					<img className={styles.logo} src={LogoPindorama} alt="Logo do site Pindorama" />
				</div>

				<div className={styles.headerPrincipal}>
					<div className={styles.headerPrincipalItems}>
						<button
							className={`${styles['headerBtn']} ${location.pathname === '/inicio' ? styles.active : ''}`}
							onClick={() => handleClick('inicio')}
						>
							Início
						</button>

						<button
							className={`${styles['headerBtn']} ${location.pathname === '/visualizar-artigos' ? styles.active : ''}`}
							onClick={() => handleClick('artigos')}
						>
							Artigos
						</button>

						<button
							className={`${styles['headerBtn']} ${location.pathname === '/visualizar-eventos' ? styles.active : ''}`}
							onClick={() => handleClick('eventos')}
						>
							Eventos
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
							Sobre mim
						</button>

						<div>
							<CgSearch className={styles.btnSearch} />
						</div>
					</div>
				</div>
			</div>

			<GroupBtnAcessibilidade />
		</header>
	);
}

export default Header;