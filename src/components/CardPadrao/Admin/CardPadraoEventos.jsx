import { useState } from "react";
import { FaEllipsisV, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { PiHighlighterFill } from "react-icons/pi";
import { MdOutlineHideImage } from "react-icons/md";
import styles from './CardPadraoEventos.module.scss';
import PopupConfirmar from "../../../components/Popups/PopupConfirmar/PopupConfirmar.jsx";
import PopupSucesso from "../../../components/Popups/PopupSucesso/PopupSucesso.jsx";

function CardPadrao() {
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

  const handleConfirmarExcluir = () => {
    setPopupExcluirAberto(false);
    setPopupSucessoAberto(true); 
  };

  return (
    <div className={styles.containerVisualizar}>
      <div className={styles.cardGeral}>
        <img
          className={styles.imgCard}
          src="https://i.pinimg.com/736x/bc/2f/be/bc2fbedc0cfe661c8552b8ce7f053d1d.jpg"
          alt="Imagem do evento"
        />
        <div className={styles.cardInfos}>
          <p className={styles.cardTitulo}>
            Palestra na Expo Patrimonio
          </p>
          <button className={styles.btnCompleto}>
            Ver evento completo
          </button>
        </div>

        <div className={styles.cardMenu}>
          <button onClick={toggleMenu} className={styles.iconeMenu}>
            <FaEllipsisV />
          </button>

          {aberto && (
            <ul className={styles.opcoesMenu}>
              <li>
                <button className={styles.btnEditar}>
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
                      ? "Tem certeza que deseja encobrir este evento?"
                      : "Tem certeza que deseja destacar este evento?"
                  }
                  onCancelar={() => setPopupDestacarAberto(false)}
                  onConfirmar={handleConfirmarDestacar}
                />

                <PopupSucesso
                  aberto={popupDestaqueSucessoAberto}
                  mensagem={destacado ? "Evento destacado com sucesso!" : "Evento encoberto com sucesso!"}
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
                  mensagem="Tem certeza que deseja excluir este evento?"
                  onCancelar={() => setPopupExcluirAberto(false)}
                  onConfirmar={handleConfirmarExcluir}
                />

                <PopupSucesso
                  aberto={popupSucessoAberto}
                  mensagem="Evento excluído com sucesso!"
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
