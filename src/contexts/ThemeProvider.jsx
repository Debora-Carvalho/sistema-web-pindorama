import React, { useEffect } from 'react';
import { ThemeContext, DEFAULT_THEME, DARK_THEME, NORDESTINO_THEME, INDIGENA_THEME } from './ThemeContext';
import { useGlobalTheme } from '../hooks/conf/useGlobalTheme';
import Loading from '../components/Loading/Loading';

const ThemeProvider = ({ children }) => {
	const { globalTheme, changeTheme, loading } = useGlobalTheme();

	useEffect(() => {
		if (!globalTheme) return;
		document.body.classList.remove(DEFAULT_THEME, DARK_THEME, NORDESTINO_THEME, INDIGENA_THEME);
		document.body.classList.add(globalTheme);
	}, [globalTheme]);

	if (loading) return <Loading />;

	return (
		<ThemeContext.Provider value={{ globalTheme, setGlobalTheme: changeTheme, loading }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
