import React, { useEffect, useState } from 'react';
import { ThemeContext, DEFAULT_THEME, DARK_THEME, NORDESTINO_THEME, INDIGENA_THEME } from './ThemeContext';

const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem('theme') || DEFAULT_THEME;
	});

	useEffect(() => {
		document.body.classList.remove(DEFAULT_THEME, DARK_THEME, NORDESTINO_THEME, INDIGENA_THEME);
		document.body.classList.add(theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ globalTheme: theme, setGlobalTheme: setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;

