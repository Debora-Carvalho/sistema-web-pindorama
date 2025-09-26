# ⭕ Componente Loading

Utilize a tela de carregamento em páginas necessárias, seguindo os passos:

## ✅ Importação

```javascript
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";
```

## 🛠️ Exemplo de uso
```javascript
import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simula um carregamento (API, dados, etc.)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />; // mostra a tela de carregamento
  }

  return (
    <div>
      <h1>Minha aplicação carregou! 🎉</h1>
    </div>
  );
}

export default App;
```
