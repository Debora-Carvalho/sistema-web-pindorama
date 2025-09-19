import { div } from 'framer-motion/client';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import EditorDeArtigo from '../../../components/EditorDeArtigo/EditorDeArtigo.jsx';
import styles from './CriarArtigo.module.scss'


function PaginaCriarArtigo(){
    useTituloDocumento("Criar Artigo | Pindorama")

    return(
        <main className={styles.base}>
            <h1>Artigos</h1>
            <EditorDeArtigo />
        </main>

        
    )
}

export default PaginaCriarArtigo;