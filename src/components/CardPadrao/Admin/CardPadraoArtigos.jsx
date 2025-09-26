import { useState } from "react";
import { FaEllipsisV, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { PiHighlighterFill } from "react-icons/pi";
import { MdOutlineHideImage } from "react-icons/md";
import styles from './CardPadraoArtigos.module.scss';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import PopupConfirmar from "../../../components/Popups/PopupConfirmar/PopupConfirmar.jsx";
import PopupSucesso from "../../../components/Popups/PopupSucesso/PopupSucesso.jsx";

function CardPadraoArtigos({ id, imagem, titulo, url }) {
  const [aberto, setAberto] = useState(false);
  const [popupDestacarAberto, setPopupDestacarAberto] = useState(false);
  const [popupExcluirAberto, setPopupExcluirAberto] = useState(false);
  const [popupSucessoAberto, setPopupSucessoAberto] = useState(false);
  const [popupDestaqueSucessoAberto, setPopupDestaqueSucessoAberto] = useState(false);
  const [destacado, setDestacado] = useState(false);
  const cardLayoutId = `artigo-card-${id}`;

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
    <motion.div layoutId={cardLayoutId} className={styles.containerVisualizar}>
      <div className={styles.cardGeral}>
        <img
          className={styles.imgCard}
          src={imagem}
          alt="Imagem do artigo"
        />
        <div className={styles.cardInfos}>
          <p className={styles.cardTitulo}>
            {titulo}
          </p>
          <Link to={url}>
            <button className={styles.btnCompleto}>
              Ver artigo completo
            </button>
          </Link>
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
    </motion.div>
  );
}

export default CardPadraoArtigos;
