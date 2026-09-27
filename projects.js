/*
  ================================================================
  PORTFÓLIO — BANCO DE PROJETOS
  ================================================================

  Para adicionar um novo trabalho no futuro:

  1. Crie uma pasta em: assets/projects/slug-do-projeto/
  2. Coloque a capa e todas as mídias do case nessa pasta.
  3. Copie um bloco de projeto abaixo e altere os dados.
  4. Salve o arquivo. O card e o modal são criados automaticamente.

  Campos principais:
  - id: identificador único, sem espaços
  - title: título do projeto
  - category: categoria curta
  - year: ano (opcional)
  - featured: true = aparece na área de destaques
  - cover: imagem usada no card da home
  - summary: descrição curta do case
  - tags: lista de especialidades/ferramentas
  - media: galeria completa, aceitando imagens e vídeos
  - behanceUrl: link original do projeto (opcional)

  Mídia de imagem:
  { type: "image", src: "...", alt: "Descrição" }

  Mídia de vídeo:
  { type: "video", src: "...", poster: "...", title: "Descrição" }
*/

window.PORTFOLIO_PROJECTS = [
  {
    id: "fortune-rabbit",
    title: "Raspa-raspa — Promoção Fortune Rabbit",
    category: "Direção de arte / Campanha promocional",
    year: "2026",
    featured: true,
    cover: "assets/projects/fortune-rabbit/cover.jpg",
    summary: "Direção visual para uma ação de raspa-raspa digital vinculada ao Fortune Rabbit, com landing page mobile, interface da mecânica promocional e mockups de aplicação.",
    tags: ["Direção de arte", "Campanha", "UI promocional", "Social media"],
    media: [
      {
        type: "image",
        src: "assets/projects/fortune-rabbit/cover.jpg",
        alt: "Mockup do projeto Raspa-raspa em um smartphone sobre um notebook"
      },
      {
        type: "image",
        src: "assets/projects/fortune-rabbit/01-landing-mobile.jpg",
        alt: "Landing page mobile da campanha Raspa-raspa de Outro Nível"
      },
      {
        type: "image",
        src: "assets/projects/fortune-rabbit/02-raspa-interface.jpg",
        alt: "Interface mobile do raspa-raspa com nove áreas de interação"
      },
      {
        type: "image",
        src: "assets/projects/fortune-rabbit/03-mockup-celulares.jpg",
        alt: "Mockup com dois smartphones apresentando a experiência promocional"
      }
    ],
    behanceUrl: "https://www.behance.net/gallery/247881483/Raspa-raspa-Promocao-Fortune-Rabbit"
  },
  {
    id: "ajude-o-touro",
    title: "AJUDE O TOURO",
    category: "Motion design / Campanha interativa",
    year: "2026",
    featured: true,
    cover: "assets/projects/ajude-o-touro/cover.jpg",
    summary: "Peça vertical em linguagem de game retrô e pixel art para uma ação de Fortune Ox na BingoPlus, combinando chamada promocional, personagem animado e sequência de gameplay.",
    tags: ["Motion design", "Pixel art", "Gamificação", "Campanha digital"],
    media: [
      {
        type: "video",
        src: "assets/projects/ajude-o-touro/ajude-o-touro.mp4",
        poster: "assets/projects/ajude-o-touro/poster-vertical.jpg",
        title: "AJUDE O TOURO — vídeo da campanha"
      }
    ],
    behanceUrl: ""
  },
  {
    id: "salgados-tasty-2024",
    title: "Salgados Tasty — 2024",
    category: "Branding / Identidade visual",
    year: "2024",
    featured: true,
    cover: "assets/projects/salgados-tasty-2024/cover.jpg",
    summary: "Construção de identidade visual para a Salgados Tasty, reunindo sistema de marca, mascote, versões de logo, uniformes, embalagens e direção visual para comunicação do produto.",
    tags: ["Branding", "Identidade visual", "Mascote", "Embalagem"],
    media: [
      {
        type: "image",
        src: "assets/projects/salgados-tasty-2024/cover.jpg",
        alt: "Fotografia de salgados com aplicação da identidade Salgados Tasty"
      },
      {
        type: "image",
        src: "assets/projects/salgados-tasty-2024/01-logo.jpg",
        alt: "Logo principal Salgados Tasty com mascote"
      },
      {
        type: "image",
        src: "assets/projects/salgados-tasty-2024/02-versoes-logo.jpg",
        alt: "Versões principais, secundárias e negativas da identidade Salgados Tasty"
      },
      {
        type: "image",
        src: "assets/projects/salgados-tasty-2024/03-uniformes.jpg",
        alt: "Aplicações da identidade Salgados Tasty em uniformes"
      },
      {
        type: "image",
        src: "assets/projects/salgados-tasty-2024/04-caixa-verde.jpg",
        alt: "Mockup de embalagem verde da Salgados Tasty"
      },
      {
        type: "image",
        src: "assets/projects/salgados-tasty-2024/05-caixa-vermelha.jpg",
        alt: "Mockup de embalagem vermelha da Salgados Tasty"
      }
    ],
    behanceUrl: "https://www.behance.net/gallery/245218335/Salgados-Tasty-2024"
  }
];
