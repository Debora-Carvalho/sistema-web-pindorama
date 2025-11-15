import React, { useState } from "react";
import styles from "./CardPadrao.module.scss"; 
import { useNavigate } from "react-router-dom";

import { LuVolume2, LuPause } from "react-icons/lu";

function CardPadrao({ imagem, tipo, titulo, descricao, link }) {
    const navigate = useNavigate(); 
    const [isPlaying, setIsPlaying] = useState(false);

    const botaoClasse =
        tipo === "artigo" ? styles.btnArtigo : styles.btnEvento;

    const botaoAudioClasse =
        tipo === "artigo" ? styles.btnAudioArtigo : styles.btnAudioEvento;

    const handleClick = () => {
        navigate(link);
    };

    const toggleAudio = () => {
        setIsPlaying(prev => !prev);

        // inserir o controle do áudio
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardImagem}>
                <img src={imagem} alt={`Capa do ${tipo} ${titulo}`} />
            </div>

            <div className={styles.cardConteudo}>
                <h3 className={styles.cardTitulo}>
                    {titulo}
                </h3>

                <p className={styles.cardDescricao}>
                    {descricao.length > 150 ? descricao.slice(0, 150) + "…ver mais" : descricao}
                </p>

                <div className={styles.cardBotoes}>
                    <button onClick={handleClick} className={botaoClasse}>
                        {tipo === "artigo" ? "Ler artigo completo" : "Ver evento completo"}
                    </button>

                    <button 
                        onClick={toggleAudio}
                        title={isPlaying ? "Pausar áudio" : "Ouvir o resumo"}
                    >
                        {isPlaying ? (
                            <LuPause className={botaoAudioClasse} />
                        ) : (
                            <LuVolume2 className={botaoAudioClasse} />
                        )}
                    </button>
                </div>        
            </div>   
        </div>
    );
}

export default CardPadrao;
