import { useState } from "react";
import { FaEllipsisV, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { PiHighlighterFill } from "react-icons/pi";
import { MdOutlineHideImage } from "react-icons/md";
import styles from './CardPadraoArtigos.module.scss';

import PopupConfirmar from "../../../components/Popups/PopupConfirmar/PopupConfirmar.jsx";
import PopupSucesso from "../../../components/Popups/PopupSucesso/PopupSucesso.jsx";

function CardPadrao({ id, titulo, imagem, onExcluir, onEditar }) {
  const [aberto, setAberto] = useState(false);
  const [popupDestacarAberto, setPopupDestacarAberto] = useState(false);
  const [popupExcluirAberto, setPopupExcluirAberto] = useState(false);
  const [popupSucessoAberto, setPopupSucessoAberto] = useState(false);
  const [popupDestaqueSucessoAberto, setPopupDestaqueSucessoAberto] = useState(false);
  const [destacado, setDestacado] = useState(false);

  const toggleMenu = () => {
    setAberto(!aberto);
  };

  const handleConfirmarDestacar = () => {
    setDestacado(!destacado);
    setPopupDestacarAberto(false);
    setPopupDestaqueSucessoAberto(true);
  };

  const handleConfirmarExcluir = async() => {
    try{
    await onExcluir(id);
    console.log("Exclusão concluída, abrindo popup sucesso...");
    setPopupExcluirAberto(false);
    setPopupSucessoAberto(true);
  }catch(e){
    alert("Erro ao excluir artigo: " + e.message);
  }
  };

  return (
    
    <div className={styles.containerVisualizar}>
      <div className={styles.cardGeral}>
        <img
          className={styles.imgCard}
          src={imagem || "https://i.pinimg.com/736x/59/5d/cf/595dcf5a6404fed875a1be2d36078375.jpg"}
          alt="Imagem do artigo"
        />
        <div className={styles.cardInfos}>
          <p className={styles.cardTitulo}>
            {titulo}
          </p>
          <button className={styles.btnCompleto}>
            Ver artigo completo
          </button>
        </div>

        <div className={styles.cardMenu}>
          <button onClick={toggleMenu} className={styles.iconeMenu}>
            <FaEllipsisV />
          </button>

          {aberto && (
            <ul className={styles.opcoesMenu}>
              <li>
                <button className={styles.btnEditar} onClick={() => onEditar(id)}>
                  Editar
                  <FaRegEdit className={styles.iconOptions} />
                </button>
              </li>

              <li>
                <button
                  className={styles.btnDestacar}
                  onClick={() => setPopupDestacarAberto(true)}
                >
                  {destacado ? "Encobrir" : "Destacar"}
                  {destacado ? (
                    <MdOutlineHideImage className={styles.iconOptions} />
                  ) : (
                    <PiHighlighterFill className={styles.iconOptions} />
                  )}
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
                  mensagem={destacado ? "Artigo destacado com sucesso!" : "Artigo encoberto com sucesso!"}
                  textoBotao="Fechar"
                  onBotaoClick={() => setPopupDestaqueSucessoAberto(false)}
                />
              </li>

              <li>
                <button
                  className={styles.btnExcluir}
                  onClick={() => setPopupExcluirAberto(true)}
                >
                  Excluir
                  <FaRegTrashAlt className={styles.iconOptions} />
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
                  onBotaoClick={() => setPopupSucessoAberto(false)}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardPadrao;
