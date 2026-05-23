# Trezze Command Center

Dashboard executivo institucional com módulo de geração de conteúdo via IA.

---

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **OpenAI SDK** (`gpt-4.1-mini`)
- **OpenAI Images** (`gpt-image-1`)
- **Prisma + SQLite** para historico local
- **Lucide React**

---

## Funcionalidades IA da Fase 1

- Geracao de conteudo institucional com IA
- Persistencia automatica do historico em banco via Prisma
- Direcao visual gerada junto com o texto
- Prompt de imagem, paleta e formato sugeridos por conteudo
- Endpoint para gerar imagem a partir do prompt visual

Rotas principais:

| Rota | Metodo | Funcao |
|------|--------|--------|
| `/api/conteudo` | `POST` | Gera conteudo e salva no banco |
| `/api/conteudo/historico` | `GET` | Lista os ultimos conteudos salvos |
| `/api/conteudo/imagem` | `POST` | Gera imagem com OpenAI Images |

---

## Estrutura de pastas

```
src/
├── app/
│   ├── api/
│   │   └── conteudo/
│   │       └── route.ts          ← Endpoint OpenAI (Fase 1)
│   ├── dashboard/page.tsx
│   ├── clientes/page.tsx
│   ├── conteudo/page.tsx         ← Módulo funcional (Fase 1)
│   ├── crise/page.tsx
│   ├── relatorios/page.tsx
│   ├── checagem/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── conteudo/                 ← Componentes do módulo IA (Fase 1)
│   │   ├── ConteudoModule.tsx    ← Orquestrador principal
│   │   ├── ConteudoForm.tsx      ← Formulário de geração
│   │   ├── ConteudoResult.tsx    ← Renderização premium do resultado
│   │   └── ConteudoSkeleton.tsx  ← Loading elegante
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navbar.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── StatCard.tsx
│       ├── PageHeader.tsx
│       └── Divider.tsx
├── lib/
│   ├── utils.ts                  ← cn(), formatters
│   └── config.ts                 ← BASE_PATH, apiUrl()
├── types/
│   ├── index.ts
│   └── conteudo.ts               ← Tipos e constantes do módulo
└── styles/
    └── globals.css
```

---

## Configurar a OPENAI_API_KEY

1. Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env.local
   ```

2. Abra `.env.local` e insira sua chave:
   ```
   OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

3. Obtenha sua chave em: https://platform.openai.com/api-keys

> A chave nunca é exposta ao frontend — ela fica exclusivamente no servidor Next.js.

---

## Rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis (veja seção acima)
cp .env.example .env.local
# editar .env.local com sua OPENAI_API_KEY

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000** → redireciona para `/dashboard`

Módulo de conteúdo: **http://localhost:3000/conteudo**

---

## Deploy na Vercel

### 1. Conectar o repositório

```bash
# Se ainda não tem o projeto no GitHub/GitLab/Bitbucket, inicialize:
git init
git add .
git commit -m "feat: trezze command center fase 1"
git remote add origin https://github.com/seu-usuario/trezze-command-center.git
git push -u origin main
```

Acesse https://vercel.com/new e importe o repositório.

### 2. Configurar variáveis de ambiente na Vercel

No painel da Vercel → seu projeto → **Settings → Environment Variables**:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `OPENAI_API_KEY` | `sk-proj-...` | Production, Preview, Development |
| `NEXT_PUBLIC_BASE_PATH` | `/saas` | **Production only** |

> `NEXT_PUBLIC_BASE_PATH` deve ser definida **apenas em Production** para não afetar previews e branches de desenvolvimento.

### 3. Configurar domínio personalizado

No painel da Vercel → **Settings → Domains**:
- Adicione `trezzeci.com.br`
- Configure o DNS apontando para a Vercel

### 4. Build e deploy

```bash
# Vercel faz isso automaticamente em cada push para main
# Para deploy manual:
npx vercel --prod
```

A aplicação ficará disponível em:
**https://trezzeci.com.br/saas**

---

## Variáveis de ambiente — referência completa

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `OPENAI_API_KEY` | ✅ Sim | Chave da OpenAI API |
| `NEXT_PUBLIC_BASE_PATH` | Só em produção | `/saas` em trezzeci.com.br |

---

## Como funciona o basePath

O projeto usa `basePath` do Next.js para funcionar no subcaminho `/saas`:

- **Localmente**: `NEXT_PUBLIC_BASE_PATH` vazio → app em `localhost:3000`
- **Produção**: `NEXT_PUBLIC_BASE_PATH=/saas` → app em `trezzeci.com.br/saas`

Links internos (`<Link href="/dashboard">`) funcionam automaticamente — o Next.js prefixar com o basePath internamente.

Chamadas de API usam o helper `apiUrl()` de `src/lib/config.ts`:
```ts
import { apiUrl } from "@/lib/config";
const res = await fetch(apiUrl("/api/conteudo"), { ... });
// Localmente: /api/conteudo
// Produção:  /saas/api/conteudo
```

---

## Componentes reutilizáveis

| Componente | Variantes / Props |
|------------|------------------|
| `<Button>` | `variant`: primary, secondary, ghost, danger, gold · `size`: sm, md, lg |
| `<Badge>` | `variant`: default, gold, success, warning, danger, info · `dot` |
| `<Card>` | `hover`, `gold`, `padding`: none, sm, md, lg |
| `<StatCard>` | `label`, `value`, `change`, `icon`, `gold` |
| `<PageHeader>` | `title`, `subtitle`, slot de actions |
