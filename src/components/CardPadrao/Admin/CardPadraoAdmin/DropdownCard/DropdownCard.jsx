import { useState, useRef, useEffect } from "react";
import { FaEllipsisV, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { PiHighlighterFill } from "react-icons/pi";
import { MdOutlineHideImage } from "react-icons/md";
import styles from './DropdownCard.module.scss';

import PopupConfirmar from "../../../../Popups/PopupConfirmar/PopupConfirmar.jsx";
import PopupSucesso from "../../../../Popups/PopupSucesso/PopupSucesso.jsx";

export default function DropdownCard({ id, actions }) {
    const [aberto, setAberto] = useState(false);
    const [popupDestacarAberto, setPopupDestacarAberto] = useState(false);
    const [popupExcluirAberto, setPopupExcluirAberto] = useState(false);
    const [popupSucessoAberto, setPopupSucessoAberto] = useState(false);
    const [popupDestaqueSucessoAberto, setPopupDestaqueSucessoAberto] = useState(false);
    const [destacado, setDestacado] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setAberto(false);
            }
        }
        if (aberto) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [aberto]);

    const toggleMenu = () => {
        setAberto((prev) => !prev);
    };

    const handleConfirmarDestacar = () => {
        const novoEstado = !destacado;
        setDestacado(novoEstado);
        setPopupDestacarAberto(false);
        setPopupDestaqueSucessoAberto(true);
    };

    const handleConfirmarExcluir = async () => {
        try {
            await actions.onExcluir(id);
            setPopupExcluirAberto(false);
            setPopupSucessoAberto(true);
        } catch (e) {
            alert("Erro ao excluir artigo: " + e.message);
        }
    };

    return (
        <div ref={menuRef} className={styles.dropdownContainer}>
            <button onClick={toggleMenu} className={styles.iconeMenu}>
                <FaEllipsisV />
            </button>

            {aberto && (
                <div className={styles.opcoesMenu}>
                    <div>
                        <button
                            className={styles.btnEditar}
                            onClick={() => actions.onEditar(id)}
                        >
                            <FaRegEdit className={styles.iconOptions} />
                            Editar
                        </button>
                    </div>

                    <div>
                        <button
                            className={styles.btnDestacar}
                            onClick={() => setPopupDestacarAberto(true)}
                        >
                            {destacado ? (
                                <MdOutlineHideImage className={styles.iconOptions} />
                            ) : (
                                <PiHighlighterFill className={styles.iconOptions} />
                            )}
                            {destacado ? "Encobrir" : "Destacar"}
                        </button>

                        <PopupConfirmar
                            aberto={popupDestacarAberto}
                            mensagem={
                                destacado
                                    ? "Tem certeza que deseja encobrir este artigo?"
                                    : "Tem certeza que deseja destacar este artigo?"
                            }
                            onCancelar={() => setPopupDestacarAberto(false)}
                            onConfirmar={handleConfirmarDestacar}
                        />

                        <PopupSucesso
                            aberto={popupDestaqueSucessoAberto}
                            mensagem={
                                destacado
                                    ? "Artigo destacado com sucesso!"
                                    : "Artigo encoberto com sucesso!"
                            }
                            textoBotao="Fechar"
                            onBotaoClick={() => setPopupDestaqueSucessoAberto(false)}
                        />
                    </div>

                    <div>
                        <button
                            className={styles.btnExcluir}
                            onClick={() => setPopupExcluirAberto(true)}
                        >
                            <FaRegTrashAlt className={styles.iconOptions} />
                            Excluir
                        </button>

                        <PopupConfirmar
                            aberto={popupExcluirAberto}
                            mensagem="Tem certeza que deseja excluir este artigo?"
                            onCancelar={() => setPopupExcluirAberto(false)}
                            onConfirmar={handleConfirmarExcluir}
                        />

                        <PopupSucesso
                            aberto={popupSucessoAberto}
                            mensagem="Artigo excluído com sucesso!"
                            textoBotao="Fechar"
                              onBotaoClick={async () => {
                              setPopupDestaqueSucessoAberto(false);
                              await actions.refetch(); //Manda o useGetArtigosAdmin (que manda o useEffect trabalhar) recarregar os artigos!
                          }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};