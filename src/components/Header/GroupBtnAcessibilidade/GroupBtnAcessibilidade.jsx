import styles from './GroupBtnAcessibilidade.module.scss';
import { Link } from 'react-router-dom';

import BtnToggleLightDark from "../../BtnToggleLightDark/BtnToggleLightDark.jsx";

import { LuFileVolume } from "react-icons/lu";
import { IoAccessibilityOutline } from "react-icons/io5";

function GroupBtnAcessibilidade({ overrideClass }) {

    return (
        <>
              <div className={`${styles.containerAcessibilidade} ${overrideClass || ''}`}>
                {/* o botão de leitura de tela está ocultado abaixo */}
                {/* <div className={styles.containerBtnAcessibilidade}>
                    <button>
                        <LuFileVolume className={styles.btnAcessibilidadeIcon}/>
                    </button>
                </div> */}

                <div className={styles.containerBtnAcessibilidade}>
                    <BtnToggleLightDark />
                </div>

                {/* o botão de configurações de acessibilidade está ocultado abaixo */}
                {/* <div className={styles.containerBtnAcessibilidade}>
                    <Link to='/adm/inicio'>
                        <IoAccessibilityOutline className={styles.btnAcessibilidadeIcon}/>
                    </Link>
                </div> */}
            </div>
        </>
    )
}

export default GroupBtnAcessibilidade;