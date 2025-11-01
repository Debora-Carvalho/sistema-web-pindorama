import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Logotipo.module.scss";
import userLogo from '../../assets/images/pindorama_logo-final-inicio.png';
import adminLogo from '../../assets/images/pindorama_logo-final-admin.png';

export default function Logotipo({ tipo = 'user' }) {
    const navigate = useNavigate();
    const logoSrc = tipo === 'admin' ? adminLogo : userLogo;

    const handleClick = () => {
        if (tipo === 'admin') {
            navigate('/adm/inicio'); 
        } else {
            navigate('/inicio'); 
        }
    };

    return (
        <div
            className={styles.containerLogo}
            onClick={handleClick}
        >
            <img
                src={logoSrc}
                className={styles.logo}
                alt={`Logotipo do site Pindorama para ${tipo}`}
            />
        </div>
    );
};
