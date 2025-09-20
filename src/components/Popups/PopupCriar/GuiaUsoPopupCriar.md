# ➕ Componente PopupCriar

Componente de popup usado para exibir opções de criação de conteúdo no sistema (criar **Artigos** ou **Eventos**).

## ✅ Importação

```javascript
import { useState } from "react";
import PopupCriar from "../../components/Popups/PopupCriar/PopupCriar.jsx";
```

## ⚡ Propriedades (props)

| Propriedade | Tipo      | Obrigatória | Descrição                                                                |
| ----------- | --------- | ----------- | ------------------------------------------------------------------------ |
| `aberto`    | `boolean` | Sim         | Controla se o popup está visível (`true`) ou não (`false`).              |
| `onFechar`  | `func`    | Sim         | Função chamada ao clicar em **Fechar** (fecha o popup sem redirecionar). |

## 🛠️ Exemplo de uso

```javascript
import { useState } from "react";
import PopupCriar from "../../components/Popups/PopupCriar/PopupCriar.jsx";

function PaginaTeste() {
  const [popupCriarAberto, setPopupCriarAberto] = useState(false);

  return (
    <div>
      <button onClick={() => setPopupCriarAberto(true)}>
        Mostrar PopupCriar
      </button>

      <PopupCriar
        aberto={popupCriarAberto}
        onFechar={() => setPopupCriarAberto(false)}
      />
    </div>
  );
};
```

## 🚀 Comportamento

Ao ser aberto, o popup exibe a mensagem "O que deseja criar?".

O usuário pode clicar em:

- Artigos → Redireciona para `/artigos`

- Eventos → Redireciona para `/eventos`

- Fechar → Fecha o popup sem redirecionar.
