import { useState, useRef, useEffect } from "react";
import { FaEllipsisV, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { PiHighlighterFill } from "react-icons/pi";
import { MdOutlineHideImage } from "react-icons/md";
import styles from './DropdownCard.module.scss';

import PopupConfirmar from "../../../../Popups/PopupConfirmar/PopupConfirmar.jsx";
import PopupSucesso from "../../../../Popups/PopupSucesso/PopupSucesso.jsx";

export default function DropdownCard({ id, actions, status }) {
    const [aberto, setAberto] = useState(false);
    const [popupDestacarAberto, setPopupDestacarAberto] = useState(false);
    const [popupExcluirAberto, setPopupExcluirAberto] = useState(false);
    const [popupSucessoAberto, setPopupSucessoAberto] = useState(false);
    const [popupDestaqueSucessoAberto, setPopupDestaqueSucessoAberto] = useState(false);
    //const [destacado, setDestacado] = useState(false);
    
    const [isDisabled, setIsDisabled] = useState(false);
    const menuRef = useRef(null);

    const estaDestacado = status === "destacado";

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

    const handleConfirmarDestacar = async () => {
        const novoStatus = estaDestacado ? "publicado" : "destacado"; // Lógica de alternância
        
        try {
            await actions.onStatusChange(id, novoStatus); // CHAMA A FUNÇÃO QUE ATUALIZA O DB
            setPopupDestacarAberto(false);
            setPopupDestaqueSucessoAberto(true);
            // NÃO PRECISAMOS MAIS CHAMAR actions.refetch() AQUI, 
            // pois ela já está no PaginaVisualizarArtigosAdmin.jsx dentro de handleStatusChange.
        } catch (error) {
            console.error("Erro ao destacar/encobrir artigo:", error);
            setPopupDestacarAberto(false);
            alert(`Falha ao alterar o status do artigo para ${novoStatus}.`);
        }
    };

    const handleConfirmarExcluir = async () => {
        try {
            setIsDisabled(true);
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
                            {/* Ícone e Texto são baseados no estado REAL (estaDestacado) */}
                            {estaDestacado ? (
                                <MdOutlineHideImage className={styles.iconOptions} />
                            ) : (
                                <PiHighlighterFill className={styles.iconOptions} />
                            )}
                            {estaDestacado ? "Encobrir" : "Destacar"}
                        </button>

                        <PopupConfirmar
                            aberto={popupDestacarAberto}
                            mensagem={
                                estaDestacado // <- Usamos estaDestacado para a mensagem
                                    ? "Tem certeza que deseja encobrir este artigo?"
                                    : "Tem certeza que deseja destacar este artigo?"
                            }
                            onCancelar={() => setPopupDestacarAberto(false)}
                            onConfirmar={handleConfirmarDestacar}
                        />

                        <PopupSucesso
                            aberto={popupDestaqueSucessoAberto}
                            mensagem={
                                // Após a ação, estaDestacado se inverteu (embora o estado ainda não tenha atualizado)
                                // Usamos o novo status para a mensagem de sucesso
                                estaDestacado 
                                    ? "Artigo encoberto com sucesso!"
                                    : "Artigo destacado com sucesso!"
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
                            disabled={isDisabled}
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