import { useState, useCallback } from "react";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export const useFormContato = () => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        mensagem: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
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
            const formBody = new URLSearchParams({
                access_key: import.meta.env.VITE_WEB3FORMS_KEY,
                name: formData.nome,
                email: formData.email,
                message: formData.mensagem
            });

            const response = await fetch(WEB3FORMS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formBody.toString()
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setFormData({ nome: "", email: "", mensagem: "" });
            } else {
                setError(data.message || "Erro ao enviar a mensagem.");
            }
        } catch (err) {
            console.error("Erro de conexão:", err);
            setError("Erro de conexão. Tente novamente mais tarde.");
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