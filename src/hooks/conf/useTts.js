import { useState, useCallback, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/conf/api/tts`;

export const useTts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audio, setAudio] = useState(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(-1);

    const synthesizeSpeech = useCallback(async (text) => {
        if (audio) {
            audio.pause();
            setAudio(null);
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `Erro HTTP: ${response.status} ${response.statusText}`;
                try {
                    const errorData = JSON.parse(errorText);
                    if (errorData.error) {
                        errorMessage = errorData.error;
                    }
                } catch (e) { }
                throw new Error(errorMessage);
            }

            const audioBlob = await response.blob();
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);

            const newAudio = new Audio(url);

            newAudio.onended = () => {
                setAudio(null);
                setAudioUrl(null);
                setCurrentWordIndex(-1);
            };

            setAudio(newAudio);
            newAudio.play();

        } catch (err) {
            console.error("Erro na síntese de voz:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [audio, audioUrl]);

    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause();
                setAudio(null);
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
                setAudioUrl(null);
            }
        };
    }, [audio, audioUrl]);

    const pauseAudio = () => {
        if (audio) {
            audio.pause();
            setAudio(null);
            setCurrentWordIndex(-1);
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
                setAudioUrl(null);
            }
        }
    };

    return {
        synthesizeSpeech,
        pauseAudio,
        loading,
        error,
        audioUrl,
        isPlaying: !!audio && !audio.paused
    };
}
