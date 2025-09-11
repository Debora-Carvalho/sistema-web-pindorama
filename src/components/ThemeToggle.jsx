import React, { useContext } from 'react';
import { ThemeContext, DEFAULT_THEME, DARK_THEME, NORDESTINO_THEME } from '../contexts/ThemeContext';

export default function ThemeToggle() {
	const { globalTheme, setGlobalTheme } = useContext(ThemeContext);

	return (
		<div style={{ display: 'flex', gap: '0.5rem' }}>
			<button onClick={() => setGlobalTheme(DEFAULT_THEME)} disabled={globalTheme === DEFAULT_THEME}>Default</button>
			<button onClick={() => setGlobalTheme(DARK_THEME)} disabled={globalTheme === DARK_THEME}>Dark</button>
			<button onClick={() => setGlobalTheme(NORDESTINO_THEME)} disabled={globalTheme === NORDESTINO_THEME}>Nordestino</button>
		</div>
	);
}
