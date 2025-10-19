# 🎨 Componente ThemeToggle

Componente **ThemeToggle** é usado para alterar o tema visual do sistema.
Permite ao usuário pré-visualizar o novo tema antes de confirmar a mudança definitiva.

Ao clicar em **Confirmar**, o novo tema é aplicado globalmente.
Ao clicar em **Cancelar**, o tema anterior é restaurado e o modal é fechado sem alterações.

## ✅ Importação

```javascript
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle.jsx";
```

## ⚡ Propriedades (props)
| Propriedade   | Tipo      | Obrigatória | Descrição                                                                              |
| ------------- | --------- | ----------- | -------------------------------------------------------------------------------------- |
| `aberto`      | `boolean` | Sim         | Controla se o modal está visível (`true`) ou não (`false`).                            |
| `onCancelar`  | `func`    | Sim         | Função executada ao clicar em **Cancelar** — fecha o modal e restaura o tema anterior. |
| `onConfirmar` | `func`    | Sim         | Função executada ao clicar em **Confirmar**, recebendo o tema aplicado.                |

## 🎨 Temas disponíveis
O componente utiliza temas definidos no ThemeContext:

```javascript
import {
  DEFAULT_THEME,
  DARK_THEME,
  NORDESTINO_THEME,
  INDIGENA_THEME,
} from "../../contexts/ThemeContext";
```

## 🛠️ Exemplo de uso
```javascript
import { useState } from "react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle.jsx";

function PaginaConfiguracoes() {
  const [modalTemaAberto, setModalTemaAberto] = useState(false);
  const [temaAtual, setTemaAtual] = useState("DEFAULT_THEME");

  const handleConfirmarTema = (novoTema) => {
    setTemaAtual(novoTema);
    setModalTemaAberto(false);
  };

  return (
    <div>
      <h2>Configurações do Sistema</h2>

      <button onClick={() => setModalTemaAberto(true)}>
        Alterar Tema
      </button>

      <ThemeToggle
        aberto={modalTemaAberto}
        onCancelar={() => setModalTemaAberto(false)}
        onConfirmar={handleConfirmarTema}
      />
    </div>
  );
}

export default PaginaConfiguracoes;
```

## 🧩 Funcionamento interno

- Ao abrir o modal, o tema atual é armazenado como referência.
- Ao clicar em um botão de tema (Default, Dark, Nordestino, Indígena), o sistema pré-visualiza o novo tema sem aplicá-lo permanentemente.
- Se o usuário clicar em Cancelar, o tema volta para o anterior.
- Se clicar em Confirmar, o novo tema é mantido e salvo globalmente.

## ⚠️ Regras de uso

- O componente depende do ThemeContext para funcionar corretamente.
- Ele deve estar dentro de um provider que defina globalTheme e setGlobalTheme.
- A pré-visualização é apenas temporária; o tema só é aplicado de fato após a confirmação.
- Pode ser reutilizado em qualquer página para trocar temas de forma consistente.

