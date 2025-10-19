import styles from './GroupBtnAcessibilidade.module.scss';
import { Link } from 'react-router-dom';

import { LuFileVolume } from "react-icons/lu";
import { IoAccessibilityOutline } from "react-icons/io5";
import BtnToggleLightDark from '../../BtnToggleLightDark/BtnToggleLightDark';

function GroupBtnAcessibilidade({ overrideClass, textToRead, ttsProps }) {
    const { synthesizeSpeech, isPlaying, loading: ttsLoading, pauseAudio } = ttsProps || {};

    const handleSpeak = () => {
        if (!synthesizeSpeech) return;

        if (isPlaying) {
            pauseAudio();
        } else if (textToRead && !ttsLoading) {
            synthesizeSpeech(textToRead);
        }
    };

    return (
        <>
            <div className={`${styles.containerAcessibilidade} ${overrideClass || ''}`}>
                <div className={styles.containerBtnAcessibilidade}>
                    <button
                        onClick={handleSpeak}
                        disabled={ttsLoading || (!textToRead && !isPlaying)}
                        title={isPlaying ? "Parar Leitura" : "Ouvir Conteúdo da Página"}>
                        <LuFileVolume className={styles.btnAcessibilidadeIcon} />
                    </button>
                </div>

                <div className={styles.containerBtnAcessibilidade}>
                    <BtnToggleLightDark />
                </div>

                <div className={styles.containerBtnAcessibilidade}>
                    <Link to='/adm/inicio'>
                        <IoAccessibilityOutline className={styles.btnAcessibilidadeIcon} />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default GroupBtnAcessibilidade;