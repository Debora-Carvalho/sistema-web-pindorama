import styles from './BannerPrincipal.module.scss';

import ImgBannerDefault from "../../assets/images/default/capivara-default.png";
import ImgBannerDark from "../../assets/images/img-banner-default.png";
import ImgBannerNordestino from "../../assets/images/nordestino/capivara-nordestino.png";
import ImgBannerIndigena from "../../assets/images/indigena/capivara-indigena.png";

import { useThemeAsset } from "../../hooks/conf/useThemeAsset.js";

function BannerPrincipal() {
    const imageBanner = useThemeAsset({
        default: ImgBannerDefault,
        dark: ImgBannerDefault,
        nordestino: ImgBannerNordestino,
        indigena: ImgBannerIndigena
    });

    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                <p className={styles.title}>
                    Pindorama
                </p>
            </div>

            <div className={styles.containerImage}>
                <img src={imageBanner} className={styles.imgBanner} alt='Banner destaque da tela inicial'/>
            </div>
        </div>
    )
}

export default BannerPrincipal;