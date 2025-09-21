import React, { useState, useRef, useEffect } from "react";
import styles from "./PopupAdicionarTag.module.scss";

import { AiOutlineClose } from "react-icons/ai";

const listaTags = [
    "nordeste",
    "folclore",
    "música",
    "indígena",
    "forró",
    "samba",
    "capoeira",
    "conto",
    "literatura-de-cordel",
    "culinária",
    "festa-junina",
    "carnaval",
    "dia-da-consciência-negra",
    "dia-dos-povos-originários",
    "frevo",
    "dia-do-patrimônio-histórico",
    "dia-nacional-do-forró",
    "cultura",
    "dança",
    "festa-típica",
    "tradição",
    "dia-do-nordestino",
].sort();

function PopupAdicionarTag({ aberto, onCancelar, onConfirmar }) {
    const [busca, setBusca] = useState("");
    const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
    const [erro, setErro] = useState("");
    const [dropdownAberto, setDropdownAberto] = useState(false);

    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setDropdownAberto(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!aberto) return null;

    // componente Tag com botão de remover
    const TagSelecionada = ({ tag }) => (
        <div className={styles.tagSelecionada}>
            <span>#{tag}</span>
            <button onClick={() => removerTag(tag)}>
                <AiOutlineClose />
            </button>
        </div>
    );

    // componente dropdown de sugestões a partir da busca
    const DropdownTag = () => {
        const tagsFiltradas = listaTags.filter(
            (tag) =>
                tag.toLowerCase().includes(busca.toLowerCase()) &&
                !tagsSelecionadas.includes(tag)
        );

        if (tagsFiltradas.length === 0) return null;

        return (
            <ul className={styles.dropdownTags}>
                {tagsFiltradas.map((tag) => (
                    <li key={tag} onClick={() => adicionarTag(tag)}>
                        {tag}
                    </li>
                ))}
            </ul>
        );
    };

    // adicionar tag
    const adicionarTag = (tag) => {
        if (tagsSelecionadas.length >= 4) {
            setErro("Você só pode adicionar até 4 tags. Remova uma tag utilizando o X.");
            setTimeout(() => setErro(""), 4000);
            return;
        }
        setTagsSelecionadas([...tagsSelecionadas, tag]);
        setBusca("");
        setDropdownAberto(false);
    };

    // remover tag
    const removerTag = (tag) => {
        setTagsSelecionadas(tagsSelecionadas.filter((t) => t !== tag));
    };

    // confirmar seleção
    const handleConfirmar = () => {
        if (tagsSelecionadas.length === 0) {
            setErro("Adicione pelo menos 1 tag para confirmar.");
            setTimeout(() => setErro(""), 3000);
            return;
        } 

        onConfirmar(tagsSelecionadas);
        setTagsSelecionadas([]);
        setBusca("");
    };

    return (
        <div className={styles.popupOverlayTag}>
            <div className={styles.popupBoxTag}>
                <p>Nome da tag</p>

                {erro && <div className={styles.mensagemErro}>{erro}</div>}

                <div className={styles.inputContainer} ref={containerRef}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="Digite para buscar tags..."
                        onFocus={() => setDropdownAberto(true)}
                    />
                    {dropdownAberto && <DropdownTag />}
                </div>

                <div className={styles.tagsSelecionadas}>
                    {tagsSelecionadas.map((tag) => (
                        <TagSelecionada key={tag} tag={tag} />
                    ))}
                </div>

                <div className={styles.popupActions}>
                    <button className={styles.btnCancelar} onClick={onCancelar}>
                        Cancelar
                    </button>

                    <button
                        className={styles.btnConfirmar}
                        onClick={handleConfirmar}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupAdicionarTag;
