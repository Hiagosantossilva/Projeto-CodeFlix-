# CodeFlix

Catálogo de projetos, estudos e experimentos de Hiago Santos Silva, com navegação inspirada na Netflix. Feito em React, com conteúdo e imagens locais.

## Executar

Com Node.js e npm instalados:

```sh
npm ci
npm start
```

O servidor de desenvolvimento abre em `http://localhost:3000`.

Para gerar a versão de produção:

```sh
npm run build
```

A saída fica em `build/`.

## Organização

- `src/App.js`: carregamento do catálogo, seleção do destaque e abertura dos detalhes.
- `src/Tmdb.js`: adaptação do JSON local e nomes das categorias.
- `src/projectUtils.js`: títulos, categorias, datas, imagens e endereços dos projetos.
- `src/components/`: cabeçalho, destaque, fileiras e modal.
- `src/data/codeflix-local.json`: conteúdo do catálogo.
- `public/midia/`: capas e banners.

Para cadastrar um projeto, inclua seu registro nas categorias desejadas e suas imagens em `public/midia/`. Use endereços completos com `https://` e um ID exclusivo. Há IDs repetidos nos registros antigos; a seleção usa o registro do card, e as chaves da interface combinam título e capa para evitar trocas entre projetos. Repetições da mesma capa e título dentro de uma categoria são exibidas uma única vez.

O catálogo está organizado em Principais projetos, Projetos profissionais, Aplicativos e produtividade, Sites e páginas web, Estudos de front-end e Jogos. Os oito principais, nesta ordem, são Meu portfólio, Tomorrow, Prisma, Bio++, Ara English, Atlas Harmônico, TimeShift institucional e Escape From. ChatBot Impacta permanece em Aplicativos e produtividade. Os demais projetos continuam nas fileiras temáticas. Meu portfólio, Tomorrow e Prisma têm o ano informado de 2026, sem atribuir dia ou mês. A capa do portfólio é uma captura real de sua página publicada em 20/10/2026.

### Galerias de projetos profissionais

Chord Upgrade, Autobase e FactoryShop são projetos profissionais reais de 2026, conforme informado pelo autor. Ficam na fileira Projetos profissionais, após os destaques, com quatro, quatro e três capturas, respectivamente. As imagens ficam em `public/midia/galerias/` e mostram navegação, biblioteca, prática musical, IA automotiva, gestão da oficina, consulta de veículos, documentos e catálogo por fabricante. As capturas do navegador têm 1600×900; a terceira imagem do FactoryShop foi substituída pelo print original fornecido pelo autor, preservando sua resolução. Os estados vazios são os apresentados pelos apps na sessão de captura.

Esses registros usam `presentation: "gallery"`, `project_type: "professional"` e uma lista `gallery` de objetos com `src`, `caption` e `alt`. Não contêm campo `link`. `getProjectLink` também bloqueia links em projetos de galeria caso esse campo seja adicionado no futuro. `ProjectGallery` apresenta os prints sem cortes, com legendas, miniaturas, setas e navegação por teclado, dentro do modal. Os demais projetos mantêm seu acesso externo.

As páginas de origem foram usadas para analisar os recursos e fazer as capturas. O catálogo FactoryShop corresponde ao endereço raiz informado; o Autobase corresponde a `/chat/`. Os endereços desses três projetos não são expostos na interface ou nos registros do catálogo.

## Revisão da interface — 17/10/2026

Problemas identificados e corrigidos:

- A margem negativa do catálogo e as alturas fixas sobrepunham conteúdo. O layout agora respeita o fluxo da página, com margens compartilhadas e dimensões flexíveis.
- O destaque cortava títulos no celular. Título, descrição, tecnologias e ações agora se ajustam à largura disponível; o texto completo fica nos detalhes.
- O carrossel calculava larguras e deslocamentos manualmente. A rolagem agora é nativa, com encaixe de cards, gestos de toque e setas que refletem os limites reais, inclusive ao redimensionar.
- Cards tinham imagens esticadas, títulos leves e espaçamento irregular. Capas mantêm proporção, títulos são legíveis e os estados de foco e interação são visíveis.
- O modal não gerenciava foco nem Escape. Agora usa `dialog`, com foco contido, retorno ao acionador, bloqueio da rolagem de fundo e fechamento por botão, Escape ou clique fora.
- O destaque nunca sorteava o último projeto e podia recuperar outro registro por causa dos IDs repetidos. Ele agora seleciona diretamente o registro sorteado, incluindo todos os itens.
- Havia links sem protocolo e um registro de Evilasio Gouveia direcionando para outro projeto. Os destinos foram corrigidos e os links externos incluem proteção para abertura em outra aba.
- Foram ajustados semântica, idioma da página, textos de navegação, contatos clicáveis, carregamento local, imagens de reserva e preferência por movimento reduzido.

As cores e os espaçamentos comuns ficam nas variáveis de `src/App.css`. Os estilos de cada componente ficam junto dele. A revisão mantém a marca azul, o tema escuro e a organização por destaque e fileiras.

As setas de navegação ficam sobre as laterais das capas. No desktop, aparecem ao passar o mouse ou ao focar a fileira pelo teclado; em telas de toque, ficam visíveis quando há conteúdo naquela direção. As barras de rolagem da página, das fileiras e do modal ficam ocultas, preservando a rolagem por mouse, toque e teclado.

## Ajuste visual — 19/10/2026

- Destaque com margens, cantos arredondados e texto no canto inferior esquerdo, seguindo as referências fornecidas da Netflix.
- Banners existentes usados em capas horizontais de proporção 16:9; títulos discretos abaixo das imagens e contadores disponíveis para leitores de tela.
- Navegação compacta, avatar azul e botões simples; metadados em texto, sem etiquetas decorativas.
- Modal com imagem, título e ação principal integrados, seguido da descrição e das tecnologias. Em telas pequenas, o conteúdo fica em uma coluna.
- Fonte do sistema e dimensões compartilhadas; apresentação pessoal preservada abaixo do catálogo.

## Validação realizada

- Build de produção compilado sem erros de lint.
- Chromium em 320×740, 360×800, 390×844, 600×900, 768×1024, 1024×768, 1260×900, 1440×900, 1920×1080 e 844×390.
- Conferência de títulos, ações e modal dentro da tela, sem transbordamento horizontal da página nem sobreposição do catálogo.
- Abertura dos 26 cards exibidos após a remoção de Evilasio Gouveia e correspondência entre card e título nos detalhes.
- Limites das setas, fileiras curtas, redimensionamento, Tab/Shift+Tab, Escape, clique fora e retorno do foco.
- Emulação de celular com rolagem por gesto e abertura/fechamento por toque; preferência por movimento reduzido.
- Existência de todas as capas e banners referenciados no JSON.

Essas verificações de navegador foram executadas durante a revisão; não há uma suíte persistida de testes de interface. Não substituem uma conferência em aparelhos físicos ou em outros navegadores. A disponibilidade dos sites externos não foi auditada.

## Capturas dos apps — 19/10/2026

- Tomorrow: captura da tela inicial publicada em [tomorrow-planner.vercel.app](https://tomorrow-planner.vercel.app/), com a interface atual de tarefas e modelos de planejamento. Imagem: `public/midia/Tomorrow-2026-10-19.png`.
- Prisma: captura do editor de documento local de [prisma-olive-two.vercel.app](https://prisma-olive-two.vercel.app/), com biblioteca de blocos e configurações do relatório. O documento está sem fonte de dados vinculada; a imagem não representa resultados de campanhas reais. Imagem: `public/midia/Prisma-2026-10-19.png`.

São prints reais do navegador em 1600×900, usados como capa e banner. Os nomes incluem a data da captura para evitar o reaproveitamento de imagens antigas em cache. Tomorrow foi atualizado nas duas categorias em que aparece; Prisma foi incluído em Principais projetos e JavaScript. As descrições foram baseadas nas telas e nos recursos apresentados pelas versões publicadas.

Bio++ foi adicionado em 20/10/2026, em Principais projetos e Aplicativos e produtividade. Sua capa e banner usam `public/midia/BioPlusPlus-2026-10-20.png`, captura real do editor em 1920×1080 no acesso demonstrativo oferecido pelo app. A descrição foi baseada no editor e no painel de analytics, com widgets, personalização, publicação por link e indicadores de visualizações, cliques e CTR. O ano de lançamento não foi informado. O destino permanece [bioplusplusapps.vercel.app/app](https://bioplusplusapps.vercel.app/app), que apresenta a tela de acesso para visitantes sem sessão.

Ara English foi adicionado em 20/10/2026, em Principais projetos e Aplicativos e produtividade. A capa e o banner usam `public/midia/AraEnglish-2026-10-20.png`, captura real da tela de boas-vindas em 1920×1080, com viewport de 960×540 e escala de pixels 2. A descrição usa as informações apresentadas pelo app e pelo fluxo inicial: unidades de gramática, exercícios, revisão espaçada, objetivos, metas diárias e avaliação inicial de nível. O ano de lançamento não foi informado. O destino é [ara-english-server-delta.vercel.app/nivel](https://ara-english-server-delta.vercel.app/nivel); no primeiro acesso, o app solicita um apelido e as preferências de estudo antes da avaliação.

Atlas Harmônico foi adicionado em 20/10/2026, em Principais projetos e Aplicativos e produtividade, e também integra Projetos profissionais, após Chord Upgrade. Foi identificado pelo autor como projeto profissional e mantém o acesso direto ao site. A capa e o banner usam `public/midia/AtlasHarmonico-arte-2026-10-20.png`, print da página inicial no tema escuro fornecido pelo autor, preservado em sua resolução original. A descrição foi baseada na biblioteca de 708 voicings, nos filtros e na ficha detalhada. O destino é [palegreen-shark-460053.hostingersite.com](https://palegreen-shark-460053.hostingersite.com/). O ano de lançamento não foi informado.

### Logos nas capas

As logos originais fornecidas de Tomorrow e Prisma ficam em `public/midia/TomorrowLogo.png` e `public/midia/PrismaLogo.png`. O componente `ProjectBrand` sobrepõe a marca aos prints com um degradê de contraste e a cor de cada app. A composição aparece nas fileiras, no destaque e nos detalhes.

Os campos opcionais `logo_path`, `brand_name`, `brand_caption`, `brand_color` e `logo_scale` controlam a apresentação pelo catálogo. Os prints originais são preservados, e o movimento ao passar o mouse respeita a preferência por movimento reduzido.

Tomorrow e Prisma compartilham `suite_name: "My Workstation"`. O componente `SuiteBadge` identifica o pacote com um pequeno ícone de estrela nas capas e uma tag no destaque e nos detalhes.

## Instalação e preferências

O favicon e os ícones de instalação usam o símbolo de código do CodeFlix, em `public/codeflix-icon.svg` e `public/icons/`. O manifesto define a abertura como aplicativo. O botão ao lado do perfil usa o convite nativo de instalação quando o navegador o disponibiliza; nos demais casos, apresenta instruções para instalação pelo navegador. A instalação depende do suporte do navegador e de HTTPS em produção.

O perfil contém atalhos para apresentação, portfólio completo e contato, além da opção de reduzir animações, salva em `localStorage`. A preferência de movimento reduzido do sistema também é respeitada.

O service worker é registrado apenas na versão de produção. Ele guarda a interface e os recursos visitados para abertura offline; capas ainda não visitadas usam a imagem de reserva. Os projetos externos continuam exigindo conexão. Para validar localmente, sirva `build/` por HTTP após `npm run build`; `npm start` mantém o desenvolvimento sem cache do service worker.
