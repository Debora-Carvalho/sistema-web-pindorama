import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/login/api/administradores`;

export const useLogin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (password) => {
        setLoading(true);
        setError(null);
        try {
            const loginResposta = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ administrador: { senha: password } }),
            });

            if (!loginResposta.ok) {
                let errorData;
                try {
                    errorData = await loginResposta.json();
                } catch {
                    errorData = { error: 'Senha incorreta, por favor tente novamente' };
                }
                throw new Error(errorData.error || 'Senha incorreta');
            }

            const loginData = await loginResposta.json();
            const token = loginData.token;

            if (token) {
                localStorage.setItem('authToken', token);
            } else {
                throw new Error('Token não recebido na resposta.');
            }

            const sessionResposta = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!sessionResposta.ok) {
                localStorage.removeItem('authToken');
                throw new Error('Erro ao carregar dados da sessão');
            }

            const sessionData = await sessionResposta.json();
            setData(sessionData);

        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, login };
};