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
