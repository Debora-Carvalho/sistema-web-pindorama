import styles from './BarraPesquisa.module.scss';
import { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import { CiSearch } from "react-icons/ci";

function BarraDePesquisa() {
  const [opcoes, setOpcoes] = useState([]);
  const [valor, setValor] = useState("");

  const buscar = async (query) => {
    if (query.length < 2) return;
    try {
      const res = await axios.get(`/api/search?query=${query}`);
      setOpcoes(res.data);
    } catch (error) {
      console.error("Erro ao buscar:", error);
    }
  };

  return (
    <div className={styles.containerPesquisa}>
      <Autocomplete
        className={styles.barraPesquisa}
        freeSolo
        options={opcoes.map((artigo) => artigo.titulo)}
        onInputChange={(e, newValue) => {
          setValor(newValue);
          buscar(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar"
            InputProps={{
              ...params.InputProps,
              endAdornment: <CiSearch className={styles.iconePesquisa} />,
            }}
          />
        )}
      />
    </div>
  );
}

export default BarraDePesquisa;
