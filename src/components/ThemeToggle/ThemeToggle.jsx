import { useContext } from 'react';
import styles from './ThemeToggle.module.scss';
import { ThemeContext, DEFAULT_THEME, DARK_THEME, NORDESTINO_THEME } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
	const { globalTheme, setGlobalTheme } = useContext(ThemeContext);

	return (
		<div className={styles.containerButton}>
			<button
				className={styles.button}
				onClick={() => setGlobalTheme(DEFAULT_THEME)}
				disabled={globalTheme === DEFAULT_THEME}>
				Default
			</button>

			<button
				className={styles.button}
				onClick={() => setGlobalTheme(DARK_THEME)}
				disabled={globalTheme === DARK_THEME}>
				Dark
			</button>

			<button
				className={styles.button}
				onClick={() => setGlobalTheme(NORDESTINO_THEME)}
				disabled={globalTheme === NORDESTINO_THEME}>
				Nordestino
			</button>
		</div>
	);
}