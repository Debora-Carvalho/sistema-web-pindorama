import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './MiniPlayer.module.scss';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

function MiniPlayer({ src, autoPlay = false }) {

    const iconesCustomizados = {
        play: <FaPlay />,
        pause: <FaPause />,
        forward: <TbRewindForward10 />,
        rewind: <TbRewindBackward10 />,
        volume: <FaVolumeUp />, 
        volumeMute: <FaVolumeMute />
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