import { useState, useCallback, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/conf/api/tts`;

export const useTts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audio, setAudio] = useState(null);

    const synthesizeSpeech = useCallback(async (text) => {
        if (audio && audio.paused && audioUrl) {
            audio.play();
            return;
        }

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
            setAudioUrl(null);
        }

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
            setAudioUrl(url);

            const newAudio = new Audio(url);

            newAudio.onended = () => {
                setAudio(null);
                setAudioUrl(null);
            };

            setAudio(newAudio);
            newAudio.play();

        } catch (err) {
            console.error("Erro TTS:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [audio, audioUrl]);

    const pauseAudio = () => {
        if (audio) {
            audio.pause();
        }
    };

    return {
        synthesizeSpeech,
        pauseAudio,
        loading,
        error,
        isPlaying: !!audio && !audio.paused
    };
}
