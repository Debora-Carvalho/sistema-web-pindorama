import React, { useState, useEffect } from 'react';
import styles from './PaginaVisualizarEventos.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import Loading from '../../../components/Loading/Loading.jsx';
import { useEventos } from '../../../hooks/Eventos/useEventos.js';
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";

function PaginaVisualizarEventos() {
    useTituloDocumento("Eventos | Pindorama");

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
                const data = await listarEventos();
                setEventos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    // Garante que cada evento tenha o link correto para detalhes
    const eventosComLinksCorretos = eventos.map(evento => ({
        ...evento,
        link: `/detalhes-evento/${evento.id}` // FORÇA o link correto
    }));

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Eventos</h2>
                    {loading && <Loading />}
                    {error && <p>Ocorreu um erro ao carregar os eventos: {error}</p>}
                    {/*usa os eventos com links corrigidos */}
                    <ListaCards cards={eventosComLinksCorretos} limite={null} />
                </main>

                <Footer />
            </div>
        </>
    )
}

export default PaginaVisualizarEventos;