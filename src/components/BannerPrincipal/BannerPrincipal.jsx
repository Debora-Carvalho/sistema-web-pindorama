import styles from './BannerPrincipal.module.scss';

import ImageBanner from '../../assets/images/img-banner-default.png';

function BannerPrincipal() {

    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <p className={styles.title}>
                    Pindorama
                </p>
            </div>

            <div className={styles.containerImage}>
                <img src={ImageBanner} className={styles.imgBanner} alt='Banner destaque da tela inicial'/>
            </div>
        </div>
    )
}

export default BannerPrincipal;