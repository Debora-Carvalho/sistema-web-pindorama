# 🏷️ Componente PopupAdicionarTag

Componente de popup usado para adicionar tags pré-definidas durante a criação de um **Artigo** ou **Evento**.
As tags disponíveis já vêm fixas no componente e aparecem em ordem alfabética no dropdown.
O usuário pode selecionar até 4 tags, que ficam listadas abaixo do input.

## ✅ Importação

```javascript
import { useState } from "react";
import PopupTagArtigo from "../../components/Popups/PopupTagArtigo/PopupTagArtigo.jsx";
```

## ⚡ Propriedades (props)

| Propriedade   | Tipo      | Obrigatória | Descrição                                                                  |
| ------------- | --------- | ----------- | -------------------------------------------------------------------------- |
| `aberto`      | `boolean` | Sim         | Controla se o popup está visível (`true`) ou não (`false`).                |
| `onCancelar`  | `func`    | Sim         | Função chamada ao clicar em **Cancelar** (geralmente fecha o popup).       |
| `onConfirmar` | `func`    | Sim         | Função chamada ao clicar em **Confirmar**, recebendo as tags selecionadas. |

## 🏷️ Tags disponíveis

As tags são fixas e já vêm no componente:

```javascript
"capoeira",
  "carnaval",
  "conto",
  "cultura",
  "culinária",
  "dança",
  "dia-da-consciência-negra",
  "dia-do-nordestino",
  "dia-dos-povos-originários",
  "dia-do-patrimônio-histórico",
  "dia-nacional-do-forró",
  "festa-junina",
  "festa-típica",
  "folclore",
  "forró",
  "frevo",
  "indígena",
  "literatura-de-cordel",
  "música",
  "nordeste",
  "samba",
  "tradição";
```

(já ordenadas automaticamente em ordem alfabética no dropdown) ✅

## 🛠️ Exemplo de uso

```javascript
import { useState } from "react";
import PopupAdicionarTag from "../../components/Popups/PopupAdicionarTag/PopupAdicionarTag.jsx";

function PaginaCriarArtigo() {
  const [popupTagAberto, setPopupTagAberto] = useState(false);
  const [tagsSelecionadas, setTagsSelecionadas] = useState([]);

  const handleConfirmarTags = (tags) => {
    setTagsSelecionadas(tags);
    setPopupTagAberto(false);
  };

  return (
    <div>
      <button onClick={() => setPopupTagAberto(true)}>
        Adicionar Tags ao Artigo
      </button>

      <PopupTagArtigo
        aberto={popupAberto}
        onCancelar={() => setPopupTagAberto(false)}
        onConfirmar={handleConfirmarTags}
      />

      {tagsSelecionadas.length > 0 && (
        <div>
          <h3>Tags escolhidas:</h3>
          <ul>
            {tagsSelecionadas.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## ⚠️ Regras de uso

- O usuário pode selecionar no máximo 4 tags.
- Se tentar adicionar mais, aparece uma mensagem de erro: "Você só pode adicionar até 4 tags".
- O botão Confirmar só fica habilitado se ao menos 1 tag tiver sido selecionada.
