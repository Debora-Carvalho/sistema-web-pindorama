import React from 'react';
import styles from './LegendaMapa.module.scss';

const regioes = [
    { nome: 'Norte', cor: '#783d19' },
    { nome: 'Nordeste', cor: '#FFB703' },
    { nome: 'Centro-Oeste', cor: '#405A37' },
    { nome: 'Sudeste', cor: '#F77F00' },
    { nome: 'Sul', cor: '#90BE6D' }
];

export default function LegendaMapa() {
    return (
        <div className={styles.legendaMapa}>
            <h4>Regiões do Brasil</h4>
            <ul>
                {regioes.map((regiao, idx) => (
                    <li key={idx}>
                        <span
                            className={styles.corBloco}
                            style={{ backgroundColor: regiao.cor }}
                        ></span>
                        {regiao.nome}
                    </li>
                ))}
            </ul>
        </div>
    );
};
