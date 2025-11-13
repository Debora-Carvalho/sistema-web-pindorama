import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styles from './PaginaAjuda.module.scss';
import useTituloDocumento from '../../../hooks/useTituloDocumento.js';
import Header from '../../../components/Header/Header.jsx';
import Footer from '../../../components/Footer/Footer.jsx';
import Loading from '../../../components/Loading/Loading.jsx';
import faqData from '../../../json/duvidas-frequentes.json'; 

function DropdownPergunta({ question, answer }) {
    const [aberto, setAberto] = useState(false);

    return (
        <div className={styles.dropdown}>
            <button
                aria-expanded={aberto}
                className={`${styles.dropdownPergunta} ${aberto ? styles.aberto : ''}`}
                onClick={() => setAberto(prev => !prev)}
            >
                <span className={styles.perguntaTexto}>{question}</span>
                {aberto ? (
                    <MdKeyboardArrowUp className={styles.icone} aria-hidden="true" />
                ) : (
                    <MdKeyboardArrowDown className={styles.icone} aria-hidden="true" />
                )}
            </button>

            {aberto && (
                <div className={styles.dropdownResposta} role="region" aria-live="polite">
                    <p className={styles.respostaTexto}>{answer}</p>
                </div>
            )}
        </div>
    );
}

function capitaliza(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function PaginaAjuda() {
    useTituloDocumento("FAQ - Ajuda | Pindorama");

    const [faq, setFaq] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setFaq(faqData);
            setLoading(false);
        }, 500);
        return () => clearTimeout(t);
    }, []);

    if (loading) {
        return (
            <div className={styles.container}>
                <Header />
                <main className={styles.containerItems}>
                    <h2>FAQ - Ajuda</h2>
                    <Loading />
                </main>
                <Footer />
            </div>
        );
    }

    const secoes = faq.reduce((acc, item) => {
        const key = item.topic || "outros";
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    return (
        <div className={styles.container}>
            <Header />

            <main className={styles.containerItems}>
                <h2>FAQ - Ajuda</h2>

                {Object.entries(secoes).map(([topic, perguntas]) => (
                    <section key={topic} className={styles.secao}>
                        <h3>{capitaliza(topic)}</h3>

                        <div className={styles.listaPerguntas}>
                            {perguntas.map((p) => (
                                <DropdownPergunta
                                    key={p.id}
                                    question={p.question}
                                    answer={p.answer}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </main>

            <Footer />
        </div>
    );
}

export default PaginaAjuda;
