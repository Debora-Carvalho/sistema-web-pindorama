import React, { useState, useEffect } from 'react';
import styles from './PaginaVisualizarEventos.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import Loading from '../../../components/Loading/Loading.jsx';
import { useGetEventos } from '../../../hooks/usuario/useGetEventos.js'
import ListaCards from "../../../components/ListaCards/Usuario/ListaCards.jsx";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function PaginaVisualizarEventos() {
    useTituloDocumento("Eventos | Pindorama"); // mudando o Title da pagina
    const { eventos, loading, error } = useGetEventos();

    const eventosAdaptados = eventos
        .filter(e => e.status === "publicado")
        .map(e => ({
            id: e.id,
            tipo: "evento",
            titulo: decodeHtml(e.titulo),
            url_imagem: e.url_imagem,
            conteudo: decodeHtml(e.conteudo),
            link: `/detalhes-evento/${e.id}`
        }));

    return (
        <>
            <div className={styles.container}>
                <Header />

                <main className={styles.containerItems}>
                    <h2>Eventos</h2>
                {/* Lembrar de colocar o component de carregamento e erro */}
                {loading && <Loading/>}
                {error && <p>Ocorreu um erro ao carregar os eventos: {error}</p>}
                    <ListaCards cards={eventosAdaptados} limite={null} />
                </main>

                <Footer />
            </div>
        </>
    )
}

export default PaginaVisualizarEventos;