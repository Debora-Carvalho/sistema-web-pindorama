# ⚠️ Componente PopupConfirmar

Componente de popup usado para confirmar ou cancelar uma ação crítica no sistema (ex.: excluir item, confirmar cadastro, etc).

## ✅ Importação

```javascript
import { useState } from "react";
import PopupConfirmar from "../../components/Popups/PopupConfirmar/PopupConfirmar.jsx";
```

## ⚡ Propriedades (props)

| Propriedade   | Tipo      | Obrigatória | Descrição                                                              |
| ------------- | --------- | ----------- | ---------------------------------------------------------------------- |
| `aberto`      | `boolean` | Sim         | Controla se o popup está visível (`true`) ou não (`false`).            |
| `mensagem`    | `string`  | Sim         | Mensagem principal exibida dentro do popup.                            |
| `onCancelar`  | `func`    | Sim         | Função chamada ao clicar em **Cancelar** (geralmente fecha o popup).   |
| `onConfirmar` | `func`    | Sim         | Função chamada ao clicar em **Confirmar** (executa a ação confirmada). |

## 🛠️ Exemplo de uso

```javascript
import { useState } from "react";
import PopupConfirmar from "../../components/Popups/PopupConfirmar/PopupConfirmar.jsx";

function PaginaTeste() {
  const [popupAberto, setPopupAberto] = useState(false);

  const handleConfirmar = () => {
    alert("Ação confirmada!");
    setPopupAberto(false);
  };

  return (
    <div>
      <button onClick={() => setPopupAberto(true)}>
        Mostrar Popup de Confirmação
      </button>

      <PopupConfirmar
        aberto={popupAberto}
        mensagem="Tem certeza que deseja excluir este item?"
        onCancelar={() => setPopupAberto(false)}
        onConfirmar={handleConfirmar}
      />
    </div>
  );
}
```

Utilizando em conjunto com o PopupSucesso:

```javascript
import { useState } from "react";
import PopupConfirmar from "../../components/Popups/PopupConfirmar/PopupConfirmar.jsx";
import PopupSucesso from "../../components/Popups/PopupSucesso/PopupSucesso.jsx";

function PaginaTeste() {
  const [popupConfirmarAberto, setPopupConfirmarAberto] = useState(false);
  const [popupSucessoAberto, setPopupSucessoAberto] = useState(false);

  const handleConfirmar = () => {
    setPopupConfirmarAberto(false); // fecha o confirmar
    setPopupSucessoAberto(true); // abre o sucesso
  };

  return (
    <div>
      <button onClick={() => setPopupConfirmarAberto(true)}>
        Mostrar Popup de Confirmação
      </button>

      <PopupConfirmar
        aberto={popupConfirmarAberto}
        mensagem="Tem certeza que deseja confirmar esta ação?"
        onCancelar={() => setPopupConfirmarAberto(false)}
        onConfirmar={handleConfirmar}
      />

      <PopupSucesso
        aberto={popupSucessoAberto}
        mensagem="Ação confirmada com sucesso!"
        textoBotao="Fechar"
        onBotaoClick={() => setPopupSucessoAberto(false)}
      />
    </div>
  );
}
```
