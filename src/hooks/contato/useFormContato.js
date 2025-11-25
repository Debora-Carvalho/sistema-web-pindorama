import { useState, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/api/contato`;

export const useFormContato = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setError(null);
        setSuccess(false);
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contato: formData }),
            });

            if (response.ok) {
                setSuccess(true);
                setFormData({ nome: '', email: '', mensagem: '' });
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Erro desconhecido ao enviar a mensagem.');
            }
        } catch (err) {
            console.error('Erro de conexão:', err);
            setError('Erro de conexão. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    }, [formData, loading]);

    return {
        formData,
        handleChange,
        handleSubmit,
        loading,
        error,
        success,
        setSuccess
    };
};