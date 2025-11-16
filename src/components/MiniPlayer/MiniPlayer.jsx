import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./MiniPlayer.module.scss";

import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

function MiniPlayer({ audioUrl, isPlaying, setIsPlaying, audioRef }) {
    const icones = {
        play: <FaPlay />,
        pause: <FaPause />,
        forward: <TbRewindForward10 />,
        rewind: <TbRewindBackward10 />,
        volume: <FaVolumeUp />,
        volumeMute: <FaVolumeMute />
    };

    return (
        <AudioPlayer
            ref={audioRef}
            src={audioUrl}
            autoPlay={false}
            customIcons={icones}
            showJumpControls={true}
            progressJumpSteps={{ backward: 10000, forward: 10000 }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
        />
    );
}


export default MiniPlayer;
