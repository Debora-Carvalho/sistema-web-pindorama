import React from 'react'
import styles from './PaginaSobreMim.module.scss'
import Header from '../../../components/Header/Header.jsx'
import FooterSobreMim from '../../../components/Footer/FooterSobreMim/FooterSobreMim.jsx'
import useTituloDocumento from '../../../hooks/useTituloDocumento.js'
import FormSobreMim from '../../../components/Footer/FormSobreMim/FormSobreMim.jsx'
import KellyPerfil from '../../../assets/images/Kelly.jpg'

function PaginaSobreMim() {
    useTituloDocumento('Sobre Mim | Pindorama')

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.perfil}>
                    <img src={KellyPerfil} alt="" />
                    <h3>Kelly Cristina Marques</h3>
                </div>
                <div className={styles.sobre}>
                    <p className={styles.texto}>
                        Muito prazer! Me chamo Kelly e no momento leciono Inglês na FATEC Zona Leste 
                        em São Paulo, mas apesar de minha profissão se tratar de algo mais internacional,
                        sou simplesmente apaixonada pelo Forró e a cultura nordestina. Essa paixão me fez
                        buscar mais e mais conhecimento da cultura tão diversificada que o Brasil tem.
                        <br />
                        <br />
                        Nesse momento estou no 1º ano do mestrado do IPHAN, que é uma autarquia federal 
                        vinculada ao Ministério da Cultura responsável por preservar, proteger e promover 
                        o patrimônio cultural brasileiro. Realizo palestras e eventos para poder compartilhar
                        os conhecimentos que venho adquirindo, buscando ensinar e conscientizar a população sobre
                        a importância que nossa cultura tem, sem permitir que caia no esquecimento para as novas gerações.
                    </p>

                    <FormSobreMim />
                </div>
            </main>

            <FooterSobreMim />
        </>
    )
}

export default PaginaSobreMim