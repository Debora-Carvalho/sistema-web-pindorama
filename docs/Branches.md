## 🌿 Branches
- Featute-test

### 📌 Convenção de Nomes

```
<tipo>/<descricao-em-kebab-case>
```

### 🧩 Tipos de Branches

| Prefixo    | Uso                                            |
| ---------- | ---------------------------------------------- |
| `feature/` | Nova funcionalidade (front, back, mobile, etc) |
| `bugfix/`  | Correção de bugs                               |
| `hotfix/`  | Correção urgente em produção                   |
| `release/` | Preparação de uma nova versão                  |
| `chore/`   | Tarefas técnicas, configs, ajustes             |
| `docs/`    | Alterações em documentação                     |
| `test/`    | Melhorias ou adições de testes                 |

### 📌 Exemplos:

- `feature/tela-inicial`
- `feature/criar-endpoint-paciente`
- `bugfix/erro-login`
- `chore/atualizar-tailwind`
- `docs/update-readme`

### 🛠️ Boas Práticas

- Crie branches a partir da `develop` (ou base definida pelo time)
- Use nomes descritivos e curtos
- Delete a branch após o merge
- Nunca faça push direto na `main`
- Sempre crie um Pull Request (PR)

## 🌿 Fluxo de trabalho com Git no terminal (branches)

No cmd (não aconselho usar o terminal do PowerShell, ele dá uns erros esquisitos):

### ✅ Entrar na branch `develop` (base do projeto)

```bash
git checkout develop
```

(Vamos trabalhar com essa branch, então temos que entrar nela antes de fazer nossa própria branch)

### 👀 Ver em que branch você está

```bash
git branch
```

### 🔄 Atualizar o projeto com as últimas mudanças

```bash
git pull
```

### 🌿 Criar e entrar na sua própria branch

```bash
git checkout -b nome-da-sua-branch
```

### ✅ Verificar se está na branch certa

```bash
git branch

```

---

## 💾 Quando for fazer o commit (é normal)

### 📋 Ver arquivos modificados

```bash
git status
```

### ➕ Adicionar todos os arquivos

```bash
git add .
```

### 📝 Fazer o commit com uma descrição

```bash
git commit -m "descrição do que foi feito nesse commit"
```

---

## 🚀 Enviar sua branch para o repositório remoto

```bash
git push -u origin nome-da-sua-branch
```
