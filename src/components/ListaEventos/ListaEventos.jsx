import React from 'react';
import CardEvento from '../CardEvento/CardEvento';
import styles from './ListaEventos.module.scss';

export default function ListaEventos({ eventos = [] }) {
  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {eventos.map(evento => (
          <CardEvento 
            key={evento.id}
            dia={evento.dia}
            mes={evento.mes}
            titulo={evento.titulo}
          />
        ))}
      </div>
    </section>
  );
}