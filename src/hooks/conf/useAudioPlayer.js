import { useState, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/conf/api/tts`;

export const useAudioPlayer = () => {
    const [audioUrl, setAudioUrl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const synthesizeAndLoad = useCallback(async (text) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const audioBlob = await response.blob();
            const url = URL.createObjectURL(audioBlob);

            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }

            setAudioUrl(url);

            return true;
        } catch (err) {
            console.error("Erro TTS:", err);
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }, [audioUrl]);

    return {
        audioUrl,
        isPlaying,
        setIsPlaying,
        synthesizeAndLoad,
        loading,
        error
    };
};
