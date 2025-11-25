import { useContext } from 'react';
import styles from './BtnToggleLightDarkMobile.module.scss';
import { ThemeContext, DEFAULT_THEME, DARK_THEME } from '../../../contexts/ThemeContext';

import { LuSun, LuMoon } from "react-icons/lu";

export default function BtnToggleLightDarkMobile() {
    const { globalTheme, setGlobalTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setGlobalTheme(globalTheme === DEFAULT_THEME ? DARK_THEME : DEFAULT_THEME);
    };

    return (
        <button 
            className={styles.btnToggleSingle}
            onClick={toggleTheme}
        >
            {globalTheme === DEFAULT_THEME ? <LuMoon className={styles.iconBtnToggleSingle} /> : <LuSun className={styles.iconBtnToggleSingle} />}
        </button>
    );
}
