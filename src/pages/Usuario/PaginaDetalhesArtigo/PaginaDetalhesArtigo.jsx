import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './PaginaDetalhesArtigo.module.scss'
import useTituloDocumento from '../../../hooks/useTituloDocumento.js'
import windowSize from '../../../components/HeaderAdmin/useWindowSize.js'
import Header from '../../../components/Header/Header.jsx'
import Footer from '../../../components/Footer/Footer.jsx'
import PopupCompartilhar from '../../../components/Popups/PopupCompartilhar/PopupCompartilhar.jsx'
import { AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify'
import capaImagem from '../../../assets/images/igreja-artigo.png'
import { FaRegPaperPlane, FaExpandAlt, FaCompressAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import useMediaQuery from '../../../hooks/useMediaQuery.js'
import CardPadrao from '../../../components/CardPadrao/Usuario/CardPadrao/CardPadrao.jsx'
import capaRelacionado1 from '../../../assets/images/igreja-artigo.png'
import capaRelacionado2 from '../../../assets/images/igreja-artigo.png'
import capaRelacionado3 from '../../../assets/images/igreja-artigo.png'


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

const mockRelacionados = [
    {
        id: 2,
        imagem: capaRelacionado1,
        tipo: 'artigo',
        titulo: 'As Cores e Significados por Trás das Fitinhas do Bonfim',
        descricao: 'Cada cor tem um desejo, uma prece. Descubra o que cada fitinha do Bonfim representa e como essa tradição se espalhou pelo mundo.',
        link: '/artigo/2'
    },
    {
        id: 3,
        imagem: capaRelacionado2,
        tipo: 'artigo',
        titulo: 'Um Roteiro Histórico pelo Pelourinho em Salvador',
        descricao: 'Caminhe pelas ruas de paralelepípedos e explore a rica história, arquitetura e cultura do coração de Salvador. Um guia completo para o seu passeio.',
        link: '/artigo/3'
    },
    {
        id: 4,
        imagem: capaRelacionado3,
        tipo: 'artigo',
        titulo: 'A Culinária Baiana: Sabores que Contam Histórias',
        descricao: 'Do acarajé ao vatapá, a culinária da Bahia é uma experiência única. Conheça os pratos principais e onde encontrar os melhores sabores.',
        link: '/artigo/4'
    },
    {
        id: 5,
        imagem: capaRelacionado1,
        tipo: 'artigo',
        titulo: 'Festas Juninas: A Tradição que Aquece o Coração do Brasil',
        descricao: 'Das quadrilhas coloridas às comidas típicas, explore a magia das festas de São João pelo país.',
        link: '/artigo/5'
    }
];

function PaginaDetalhesArtigo({ artigo = mockArtigo }) {
    useTituloDocumento(`${artigo.titulo} | Pindorama`)

    const { width } = windowSize();
    const limiteDeArtigos = width <= 1080 ? 4 : 3;

    const conteudoSeguro = DOMPurify.sanitize(artigo.conteudoHTML);

    const [popupCompartilharAberto, setPopupCompartilharAberto] = useState(false);
    const artigoUrl = window.location.href;

    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useMediaQuery('(max-width: 1080px)');
    const [isTextoExpanded, setIsTextoExpanded] = useState(false);

    const buttonVariants = {
        initial: { width: '3.5rem', padding: '8px 40px', gap: '0rem' },
        hover: { width: '12rem', padding: '8px 20px', gap: '0.8rem' },
    };

    const textVariants = {
        initial: { opacity: 0, width: 0, x: -10 },
        hover: { opacity: 1, width: 'auto', x: 0 },
    };

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
                        <div className={styles.colunaEsquerda}>
                            <div className={styles.textoContainer}>
                                <div
                                    className={`${styles.corpoTexto} ${isTextoExpanded ? styles.expanded : ''}`}
                                    dangerouslySetInnerHTML={{ __html: conteudoSeguro }}
                                />

                                <button
                                    className={styles.expandButton}
                                    onClick={() => setIsTextoExpanded(!isTextoExpanded)}
                                    aria-label={isTextoExpanded ? "Recolher texto" : "Expandir texto"}
                                >
                                    {isTextoExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
                                </button>
                            </div>

                            <motion.button
                                className={styles.botaoShare}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                variants={buttonVariants}
                                initial="initial"
                                animate={isMobile || isHovered ? "hover" : "initial"}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                onClick={() => setPopupCompartilharAberto(true)}
                            >
                                <FaRegPaperPlane className={styles.faRegPaperPlane} />
                                <motion.span
                                    className={styles.shareText}
                                    variants={textVariants}
                                    initial="initial"
                                    animate={isMobile || isHovered ? "hover" : "initial"}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    onClick={() => setPopupCompartilharAberto(true)}
                                >
                                    Compartilhar
                                </motion.span>
                            </motion.button>
                        </div>

                        <div className={styles.colunaDireita}>
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

                    </div>

                    <section className={styles.artigosRelacionadosContainer}>
                        <div className={styles.relacionadosHeader}>
                            <h2 className={styles.tituloRelacionados}>Artigos relacionados</h2>
                            <Link to="/artigos" className={styles.verMaisBotao}>
                                Ver mais artigos
                            </Link>
                        </div>
                        <div className={styles.cardsContainer}>
                            {mockRelacionados.slice(0, limiteDeArtigos).map((artigoRelacionado) => (
                                <CardPadrao
                                    key={artigoRelacionado.id}
                                    imagem={artigoRelacionado.imagem}
                                    tipo={artigoRelacionado.tipo}
                                    titulo={artigoRelacionado.titulo}
                                    descricao={artigoRelacionado.descricao}
                                    link={artigoRelacionado.link}
                                />
                            ))}
                        </div>
                    </section>

                </main>
                <Footer />
            </div>

            <AnimatePresence>
                {popupCompartilharAberto && (
                    <PopupCompartilhar 
                        aoFechar={() => setPopupCompartilharAberto(false)}
                        link={artigoUrl}
                        imagem={artigo.imagemCapa}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default PaginaDetalhesArtigo;