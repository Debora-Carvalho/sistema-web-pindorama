import { div } from 'framer-motion/client';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import EditorDeArtigo from '../../../components/EditorDeArtigo/EditorDeArtigo.jsx';
import styles from './CriarArtigo.module.sass'


function PaginaCriarArtigo(){
    useTituloDocumento("Criar Artigo | Pindorama")

    return(
        <div className={styles.base}>
            <h1>Teste da página</h1>
            <EditorDeArtigo />
        </div>

        
    )
}

export default PaginaCriarArtigo;