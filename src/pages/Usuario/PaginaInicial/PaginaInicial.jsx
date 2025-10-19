import React, { useState } from 'react';
import styles from './PaginaInicial.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import BannerPrincipal from '../../../components/BannerPrincipal/BannerPrincipal.jsx';
import Agenda from '../../../components/Agenda/Agenda.jsx';
import ArtigosDestaque from '../../../components/Conteudo/ArtigosDestaque/ArtigosDestaque.jsx';
import EventosDestaque from '../../../components/EventosDestaque/EventosDestaque.jsx';
import ProximosEventos from '../../../components/Conteudo/ProximosEventos/ProximosEventos.jsx';
import GaleriaFotos from '../../../components/Conteudo/GaleriaFotos/GaleriaFotos.jsx';
import { useTts } from '../../../hooks/conf/useTts.js' 

function PaginaInicial() {
    useTituloDocumento("Início | Pindorama"); // mudando o Title da pagina 
    const ttsProps = useTts();
    const [pageText, setPageText] = useState("Carregando artigos em destaque..."); 
    const handleArtigosTextReady = (extractedText) => {
        setPageText(extractedText); 
    };

    const textToRead = pageText;

    return (
        <>
            <div className={styles.container}>
                <Header ttsProps={ttsProps} textToRead={textToRead} />

                <main className={styles.containerInicioItems}>
                    <BannerPrincipal />

                    <section>
                        <ArtigosDestaque onTextReady={handleArtigosTextReady} />
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