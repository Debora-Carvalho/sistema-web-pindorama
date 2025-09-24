import styles from './PaginaInicial.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import BannerPrincipal from '../../../components/BannerPrincipal/BannerPrincipal.jsx';
import Agenda from '../../../components/Agenda/Agenda.jsx';
import ArtigosDestaque from '../../../components/Conteudo/ArtigosDestaque/ArtigosDestaque.jsx';
import EventosDestaque from '../../../components/EventosDestaque/EventosDestaque.jsx';
import ProximosEventos from '../../../components/Conteudo/ProximosEventos/ProximosEventos.jsx';
import GaleriaFotos from '../../../components/GaleriaFotos/GaleriaFotos.jsx';

function PaginaInicial() {
	useTituloDocumento("Início | Pindorama"); // mudando o Title da pagina

	return (
		<>
			<div className={styles.container}>
				<Header />

				<main className={styles.containerInicioItems}>
					<BannerPrincipal />

					<section>
						<ArtigosDestaque />
					</section>

					<section className={styles.sectionAgendaEventos}>
						<div className={styles.containerAgenda}>
							<Agenda />
						</div>

						<div className={styles.containerEvento}>
							<EventosDestaque />
						</div>
					</section>

					<section>
						<ProximosEventos />
					</section>

					<section>
						<GaleriaFotos />
					</section>
				</main>

				<Footer />

			</div>
		</>
	)
}

export default PaginaInicial;