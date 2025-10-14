// src/pages/Usuario/PaginaVisualizarEventos/PaginaVisualizarEventos.jsx

import React, { useState, useEffect } from 'react'; // Adicionando useState e useEffect
import styles from './PaginaVisualizarEventos.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import Loading from '../../../components/Loading/Loading.jsx';
// import eventos from "../../../json/db-mock-eventos.json";
import { useEventos } from '../../../hooks/Eventos/useEventos.js'; 
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";

function PaginaVisualizarEventos() {
    useTituloDocumento("Eventos | Pindorama"); // mudando o Title da pagina

    const { listarEventos } = useEventos();

    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect para buscar os dados
    useEffect(() => {
        const fetchEventos = async () => {
            setLoading(true);
            setError(null);
            try {
                // Chamando a função de listagem do hook, sem passar autorId (busca todos)
                const data = await listarEventos();
                setEventos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, [listarEventos]);

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Eventos</h2>
                    {/* Lembrar de colocar o component de carregamento e erro */}
                    {loading && <Loading />}
                    {error && <p>Ocorreu um erro ao carregar os eventos: {error}</p>}
                    <ListaCards cards={eventos} limite={null} />
                </main>

                <Footer />

            </div>
        </>
    )
}

export default PaginaVisualizarEventos;