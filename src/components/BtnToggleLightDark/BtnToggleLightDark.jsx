import { useContext } from 'react'; 
import styles from './BtnToggleLightDark.module.scss';
import { ThemeContext, DEFAULT_THEME, DARK_THEME } from '../../contexts/ThemeContext.jsx';

import { LuSun } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";

function BtnToggleLightDark() {
    const { globalTheme, setGlobalTheme } = useContext(ThemeContext);

    return (
        <div className={styles.containerBtnThemeToggle}>
            <button
                className={`${styles.btnThemeToggle} ${globalTheme === DEFAULT_THEME ? styles.active : ""}`}
                onClick={() => setGlobalTheme(DEFAULT_THEME)}>
                <LuSun />
            </button>

            <button
                className={`${styles.btnThemeToggle} ${globalTheme === DARK_THEME ? styles.active : ""}`}
                onClick={() => setGlobalTheme(DARK_THEME)}>
                <LuMoon />
            </button>
        </div>
    );
};

export default BtnToggleLightDark;
