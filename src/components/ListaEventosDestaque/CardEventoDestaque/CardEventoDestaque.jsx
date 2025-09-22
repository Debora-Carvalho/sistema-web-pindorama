import React from 'react';

import styles from './CardEventoDestaque.module.scss';

export default function CardEventoDestaque ({ dia, mes, titulo }) {
    return (
        <div className={styles.card}>
            <div className={styles.data}>
                <span className={styles.dia}>{dia}</span>
                <span className={styles.mes}>{mes}</span>
            </div>
            <div className={styles.titulo}>
                {titulo}
            </div>
        </div>
    );
}