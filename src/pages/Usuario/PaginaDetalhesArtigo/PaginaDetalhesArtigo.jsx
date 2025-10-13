import React from 'react'
import styles from './PaginaDetalhesArtigo.module.scss'
import useTituloDocumento from '../../../hooks/useTituloDocumento.js'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import DOMPurify from 'dompurify';
import capaImagem from '../../../assets/images/igreja-artigo.png'
import { FaRegPaperPlane } from 'react-icons/fa';

const mockArtigo = {
    id: 1,
    titulo: "A Importância da Igreja Nossa Senhora do Bonfim",
    autora: "Feito por: Kelly",
    imagemCapa: capaImagem,
    conteudoHTML: `
        <p>A Igreja Nossa Senhora do Bonfim, ou mais precisamente, a Basílica 
            Santuário Senhora do Bonfim, é um dos mais importantes centros de fé do 
            Brasil, localizado em Salvador, Bahia.
        </p>
        <p>Conhecida pela devoção ao <strong>Senhor do Bonfim</strong> e 
            pelo sincretismo religioso, a basílica tem uma arquitetura neoclássica com 
            uma notável fachada rococó e é um marco cultural e 
            histórico para a Bahia e o Brasil.
        </p>
        <h2>História e Tradição</h2>
        <ul>
            <li>Fundada no século XVIII.</li>
            <li>Famosa pela tradicional Lavagem do Bonfim.</li>
            <li>As fitinhas do Bonfim são um símbolo de fé conhecido mundialmente.</li>
        </ul>
        <br />
        <br />
        <p>A Igreja Nossa Senhora do Bonfim, ou mais precisamente, a Basílica 
            Santuário Senhora do Bonfim, é um dos mais importantes centros de fé do 
            Brasil, localizado em Salvador, Bahia.
        </p>
        <p>Conhecida pela devoção ao <strong>Senhor do Bonfim</strong> e 
            pelo sincretismo religioso, a basílica tem uma arquitetura neoclássica com 
            uma notável fachada rococó e é um marco cultural e 
            histórico para a Bahia e o Brasil.
        </p>
        <h2>História e Tradição</h2>
        <ul>
            <li>Fundada no século XVIII.</li>
            <li>Famosa pela tradicional Lavagem do Bonfim.</li>
            <li>As fitinhas do Bonfim são um símbolo de fé conhecido mundialmente.</li>
        </ul>
    `,
    tags: ["Salvador", "Religião", "Tradições", "Bahia"]
};

function PaginaDetalhesArtigo({ artigo = mockArtigo }) {
    useTituloDocumento(`${artigo.titulo} | Pindorama`)

    const conteudoSeguro = DOMPurify.sanitize(artigo.conteudoHTML);

    return (
        <>
            <div className={styles.container}>
                <Header />
                <main className={styles.conteudo}>
                    <div className={styles.headerArtigo}>
                        <h1 className={styles.tituloArtigo}>{artigo.titulo}</h1>
                        <p className={styles.autora}>{artigo.autora}</p>
                    </div>

                    <div className={styles.conteudoPrincipal}>
                        <div
                            className={styles.corpoTexto}
                            dangerouslySetInnerHTML={{ __html: conteudoSeguro }}
                        />

                        <button className={styles.botaoShare}>
                            <FaRegPaperPlane />
                        </button>

                        <div className={styles.imagemCapa}>
                            <img src={artigo.imagemCapa} alt={`Imagem de capa para o artigo: ${artigo.titulo}`} />
                        </div>

                        <div className={styles.tags}>
                            {artigo.tags.map((tag, index) => (
                                <span key={`${tag}-${index}`} className={styles.tag}>
                                    #{tag}
                                </span>
                            ))}
                        </div>

                    </div>

                </main>
                <Footer />
            </div>
        </>
    )
}

export default PaginaDetalhesArtigo;