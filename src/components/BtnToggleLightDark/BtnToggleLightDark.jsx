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
                className={styles.btnThemeToggle}
                onClick={() => setGlobalTheme(DEFAULT_THEME)}
                disabled={globalTheme === DEFAULT_THEME}>
                <LuSun />
            </button>

            <button
                className={styles.btnThemeToggle}
                onClick={() => setGlobalTheme(DARK_THEME)}
                disabled={globalTheme === DARK_THEME}>
                <LuMoon />
            </button>
        </div>
    );
};

export default BtnToggleLightDark;