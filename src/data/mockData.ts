export const bookmakers = [
  {
    id: "elephantbet-angola",
    name: "Elephant Bet Angola",
    bonus: "Bónus de Boas-Vindas 100% até 50.000 AOA",
    features: ["Apostas ao Vivo", "App Móvel", "Pagamentos Rápidos", "Suporte Local"],
    rating: 4.5,
    url: "https://www.elephantbet.co.ao/affiliates/?btag=2395115_l364685&carrier={carrier}&os={os}",
    region: "Angola",
  },
  {
    id: "elephantbet-mozambique",
    name: "Elephant Bet Moçambique",
    bonus: "Bónus de Boas-Vindas 100% até 5.000 MZN",
    features: ["Apostas ao Vivo", "Compatível com Telemóvel", "Moeda Local", "Suporte 24/7"],
    rating: 4.4,
    url: "https://www.elephantbet.co.mz/register/?myafftoken=SPlMrDOWPJWDMLcbjJhr3GNd7ZgqdRLk",
    region: "Moçambique",
  },
  {
    id: "hollywoodbets",
    name: "HollywoodBets",
    bonus: "Aposta Grátis de R25 no Registo",
    features: ["Lucky Numbers", "Transmissão ao Vivo", "Cash Out", "Vouchers de Recarga"],
    rating: 4.6,
    url: "https://register.hollywoodbets.net/south-africa/1?btag=a_8186b_5537c_",
    region: "África do Sul",
  },
  {
    id: "betway",
    name: "Betway Global",
    bonus: "100% no 1º Depósito até R2.000",
    features: ["eSports", "Boost Multi-Aposta", "Betway Plus", "Apostas ao Vivo"],
    rating: 4.7,
    url: "https://www.betway.co.za/sport/?register=1&btag=P109119-PR37625-CM106861-TS2070210",
    region: "Global",
  },
  {
    id: "premierbet",
    name: "PremierBet",
    bonus: "Bónus de Boas-Vindas até 30.000 AOA",
    features: ["Desportos Virtuais", "Jackpot", "Apostas Rápidas", "Múltiplas Ligas"],
    rating: 4.3,
    url: "https://www.premierbet.co.ao/bonus/register-velocity-free?btag=696347_77f420a2e2a84064b8b635fe12cdd86d&utm_medium=Netrefer",
    region: "Angola",
  },
  {
    id: "888bets",
    name: "888",
    bonus: "Bónus de Boas-Vindas 100%",
    features: ["Casino ao Vivo", "Registo Rápido", "Mobile First", "Levantamentos Rápidos"],
    rating: 4.2,
    url: "https://888bets.co.mz/pt/authentication/signup?btag=cx-4779_550936",
    region: "Moçambique",
  },
  {
    id: "vvegas",
    name: "V.Vegas",
    bonus: "Bónus de Boas-Vindas 100% até €500",
    features: ["Casino ao Vivo", "Apostas Desportivas", "Levantamentos Rápidos", "Suporte 24/7"],
    rating: 4.7,
    url: "https://vvegas-promo.com/l/69f9bb9318f911bfd0029492?sub_id={sub_id_1}&click_id={click_id}",
    region: "Europa",
  },
];

export const predictions = [
  {
    id: 1, homeTeam: "Manchester City", awayTeam: "Arsenal",
    kickoff: "Hoje, 20:45", prediction: "Vitória Casa", odds: "1.85",
    confidence: 78, league: "Premier League", bookmaker: "betway",
  },
  {
    id: 2, homeTeam: "Barcelona", awayTeam: "Real Madrid",
    kickoff: "Hoje, 21:00", prediction: "Mais de 2.5", odds: "1.72",
    confidence: 82, league: "La Liga", bookmaker: "hollywoodbets",
  },
  {
    id: 3, homeTeam: "PSG", awayTeam: "Bayern Munich",
    kickoff: "Amanhã, 21:00", prediction: "Ambas Marcam", odds: "1.65",
    confidence: 75, league: "Champions League", bookmaker: "betway",
  },
  {
    id: 4, homeTeam: "Juventus", awayTeam: "AC Milan",
    kickoff: "Amanhã, 20:45", prediction: "Empate", odds: "3.20",
    confidence: 61, league: "Serie A", bookmaker: "888bets",
  },
  {
    id: 5, homeTeam: "Liverpool", awayTeam: "Chelsea",
    kickoff: "Sáb, 17:30", prediction: "Vitória Casa", odds: "2.10",
    confidence: 70, league: "Premier League", bookmaker: "betway",
  },
];

export const aiFeatures = [
  { icon: "brain", title: "Modelos de Dados", description: "Modelos avançados de machine learning treinados com mais de 500 mil jogos históricos" },
  { icon: "database", title: "Análise Histórica", description: "Análise estatística profunda em mais de 20 ligas e 10 anos de dados" },
  { icon: "bar-chart", title: "Comparação de Odds", description: "Agregação de odds em tempo real de mais de 50 casas de apostas" },
  { icon: "target", title: "Scoring de Probabilidade", description: "Algoritmo proprietário que calcula as probabilidades reais dos jogos" },
  { icon: "zap", title: "Insights Automáticos", description: "Antevisões e recomendações de apostas geradas por IA" },
];

export const platformStats = [
  { label: "Jogos Analisados", value: "500K+" },
  { label: "Previsões Feitas", value: "1.2M+" },
  { label: "Taxa de Acerto", value: "73%" },
  { label: "Utilizadores Ativos", value: "85K+" },
];

export const bettingTools = [
  { title: "Comparador de Odds", description: "Compara odds de todas as principais casas de apostas em tempo real", icon: "scale", status: "Experimentar" },
  { title: "Calculadora de Apostas", description: "Calcula retornos potenciais para simples, acumuladas e apostas de sistema", icon: "calculator", status: "Experimentar" },
  { title: "Detetor de Valor", description: "Identifica apostas onde as odds excedem a probabilidade real", icon: "search", status: "Em Breve" },
  { title: "Construtor de Acumuladas", description: "Constrói acumuladas inteligentes com seleções otimizadas por IA", icon: "layers", status: "Em Breve" },
  { title: "Explorador de Estatísticas", description: "Análise profunda de confrontos diretos e estatísticas das equipas", icon: "pie-chart", status: "Em Breve" },
];

export const tipsters = [
  { name: "Carlos Silva", winRate: "72%", specialty: "Premier League", totalTips: 1240 },
  { name: "Maria Santos", winRate: "68%", specialty: "La Liga & Serie A", totalTips: 980 },
  { name: "Amade Joaquim", winRate: "75%", specialty: "Champions League", totalTips: 650 },
  { name: "Aisha Moyo", winRate: "70%", specialty: "Ligas Africanas", totalTips: 890 },
];

export const testimonials = [
  { name: "André M.", quote: "As previsões do ALIVEGOAL ajudaram-me a construir melhores acumuladas. A abordagem baseada em dados é exatamente o que eu precisava.", rating: 5 },
  { name: "Sofia L.", quote: "A ferramenta de comparação de casas de apostas poupou-me imenso tempo. Agora encontro sempre as melhores odds.", rating: 5 },
  { name: "David K.", quote: "A melhor plataforma de previsões de futebol que já usei. Os insights da IA são incrivelmente precisos.", rating: 4 },
];
