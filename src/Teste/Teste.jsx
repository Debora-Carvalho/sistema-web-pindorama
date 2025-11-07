import { useState } from 'react'
import audioTeste from '../assets/audio/Final.mp3'
import MiniPlayer from '../components/MiniPlayer/MiniPlayer.jsx'
import { FaPlay } from 'react-icons/fa'
import styles from './Teste.module.scss'

function Teste() {

    const [playerAtivado, setPlayerAtivado] = useState(false);

    return (
        <>


            <div className={styles.playerContainerWrapper}>
                {playerAtivado ? (
                    // SE ATIVADO: Mostra o player completo e toca
                    <MiniPlayer
                        src={audioTeste}
                        autoPlay={true}
                    />
                ) : (
                    // SE NÃO ATIVADO: Mostra o botão compacto
                    <button
                        className={styles.playerCompacto}
                        onClick={() => setPlayerAtivado(true)}
                    >
                        <span>Ouça este artigo</span>
                        <FaPlay className={styles.playIconCompacto} />
                    </button>
                )}
            </div>


        </>
    )
}

export default Teste