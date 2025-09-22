import styles from './PaginaInicial.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import BannerPrincipal from '../../../components/BannerPrincipal/BannerPrincipal.jsx';
import Agenda from '../../../components/Agenda/Agenda.jsx';
import EventosDestaque from '../../../components/EventosDestaque/EventosDestaque.jsx';

function PaginaInicial() {
	useTituloDocumento("Início | Pindorama"); // mudando o Title da pagina

	return (
		<>
			<div className={styles.container}>
				<Header />

				<main className={styles.containerInicioItems}>
					<BannerPrincipal />

					<section></section>

					<section className={styles.sectionAgendaEventos}>
						<div className={styles.containerAgenda}>
							<Agenda />
						</div>

						<div className={styles.containerEvento}>
							<EventosDestaque />
						</div>
					</section>

					<section></section>
				</main>

				<Footer />

			</div>
		</>
	)
}

export default PaginaInicial;