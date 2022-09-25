import { useState, useContext, createContext, useEffect } from 'react';

type Theme = 'dark' | 'light';
type ThemeFunction = (theme: Theme) => any;

const initialBlankFunc: ThemeFunction = (theme: Theme) => {
	console.log(theme);
};

const ThemeContext = createContext<[Theme, ThemeFunction]>(['light', initialBlankFunc]);
export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
	children: React.ReactNode;
};
export default function ThemeProvider({ children }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>('light');
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const local = localStorage.getItem('theme');
			if (local) setTheme(local as Theme);
		}
	});

	const setThemeFunc = (theme: Theme) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', theme);
			setTheme(theme);
		}
	};

	return (
		<ThemeContext.Provider value={[theme, (theme) => setThemeFunc(theme)]}>
			<div className={`w-screen h-screen ${theme === 'dark' ? 'dark' : ''}`}>{children}</div>
		</ThemeContext.Provider>
	);
}
