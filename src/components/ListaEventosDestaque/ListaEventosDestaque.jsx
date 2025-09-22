import React from 'react';
import CardEventoDestaque from './CardEventoDestaque/CardEventoDestaque.jsx';
import styles from './ListaEventosDestaque.module.scss';

function ListaEventosDestaque({ eventos = [] }) {
    return (
        <section className={styles.container}>
            <div className={styles.grid}>
                {eventos.map(evento => (
                    <CardEventoDestaque
                        key={evento.id}
                        dia={evento.dia}
                        mes={evento.mes}
                        titulo={evento.titulo}
                    />
                ))}
            </div>
        </section>
    );
};

export default ListaEventosDestaque;