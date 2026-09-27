# Portfólio — Ítalo Chagas

Site estático, responsivo e pronto para deploy. Não depende de framework, Node.js ou etapa de build.

## Estrutura

- `index.html` — estrutura, conteúdo institucional e SEO
- `styles.css` — visual e responsividade
- `projects.js` — banco de projetos (é aqui que você adiciona novos trabalhos)
- `script.js` — menu, animações, modal, vídeo, navegação entre cases e formulário
- `assets/projects/` — mídias dos projetos
- `assets/curriculo-italo-chagas.pdf` — currículo

## Destaques atuais

A home carrega automaticamente estes três projetos a partir de `projects.js`:

1. Raspa-raspa — Promoção Fortune Rabbit
2. AJUDE O TOURO
3. Salgados Tasty — 2024

As imagens anexadas foram inseridas diretamente nos cases e o vídeo AJUDE O TOURO foi otimizado para web em H.264/AAC com `faststart`.

## Como adicionar um novo projeto

### 1. Crie uma pasta

Exemplo:

`assets/projects/nome-do-projeto/`

Coloque dentro dela a capa e todas as mídias que quiser exibir.

Exemplo:

- `cover.jpg`
- `01.jpg`
- `02.jpg`
- `video.mp4`
- `poster.jpg`

### 2. Abra `projects.js`

Copie um projeto existente e troque os dados.

### Projeto apenas com imagens

```js
{
  id: "nome-do-projeto",
  title: "Nome do Projeto",
  category: "Direção de arte / Branding",
  year: "2026",
  featured: true,
  cover: "assets/projects/nome-do-projeto/cover.jpg",
  summary: "Descrição curta do case.",
  tags: ["Direção de arte", "Branding"],
  media: [
    {
      type: "image",
      src: "assets/projects/nome-do-projeto/cover.jpg",
      alt: "Descrição da imagem"
    },
    {
      type: "image",
      src: "assets/projects/nome-do-projeto/01.jpg",
      alt: "Descrição da segunda imagem"
    }
  ],
  behanceUrl: "https://www.behance.net/gallery/..."
}
```

### Projeto com vídeo

```js
{
  id: "projeto-em-video",
  title: "Projeto em Vídeo",
  category: "Motion design",
  year: "2026",
  featured: true,
  cover: "assets/projects/projeto-em-video/cover.jpg",
  summary: "Descrição curta do projeto.",
  tags: ["Motion design", "Campanha"],
  media: [
    {
      type: "video",
      src: "assets/projects/projeto-em-video/video.mp4",
      poster: "assets/projects/projeto-em-video/poster.jpg",
      title: "Descrição acessível do vídeo"
    }
  ],
  behanceUrl: ""
}
```

Se o projeto não estiver no Behance, deixe `behanceUrl: ""`. O botão do Behance some automaticamente no modal.

### 3. Salve

O site cria automaticamente:

- o card na home;
- a capa;
- o modal flutuante;
- a galeria de imagens e/ou vídeo;
- as tags;
- o link do Behance, quando existir;
- a navegação entre projetos.

Você não precisa editar o HTML para cadastrar um novo trabalho.

## Ocultar um projeto dos destaques

Use:

```js
featured: false
```

O projeto continua cadastrado, mas não aparece no grid principal.

## Modal dos trabalhos

Ao clicar em um projeto, o site abre uma janela flutuante com:

- título, categoria, ano e resumo;
- tags;
- imagens e vídeos;
- controles nativos de vídeo;
- link para o Behance quando disponível;
- projeto anterior/próximo;
- fechamento por `X`, clique fora ou `Esc`;
- navegação com as setas do teclado.

## Recomendações para novas mídias

Para imagens:

- JPG ou WebP;
- largura de 1600 a 2200 px para cases horizontais;
- qualidade aproximada de 80–90%;
- evite arquivos excessivamente pesados.

Para vídeos:

- MP4;
- H.264 para vídeo;
- AAC para áudio;
- `faststart` habilitado;
- preferencialmente até cerca de 10–15 MB por peça curta.

## Formulário

O formulário usa FormSubmit e envia para `italochagas.design@gmail.com` sem servidor próprio.

Na primeira mensagem enviada pelo site, o FormSubmit pode solicitar confirmação por e-mail. Confirme uma vez para ativar o recebimento.

## Testar localmente

No terminal, dentro da pasta do site:

```bash
python3 -m http.server 8080
```

Abra:

`http://localhost:8080`

## Colocar online

A pasta pode ser publicada diretamente em:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- hospedagem tradicional via FTP/cPanel

Não há comando de build. Publique todos os arquivos mantendo a estrutura de pastas.
