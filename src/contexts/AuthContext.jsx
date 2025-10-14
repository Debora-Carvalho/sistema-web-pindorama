import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL_SESSAO = `${API_BASE_URL}/login/api/administradores`;

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({ token: null, id: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateSession = async () => {
            const token = localStorage.getItem('authToken');
            const id = localStorage.getItem('administradorId');
            const nome = localStorage.getItem('administradorNome');

            if (!token || !id || !nome) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(API_URL_SESSAO, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setAuthData({ token, id: parseInt(id) });
                } else {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('administradorId');
                    localStorage.removeItem('administradorNome');
                }
            } catch (error) {
                console.error("Erro ao validar sessão:", error);
            } finally {
                setLoading(false);
            }
        };

        validateSession();
    }, []);

    const login = (token, id, nome) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('administradorId', id);
        localStorage.setItem('administradorNome', nome)
        setAuthData({ token, id, nome });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('administradorId');
        localStorage.removeItem('administradorNome');
        setAuthData({ token: null, id: null, nome: null });
    };

    return (
        <AuthContext.Provider value={{ ...authData, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);