export type Noticia = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  leitura: string;
  corpo: string[];
};

export const NOTICIAS: Noticia[] = [
  {
    slug: "bico-injetor-sujo-sinais",
    titulo: "Bico injetor sujo: os sinais que o carro dá antes de falhar",
    resumo: "Fumaça preta, marcha lenta irregular, perda de força e consumo maior são os avisos mais comuns. Veja o que cada sintoma indica e quando vale levar os bicos para teste em bancada.",
    categoria: "Bicos injetores",
    leitura: "4 min de leitura",
    corpo: [
      "O bico injetor é responsável por pulverizar o diesel dentro da câmara de combustão no momento e na quantidade certos. Quando ele começa a sujar ou desgastar, o motor avisa antes de parar de vez.",
      "Fumaça preta no escapamento costuma indicar excesso de combustível ou pulverização ruim: o diesel entra em gotas grandes e não queima por completo.",
      "Marcha lenta irregular, trepidação e falhas na partida a frio mostram que um ou mais bicos estão injetando de forma desigual entre os cilindros.",
      "Perda de força e aumento de consumo aparecem quando a queima deixa de ser eficiente. O motorista acelera mais para ter o mesmo desempenho.",
      "Ao notar esses sinais, o ideal é levar os bicos para teste em bancada. Lá é possível medir vazão, estanqueidade e o formato do jato, e decidir entre limpeza, reparo ou troca.",
    ],
  },
  {
    slug: "bomba-rotativa-ou-em-linha",
    titulo: "Bomba injetora rotativa ou em linha: qual a diferença?",
    resumo: "As duas dosam e enviam o diesel para os cilindros, mas funcionam de jeitos diferentes. Entenda onde cada uma aparece e quais defeitos são mais comuns.",
    categoria: "Bombas injetoras",
    leitura: "5 min de leitura",
    corpo: [
      "A bomba em linha tem um elemento de bombeamento para cada cilindro, lado a lado. É robusta, aguenta bem diesel de qualidade variável e aparece muito em caminhões, tratores e motores estacionários.",
      "A bomba rotativa usa um único conjunto de bombeamento que distribui o combustível para todos os cilindros. É mais compacta e leve, por isso ficou comum em utilitários e picapes.",
      "Na bomba em linha, os defeitos mais frequentes são desgaste dos elementos, problemas no regulador e vazamentos. Na rotativa, aparecem desgaste do cabeçote, falhas na válvula de corte e problemas de avanço.",
      "Nas duas, o diagnóstico correto depende de teste em bancada, com medição de débito por cilindro e ajuste do ponto.",
    ],
  },
  {
    slug: "common-rail-filtro-combustivel",
    titulo: "Common rail: por que o filtro de combustível não pode esperar",
    resumo: "O sistema trabalha com pressão altíssima e tolerâncias minúsculas. Água e sujeira no diesel desgastam bomba e bicos rapidamente.",
    categoria: "Common rail",
    leitura: "3 min de leitura",
    corpo: [
      "No common rail, a pressão de injeção pode passar de 1.600 bar. As folgas internas da bomba de alta e dos bicos são medidas em milésimos de milímetro.",
      "Qualquer partícula de sujeira funciona como lixa nessas peças. Já a água tira a lubrificação do diesel e provoca corrosão.",
      "Por isso o filtro de combustível é a principal proteção do sistema. Trocar no prazo do fabricante e drenar o separador de água com frequência custa muito menos que reparar bomba e bicos.",
      "Use sempre filtro de boa procedência: um filtro barato que deixa passar sujeira pode sair muito caro.",
    ],
  },
  {
    slug: "teste-em-bancada",
    titulo: "Teste em bancada: o que é avaliado em uma bomba ou bico",
    resumo: "Vazão, pressão, avanço e pulverização são conferidos com equipamento próprio. Saiba por que o diagnóstico sem bancada costuma ser só um palpite.",
    categoria: "Manutenção",
    leitura: "4 min de leitura",
    corpo: [
      "A bancada de teste simula o funcionamento real da bomba ou do bico, com rotação, pressão e tempo de injeção controlados.",
      "Na bomba, são medidos o débito em diferentes rotações, a igualdade entre os cilindros, o avanço e a atuação do regulador.",
      "No bico, são avaliados a pressão de abertura, a vazão, a estanqueidade (se pinga ou não) e o formato do jato de pulverização.",
      "Sem esses números, trocar peças vira tentativa e erro. Com o teste em bancada, o mecânico sabe exatamente o que precisa de reparo.",
    ],
  },
  {
    slug: "diesel-de-ma-qualidade",
    titulo: "Diesel de má qualidade: como evitar problemas no sistema de injeção",
    resumo: "Abastecer em postos de confiança, drenar a água do filtro e não deixar o tanque quase vazio ajudam a proteger bombas e bicos.",
    categoria: "Dicas",
    leitura: "3 min de leitura",
    corpo: [
      "Diesel contaminado com água, sujeira ou fora da especificação é uma das principais causas de falha em bombas e bicos injetores.",
      "Prefira postos de confiança e com bom movimento, onde o combustível fica menos tempo armazenado.",
      "Evite rodar com o tanque quase vazio: o fundo do tanque acumula água e resíduos que acabam sendo puxados pela bomba.",
      "Drene o separador de água regularmente e troque o filtro no prazo. São cuidados simples que prolongam muito a vida do sistema de injeção.",
    ],
  },
  {
    slug: "turbina-e-injecao",
    titulo: "Turbina e injeção: como um defeito afeta o outro",
    resumo: "Bicos que pulverizam mal geram fuligem e sobrecarregam a turbina. Por isso o diagnóstico precisa olhar o conjunto, não só uma peça.",
    categoria: "Diagnóstico",
    leitura: "5 min de leitura",
    corpo: [
      "Turbina e sistema de injeção trabalham juntos: a turbina fornece ar e a injeção fornece o diesel na medida para esse ar.",
      "Quando os bicos pulverizam mal, a queima fica incompleta e gera fuligem e temperatura alta no escapamento. Isso desgasta a turbina e pode travar a geometria variável.",
      "O contrário também acontece: uma turbina fraca entrega pouco ar, a mistura fica rica e aparecem fumaça preta e perda de força, que parecem defeito de injeção.",
      "Por isso, antes de trocar a turbina ou os bicos, vale avaliar o conjunto inteiro: injeção, admissão de ar, sensores e escapamento.",
    ],
  },
];
