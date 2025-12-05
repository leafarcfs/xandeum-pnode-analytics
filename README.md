# Xandeum pNode Analytics (Starter)

Projeto intermediário (visual + leve) para exibir pNodes da rede Xandeum via pRPC.

## Instruções rápidas (sem conhecimentos técnicos)
1. Faça upload deste diretório para um repositório no GitHub (nome sugerido: `xandeum-pnode-analytics`).
2. Conecte o repositório ao Vercel para deploy automático.
3. Em Vercel, adicione a variável de ambiente `P_RPC_URL` com o endpoint pRPC (temporalmente use https://httpbin.org/post para teste).
4. Deploy no Vercel: o site ficará disponível em `https://<seu-projeto>.vercel.app`.

## Rodar localmente (opcional)
- Instale Node.js (LTS) e Git.
- No terminal:

```
npm install
echo "P_RPC_URL=https://httpbin.org/post" > .env.local
npm run dev
```

Abra http://localhost:3000

## O que contém
- Frontend Next.js + Tailwind
- API serverless que chama `P_RPC_URL`
- Página principal com tabela de pNodes e um gráfico simples
- README em Português com instruções

## Próximos passos
- Substituir `P_RPC_URL` pelo endpoint real do Xandeum (veja docs ou Discord).
- Se a API pRPC exigir formato diferente, peça que eu ajuste `pages/api/pnodes.ts`.
