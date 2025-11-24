import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL + '/global_settings';

export const useGlobalTheme = () => {
    const [globalTheme, setGlobalTheme] = useState(null);
    const [themeId, setThemeId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchTheme = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Erro ao buscar global settings');
            const data = await res.json();

            const themeSetting = data.find(item => item.chave === 'theme');
            setGlobalTheme(themeSetting?.valor || 'default');
            setThemeId(themeSetting?.id || null);
        } catch (err) {
            console.error(err);
            setGlobalTheme('default');
            setThemeId(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTheme();
    }, [fetchTheme]);

    const changeTheme = useCallback(async (novoTema) => {
        setGlobalTheme(novoTema);

        if (!themeId) return;

        try {
            await fetch(`${API_URL}/${themeId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ global_setting: { chave: 'theme', valor: novoTema } }),
            });
        } catch (err) {
            console.error('Erro ao atualizar tema:', err);
        }
    }, [themeId]);

    return { globalTheme, changeTheme, loading };
};
