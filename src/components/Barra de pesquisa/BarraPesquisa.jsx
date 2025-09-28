import Downshift from "downshift";
import style from "./BarraPesquisa.module.scss";
import { CiSearch } from "react-icons/ci";

function BarraPesquisa({ itens = [], onSelect, onInputChange }) {
  return (
    <Downshift
      onChange={selection => {
        if (selection && onSelect) onSelect(selection);
      }}
      onInputValueChange={(inputValue) =>{
        if (onInputChange) onInputChange(inputValue);
      }}
      itemToString={item => (item ? item.titulo : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div className={style.containerPesquisa}>
          <CiSearch className={style.iconePesquisa} />
          <input
            {...getInputProps({
              placeholder: "Digite para buscar...",
            })}
            className={style.inputPesquisa}
          />
          {/* Lista abaico da barra de pesquisa, comentada */}
          {/* <ul className={style.listaResultados} {...getMenuProps()}>
            {isOpen &&
              itens
                .filter(
                  item =>
                    !inputValue ||
                    item.titulo.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item, index) => (
                  <li
                    key={item.id || index}
                    className={`${style.itemLista} ${
                      highlightedIndex === index ? style.highlighted : ""
                    } ${selectedItem === item ? style.selected : ""}`}
                    {...getItemProps({ index, item })}
                  >
                    {item.titulo}
                  </li>
                ))}
          </ul> */}
        </div>
      )}
    </Downshift>
  );
}

export default BarraPesquisa;
