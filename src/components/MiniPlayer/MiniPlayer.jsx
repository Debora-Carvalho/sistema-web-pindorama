import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from './MiniPlayer.module.scss';

// 1. IMPORTE OS ÍCONES QUE VOCÊ QUER USAR
import { FaPlay, FaPause, FaRedo, FaUndo, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { FaR } from 'react-icons/fa6';
import { LuRewind } from 'react-icons/lu';

function MiniPlayer({ src, autoPlay = false }) {

    // 2. CRIE OBJETOS PARA OS ÍCONES CUSTOMIZADOS
    const iconesCustomizados = {
        play: <FaPlay />,
        pause: <FaPause />,
        // Estes são os botões de pular tempo (que você achou que eram de pular faixa)
        forward: <TbRewindForward10 />,     // Substitui o '>>'
        rewind: <TbRewindBackward10 />,  // Substitui o '<<'
        volume: <FaVolumeUp />,     // Ícone de volume
        volumeMute: <FaVolumeMute /> // Ícone de mudo
    };

    return (
        <AudioPlayer
            src={src}
            autoPlay={autoPlay}
            progressJumpSteps={{ backward: 10000, forward: 10000 }}
            customIcons={iconesCustomizados}
        />
    );
}

export default MiniPlayer;