import { createContext } from 'react';

export const DEFAULT_THEME = 'default';
export const DARK_THEME = 'dark';
export const NORDESTINO_THEME = 'nordestino';

export const ThemeContext = createContext({
	globalTheme: DEFAULT_THEME,
	setGlobalTheme: () => { }
});
