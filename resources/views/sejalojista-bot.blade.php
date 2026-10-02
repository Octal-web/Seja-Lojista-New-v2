{{--
    HTML para crawlers e IAs de busca da página Seja Lojista New.
    Manter os textos alinhados às seções React e aos dados em resources/js/Data.
    O FAQ abaixo replica faqDoubts.js e alimenta o HTML e o JSON-LD.
--}}
@php
    $title = $title ?? 'Seja Lojista | New Móveis';
    $description = 'Abra uma loja New Móveis Planejados na sua cidade. Empreenda com autonomia de gestão, suporte da marca e a estrutura do Grupo Unicasa.';
    $pageUrl = 'https://newmoveis.com.br/sejalojista26/';
    $logoUrl = Vite::asset('resources/js/imgs/site/img/logo-new.png');
    $imageUrl = Vite::asset('resources/js/imgs/content/display/main-bg.jpg');
    $faqItems = [
        ['title' => 'O que é a New Móveis Planejados?', 'text' => 'A New Móveis Planejados é uma marca nacional de móveis planejados pertencente à Unicasa, voltada para projetos residenciais, comerciais e corporativos.'],
        ['title' => 'Como ser lojista New Móveis Planejados?', 'text' => 'O primeiro passo é preencher o formulário de interesse na página Seja Lojista New. Depois disso, a equipe de expansão avalia o perfil do interessado, a cidade desejada e o potencial da região para abertura de uma nova loja.'],
        ['title' => 'A New é uma franquia?', 'text' => 'A New trabalha com um modelo de loja própria autorizada. O lojista conduz seu próprio negócio, com autonomia de gestão e suporte da marca para implantação e desenvolvimento comercial.'],
        ['title' => 'Quanto custa abrir uma loja New?', 'text' => 'O investimento para abrir uma loja New pode variar conforme a cidade, o ponto comercial, o tamanho da loja, a estrutura necessária e o potencial de mercado. Por isso, cada caso passa por uma análise individual com a equipe de expansão.'],
        ['title' => 'Que tipo de suporte o lojista New recebe?', 'text' => 'O lojista New conta com suporte para implantação da loja, treinamento, orientação comercial, materiais institucionais, apoio de comunicação e direcionamentos para desenvolver sua atuação no mercado local.'],
        ['title' => 'A New atende projetos residenciais e comerciais?', 'text' => 'Sim. A New oferece soluções para ambientes residenciais, comerciais e corporativos, como cozinhas, dormitórios, closets, home offices, escritórios, salas comerciais, clínicas, lojas e outros espaços planejados.'],
        ['title' => 'Por que investir no mercado de móveis planejados?', 'text' => 'O mercado de móveis planejados está conectado à construção, à reforma, a novos imóveis, à arquitetura, ao design de interiores e à personalização de ambientes. É um segmento de alto valor agregado, no qual o consumidor busca soluções para melhorar o uso, a funcionalidade e a experiência dos espaços.'],
    ];
    $jsonOptions = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_THROW_ON_ERROR;
    $faqSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => array_map(fn ($item) => [
            '@type' => 'Question',
            'name' => $item['title'],
            'acceptedAnswer' => ['@type' => 'Answer', 'text' => $item['text']],
        ], $faqItems),
    ];
    $organizationSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => 'New Móveis Planejados',
        'url' => 'https://newmoveis.com.br',
        'logo' => ['@type' => 'ImageObject', 'url' => $logoUrl],
        'telephone' => '0800 721 4104',
        'sameAs' => [
            'https://www.instagram.com/newmoveisoficial/',
            'https://www.facebook.com/NewMoveisOficial/?locale=pt_BR',
            'https://www.youtube.com/@NewMoveisOficial',
            'https://www.tiktok.com/@newmoveisoficial',
        ],
        'parentOrganization' => [
            '@type' => 'Organization',
            'name' => 'Unicasa Indústria de Móveis S/A',
            'url' => 'https://unicasa.com.br',
            'description' => 'Grupo com mais de 40 anos de atuação no setor moveleiro, listado no Novo Mercado da B3 e com estrutura industrial de alta tecnologia.',
        ],
    ];
    $webPageSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'WebPage',
        'name' => 'Seja Lojista New Móveis Planejados',
        'url' => $pageUrl,
        'description' => $description,
        'inLanguage' => 'pt-BR',
        'isPartOf' => [
            '@type' => 'WebSite',
            'name' => 'New Móveis Planejados',
            'url' => 'https://newmoveis.com.br',
        ],
        'about' => ['@type' => 'Thing', 'name' => 'Programa de expansão de lojas autorizadas New Móveis Planejados'],
        'mainEntity' => [
            '@type' => 'Service',
            'name' => 'Loja Autorizada New Móveis Planejados',
            'provider' => ['@type' => 'Organization', 'name' => 'New Móveis Planejados'],
            'description' => 'Modelo de loja própria autorizada de móveis planejados, com autonomia de gestão, sem taxa de franquia e sem cobrança de royalties, com suporte para implantação e desenvolvimento comercial.',
            'areaServed' => ['@type' => 'Country', 'name' => 'Brasil'],
        ],
    ];
@endphp
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }}</title>
    <meta name="description" content="{{ $description }}">
    <link rel="canonical" href="{{ $pageUrl }}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Octal Web">
    <meta property="og:url" content="{{ $pageUrl }}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image" content="{{ $imageUrl }}">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="New Móveis Planejados">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">
    <meta name="twitter:image" content="{{ $imageUrl }}">

    <script type="application/ld+json">{!! json_encode($faqSchema, $jsonOptions) !!}</script>
    <script type="application/ld+json">{!! json_encode($organizationSchema, $jsonOptions) !!}</script>
    <script type="application/ld+json">{!! json_encode($webPageSchema, $jsonOptions) !!}</script>

    <style>
        /* Estilos mínimos — esta página não é exibida para usuários */
        body { font-family: sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem; color: #1a1a1a; line-height: 1.6; }
        h1 { font-size: 2rem; margin-bottom: 1rem; }
        h2 { font-size: 1.4rem; margin-top: 2rem; }
        h3 { font-size: 1.1rem; margin-top: 1.5rem; }
        p, li { font-size: 1rem; }
        ul { padding-left: 1.5rem; }
        .faq-item { margin-bottom: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 1.5rem; }
        .faq-item:last-child { border-bottom: none; }
    </style>
</head>
<body>
<header>
    <a href="https://newmoveis.com.br">
        <img src="{{ $logoUrl }}" alt="New Móveis Planejados" width="200">
    </a>
</header>
<main>
    <h1>Abra uma loja New Móveis Planejados na sua cidade</h1>
    <p>Empreenda no mercado de móveis planejados com uma marca nacional que une liberdade, versatilidade e suporte para desenvolver sua loja.</p>
    <p><a href="{{ $pageUrl }}#orcamento">Quero ser lojista New</a></p>

    <section aria-labelledby="sobre-marca">
        <h2 id="sobre-marca">Sobre a New Móveis Planejados</h2>
        <p>A New Móveis Planejados é uma marca nacional de móveis planejados pertencente à Unicasa, voltada para projetos residenciais, comerciais e corporativos.</p>
        <p>A New integra o Grupo Unicasa, empresa de capital aberto listada no Novo Mercado da B3, com mais de 40 anos de atuação no setor moveleiro e uma estrutura industrial de alta tecnologia.</p>
        <p>Com um parque fabril de mais de 50 mil m² e uma planta robotizada, a Unicasa reúne escala e tecnologia para sustentar a produção de suas marcas.</p>
    </section>

    <section aria-labelledby="diferenciais">
        <h2 id="diferenciais">Por que abrir uma loja New Móveis Planejados?</h2>
        <ul>
            <li><strong>Modelo de loja própria:</strong> o lojista conduz sua própria loja, com autonomia para desenvolver o negócio e atuar com uma marca nacional de móveis planejados.</li>
            <li><strong>Marca conectada a diferentes possibilidades:</strong> a marca conversa com projetos residenciais, comerciais e corporativos, atendendo diferentes estilos, necessidades e formas de viver.</li>
            <li><strong>Suporte ao lojista:</strong> orientação para implantação, treinamento, materiais institucionais, apoio comercial e direcionamentos para fortalecer a atuação da loja.</li>
            <li><strong>Mercado de alto valor agregado:</strong> o setor de móveis planejados participa de projetos personalizados, ambientes residenciais, comerciais e corporativos e da valorização dos espaços.</li>
            <li><strong>Liberdade para empreender:</strong> um modelo que permite ao lojista conduzir o próprio negócio com autonomia, contando com o respaldo e a experiência de uma marca nacional.</li>
            <li><strong>Presença nacional:</strong> uma marca presente em diferentes regiões do Brasil, conectada a novos mercados e oportunidades de expansão.</li>
        </ul>
        <p>Na New, o lojista conduz uma operação própria, com autonomia para gerir o negócio, sem taxa de franquia e sem cobrança de royalties.</p>
    </section>

    <section aria-labelledby="suporte">
        <h2 id="suporte">Estrutura de suporte ao lojista</h2>
        <ul>
            <li><strong>Treinamento da equipe:</strong> apoio para preparar o time comercial e operacional da loja, com orientações para atendimento, vendas e rotina do negócio.</li>
            <li><strong>Gestão da loja:</strong> ferramentas e orientações para apoiar a organização dos processos, o acompanhamento das demandas e o dia a dia da unidade.</li>
            <li><strong>Orientação comercial:</strong> diretrizes, campanhas e materiais para fortalecer a presença da marca, apoiar a prospecção e melhorar a atuação comercial na região.</li>
            <li><strong>Apoio em marketing e posicionamento:</strong> materiais institucionais e direcionamentos para reforçar a divulgação da loja no mercado local.</li>
        </ul>
    </section>

    <section aria-labelledby="expansao">
        <h2 id="expansao">Converse com a equipe de expansão</h2>
        <p>Preencha o cadastro e converse com a equipe de expansão sobre a disponibilidade da sua região. A equipe avalia o perfil do interessado, a cidade desejada e o potencial da região para abertura de uma nova loja.</p>
        <p>O investimento varia conforme a cidade, o ponto comercial, o tamanho da loja, a estrutura necessária e o potencial de mercado. Cada caso passa por uma análise individual com a equipe de expansão.</p>
        <p><a href="{{ $pageUrl }}#orcamento">Quero receber uma análise para a minha região</a></p>
    </section>

    <section aria-labelledby="faq">
        <h2 id="faq">Perguntas frequentes</h2>
        @foreach ($faqItems as $item)
            <div class="faq-item">
                <h3>{{ $item['title'] }}</h3>
                <p>{{ $item['text'] }}</p>
            </div>
        @endforeach
    </section>
</main>
<footer>
    <p><a href="https://newmoveis.com.br">New Móveis Planejados</a> — Grupo Unicasa</p>
    <p>Central de relacionamento com o cliente: <a href="tel:08007214104">0800 721 4104</a></p>
    <p>Canal de Ética: <a href="tel:08005152204">0800 515 2204</a></p>
    <p>
        <a href="{{ $pageUrl }}politica-de-privacidade">Política de privacidade</a> |
        <a href="{{ $pageUrl }}politica-de-cookies">Política de cookies</a>
    </p>
</footer>
</body>
</html>
