import { useContext, useMemo } from "react";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";

export function useThemeAsset(assetsByTheme) {
    const { globalTheme } = useContext(ThemeContext);

    const asset = useMemo(() => {
        // se o tema não tiver imagem específica, usa a default
        return assetsByTheme[globalTheme] || assetsByTheme.default;
    }, [globalTheme, assetsByTheme]);

    return asset;
};
