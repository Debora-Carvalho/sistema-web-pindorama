# 🎉 Componente PopupSucesso

Componente de popup usado para exibir mensagens de sucesso após alguma ação no sistema.

## ✅ Importação
```javascript
import { useState } from "react";
import PopupSucesso from "../../components/Popups/PopupSucesso/PopupSucesso.jsx";
```

## ⚡ Propriedades (props)
| Propriedade    | Tipo      | Obrigatória | Descrição                                                                   |
| -------------- | --------- | ----------- | --------------------------------------------------------------------------- |
| `aberto`       | `boolean` | Sim         | Controla se o popup está visível (`true`) ou não (`false`).                 |
| `mensagem`     | `string`  | Sim         | Mensagem principal do popup.                                                |
| `textoBotao`   | `string`  | Sim         | Texto exibido no botão do popup.                                            |
| `onBotaoClick` | `func`    | Sim         | Função chamada quando o botão for clicado (geralmente para fechar o popup). |

## 🛠️ Exemplo de uso

```javascript
import { useState } from "react";
import PopupSucesso from "../../components/Popups/PopupSucesso/PopupSucesso.jsx";

function PaginaTeste() {
  const [popupAberto, setPopupAberto] = useState(false);

  return (
    <div>
      <button onClick={() => setPopupAberto(true)}>
        Mostrar Popup de Sucesso
      </button>

      <PopupSucesso
        aberto={popupAberto}
        mensagem="Seu artigo foi criado com sucesso."
        textoBotao="Fechar"
        onBotaoClick={() => setPopupAberto(false)}
      />
    </div>
  );
};
```
