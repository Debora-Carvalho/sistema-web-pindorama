import React from 'react';
import styles from './PaginaOrganizacoes.module.scss';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Unesco from '../../../assets/images/logoUnesco.png';
import Iphan from '../../../assets/images/logoIphan.png';
import Condephaat from '../../../assets/images/logoCondephaat.jpg';
import Conpresp from '../../../assets/images/logoConpresp.png';
import DPH from '../../../assets/images/logoDph.png';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';

const PaginaOrganizacoes = () => {
    useTituloDocumento("Organizações| Pindorama");
    return (
        <div className={styles.containerOrg}>
            <Header />
            <main>
                <h1 className={styles.titleOrg}>Orgãos de Patrimonialização</h1>
                <div className={styles.organizacaoCard}>
                    <div className={styles.orgaosRow1}>
                        <div className={styles.cardUnesco}>
                            <p className={styles.subtitleOrg1}>UNESCO</p>
                            <img className={styles.imgUnesco} src={Unesco} alt="logo da UNESCO" />
                            <button className={styles.btnOrg} onClick={() => window.location.href = 'https://www.unesco.org/en'}>
                                Saiba Mais
                            </button>
                        </div>

                        <div className={styles.cardIphan}>
                            <p className={styles.subtitleOrg1}>IPHAN</p>
                            <img className={styles.imgIphan} src={Iphan} alt="logo do IPHAN" />
                            <button className={styles.btnOrg} onClick={() => window.location.href = 'https://www.gov.br/iphan/pt-br'}>
                                Saiba Mais
                            </button>
                        </div>
                    </div>
                    <div className={styles.orgaosRow2}>
                        <div className={styles.cardCondephaat}>
                            <p className={styles.subtitleOrg2}>CONDEPHAAT</p>
                            <img className={styles.imgCondephaat} src={Condephaat} alt="logo do CONDEPHAAT" />
                            <button className={styles.btnOrg} onClick={() => window.location.href = 'https://www.cultura.sp.gov.br/sec_cultura/CONDEPHAAT/Portal_do_Patrimonio_Cultural'}>
                                Saiba Mais
                            </button>
                        </div>

                        <div className={styles.cardConpresp}>
                            <p className={styles.subtitleOrg2}>CONPRESP</p>
                            <img className={styles.imgConpresp} src={Conpresp} alt="logo do CONPRESP" />
                            <button className={styles.btnOrg} onClick={() => window.location.href = 'https://prefeitura.sp.gov.br/web/cultura/conpresp'}>
                                Saiba Mais
                            </button>
                        </div>

                        <div className={styles.cardDPH}>
                            <p className={styles.subtitleOrg2}>DPH</p>
                            <img className={styles.imgDPH} src={DPH} alt="logo do DPH" />
                            <button className={styles.btnOrg} onClick={() => window.location.href = 'https://prefeitura.sp.gov.br/web/cultura/w/patrimoniohistorico/conhecaodph'}>
                                Saiba Mais
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default PaginaOrganizacoes