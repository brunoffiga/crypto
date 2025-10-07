// ============================================
// EVENTS-ENGINE-CRYPTO.JS - Engine de Eventos para Criptoativos
// Monitoramento de notícias, rumores, fatos e especulações
// Avaliação de impacto em upside futuro dos preços
// Baseado no modelo events-engine-updated.js e adaptado para criptomoedas específicas
// ============================================

// Lista de criptomoedas monitoradas (atualizada)
const MONITORED_CRYPTOS = [
  "BTC", "ETH", "SOL", "XRP", "ADA", "LINK", "AVAX", "MATIC", "DOGE",
  "ARB", "OP", "ENS", "ALGO", "DOT", "ATOM", "XCN", "TON", "FLOKI", "OVL"
];

// Pesos para cada tipo de evento para impacto no preço (mantido da versão original)
const IMPACT_WEIGHTS = {
  earnings: 1.0,
  corporate: 0.8,
  macro: 0.7,
  regulatory: 0.9,
  rumors: 0.6,
  technical: 0.5,
  partnership: 0.75,
  upgrade: 0.85,
  hack: -1.0,
  positive_news: 1.0,
  negative_news: -1.0,
  etf_approval: 1.2,
  halving: 1.1,
  institutional: 0.9,
  technological: 0.8,
  adoption: 0.95
};

// Multiplicadores para sentimento dos eventos (mantido da versão original)
const SENTIMENT_MULTIPLIERS = {
  positive: 1.0,
  neutral: 0.0,
  negative: -1.0,
  mixed: 0.3
};

// Banco de dados inicial de eventos (exemplo, expandir com dados dinâmicos)
const EVENTS_DATABASE = [
  // ==================== BITCOIN (BTC) EVENTS ====================
  {
    id: "BTC-20251001-UPGRADE",
    ticker: "BTC",
    date: "2025-10-01",
    type: "upgrade",
    category: "technical",
    title: "Taproot Upgrade completa com sucesso",
    description: "Upgrade Taproot ativado, melhorias significativas em privacidade e eficiência.",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.25,
    confidence: 0.9,
    probability: 0.95,
    sources: ["Bitcoin.org", "Crypto News Daily"]
  },
  {
    id: "BTC-20250420-HALVING",
    ticker: "BTC",
    date: "2025-04-20",
    type: "halving",
    category: "technical",
    title: "Bitcoin Halving 2025 - Redução de emissão",
    description: "Recompensa de bloco reduzida de 3.125 para 1.5625 BTC, diminuindo inflação anual para ~0.8%",
    impact: "very_high",
    sentiment: "positive",
    priceImpact: 0.45,
    confidence: 0.99,
    probability: 0.99,
    sources: ["Bitcoin Protocol", "Historical Analysis"]
  },
  {
    id: "BTC-20241215-ETF",
    ticker: "BTC",
    date: "2024-12-15",
    type: "etf_approval",
    category: "regulatory",
    title: "Potencial aprovação ETF Options e derivativos",
    description: "SEC considerando aprovação de opções sobre ETFs de Bitcoin, aumentando liquidez institucional",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.3,
    confidence: 0.7,
    probability: 0.6,
    sources: ["SEC Filings", "Bloomberg"]
  },
  {
    id: "BTC-20250601-INSTITUTIONAL",
    ticker: "BTC",
    date: "2025-06-01",
    type: "institutional",
    category: "adoption",
    title: "Grande corporação Fortune 500 adota Bitcoin no balanço",
    description: "Empresa global anuncia alocação de 5-10% do caixa em Bitcoin como reserva de valor",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.35,
    confidence: 0.6,
    probability: 0.5,
    sources: ["Rumors Market", "Corporate Strategy Leaks"]
  },

  // ==================== ETHEREUM (ETH) EVENTS ====================
  {
    id: "ETH-20250615-SURGE",
    ticker: "ETH",
    date: "2025-06-15",
    type: "upgrade",
    category: "technical",
    title: "The Surge: Implementação completa de Danksharding",
    description: "Escalabilidade massiva via rollups, capacidade de 100k+ TPS na L2",
    impact: "very_high",
    sentiment: "positive",
    priceImpact: 0.6,
    confidence: 0.8,
    probability: 0.75,
    sources: ["Ethereum Foundation", "Vitalik Buterin Updates"]
  },
  {
    id: "ETH-20241201-ETF",
    ticker: "ETH",
    date: "2024-12-01",
    type: "etf_approval",
    category: "regulatory",
    title: "ETF Spot Ethereum aprovado pela SEC",
    description: "Aprovação histórica permite acesso institucional direto ao Ethereum",
    impact: "very_high",
    sentiment: "positive",
    priceImpact: 0.5,
    confidence: 0.85,
    probability: 0.8,
    sources: ["SEC Calendar", "Institutional Demand"]
  },
  {
    id: "ETH-20250701-ACCOUNT",
    ticker: "ETH",
    date: "2025-07-01",
    type: "upgrade",
    category: "technical",
    title: "Abstração de Contas (Account Abstraction) Mainnet",
    description: "Revolução UX: carteiras inteligentes, recuperação de seeds, experiência similar Web2",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.3,
    confidence: 0.75,
    probability: 0.7,
    sources: ["EIP-4337", "Core Dev Updates"]
  },
  {
    id: "ETH-20250815-INSTITUTIONAL",
    ticker: "ETH",
    date: "2025-08-15",
    type: "institutional",
    category: "adoption",
    title: "Bancos centrais explorando staking de Ethereum",
    description: "Instituições financeiras tradicionais considerando ETH como ativo produtivo",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.2,
    confidence: 0.5,
    probability: 0.4,
    sources: ["Central Bank Research", "Financial Times"]
  },

  // ==================== SOLANA (SOL) EVENTS ====================
  {
    id: "SOL-20250301-FIREDANCER",
    ticker: "SOL",
    date: "2025-03-01",
    type: "upgrade",
    category: "technical",
    title: "Firedancer: Novo cliente completo de validação",
    description: "Implementação do cliente Firedancer pela Jump Trading, aumentando throughput para 1M+ TPS",
    impact: "very_high",
    sentiment: "positive",
    priceImpact: 0.7,
    confidence: 0.9,
    probability: 0.85,
    sources: ["Solana Foundation", "Jump Trading"]
  },
  {
    id: "SOL-20241210-DEPIN",
    ticker: "SOL",
    date: "2024-12-10",
    type: "partnership",
    category: "adoption",
    title: "Expansão massiva DePIN: Render, Helium, Hivemapper",
    description: "Ecossistema DePIN atinge massa crítica com milhões de dispositivos físicos",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.4,
    confidence: 0.8,
    probability: 0.8,
    sources: ["Solana DePIN Report", "Network Growth Metrics"]
  },
  {
    id: "SOL-20250520-MOBILE",
    ticker: "SOL",
    date: "2025-05-20",
    type: "technological",
    category: "adoption",
    title: "Saga Phone v2 e integração mobile massiva",
    description: "Nova geração de smartphones Web3 com integração nativa Solana",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.25,
    confidence: 0.7,
    probability: 0.6,
    sources: ["Solana Mobile", "Tech Partnerships"]
  },
  {
    id: "SOL-20250901-ENTERPRISE",
    ticker: "SOL",
    date: "2025-09-01",
    type: "corporate",
    category: "adoption",
    title: "Adoção enterprise em pagamentos e loyalty programs",
    description: "Grandes varejistas implementando soluções Solana para programas de fidelidade",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.2,
    confidence: 0.6,
    probability: 0.5,
    sources: ["Enterprise Partnerships", "Retail Integration"]
  },

  // ==================== RIPPLE (XRP) EVENTS ====================
  {
    id: "XRP-20250115-SECSETTLEMENT",
    ticker: "XRP",
    date: "2025-01-15",
    type: "regulatory",
    category: "legal",
    title: "Resolução final do caso SEC vs Ripple",
    description: "Sentença final estabelece precedente regulatório positivo para XRP",
    impact: "very_high",
    sentiment: "positive",
    priceImpact: 0.8,
    confidence: 0.9,
    probability: 0.9,
    sources: ["Court Documents", "Legal Analysis"]
  },
  {
    id: "XRP-20250601-CBANK",
    ticker: "XRP",
    date: "2025-06-01",
    type: "partnership",
    category: "adoption",
    title: "Banco central majoritário adota RippleNet para remessas",
    description: "Implementação em escala nacional usando XRP como ponte de liquidez",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.45,
    confidence: 0.7,
    probability: 0.6,
    sources: ["Central Bank Announcements", "Ripple Partnerships"]
  },
  {
    id: "XRP-20250301-ETF",
    ticker: "XRP",
    date: "2025-03-01",
    type: "etf_approval",
    category: "regulatory",
    title: "Aplicação para ETF Spot XRP submetida à SEC",
    description: "Grande asset manager submete aplicação formal para ETF de XRP",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.35,
    confidence: 0.6,
    probability: 0.5,
    sources: ["SEC Filings", "Institutional Interest"]
  },

  // ==================== CARDANO (ADA) EVENTS ====================
  {
    id: "ADA-20250201-INTEROPERABILITY",
    ticker: "ADA",
    date: "2025-02-01",
    type: "upgrade",
    category: "technical",
    title: "Implementação completa de interoperabilidade cross-chain",
    description: "Protocolos de comunicação entre chains permitindo transferência de ativos entre ecossistemas",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.4,
    confidence: 0.8,
    probability: 0.75,
    sources: ["IOG Updates", "Cardano Roadmap"]
  },
  {
    id: "ADA-20250715-GOVERNANCE",
    ticker: "ADA",
    date: "2025-07-15",
    type: "upgrade",
    category: "technical",
    title: "Sistema de governança on-chain Voltaire completo",
    description: "Cardano torna-se totalmente descentralizado com treasury e votação comunitária",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.25,
    confidence: 0.75,
    probability: 0.7,
    sources: ["Cardano Foundation", "Governance Proposals"]
  },
  {
    id: "ADA-20241101-AFRICA",
    ticker: "ADA",
    date: "2024-11-01",
    type: "partnership",
    category: "adoption",
    title: "Expansão massiva de adoção na África",
    description: "Parcerias governamentais para identidade digital e inclusão financeira",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.2,
    confidence: 0.8,
    probability: 0.8,
    sources: ["IOG Partnerships", "Government MoUs"]
  },

  // ==================== CHAINLINK (LINK) EVENTS ====================
  {
    id: "LINK-20250315-CCIP",
    ticker: "LINK",
    date: "2025-03-15",
    type: "technological",
    category: "technical",
    title: "CCIP (Cross-Chain Interoperability Protocol) mainnet",
    description: "Protocolo permite comunicação segura entre blockchains com oráculos descentralizados",
    impact: "very_high",
    sentiment: "positive",
    priceImpact: 0.6,
    confidence: 0.85,
    probability: 0.8,
    sources: ["Chainlink Labs", "Cross-Chain Development"]
  },
  {
    id: "LINK-20250501-SWIFT",
    ticker: "LINK",
    date: "2025-05-01",
    type: "partnership",
    category: "adoption",
    title: "Integração completa com SWIFT e bancos tradicionais",
    description: "Sistema bancário global usando Chainlink para tokenização de ativos reais",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.5,
    confidence: 0.7,
    probability: 0.65,
    sources: ["SWIFT Announcements", "Banking Partnerships"]
  },
  {
    id: "LINK-20250820-STAKINGV3",
    ticker: "LINK",
    date: "2025-08-20",
    type: "upgrade",
    category: "technical",
    title: "Chainlink Staking v3 com recompensas dinâmicas",
    description: "Novo modelo de staking com recompensas baseadas em demanda de dados",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.3,
    confidence: 0.8,
    probability: 0.75,
    sources: ["Chainlink Economics", "Staking Updates"]
  },

  // ==================== AVALANCHE (AVAX) EVENTS ====================
  {
    id: "AVAX-20250401-SUBNETS",
    ticker: "AVAX",
    date: "2025-04-01",
    type: "technological",
    category: "technical",
    title: "Expansão massiva de Subnets especializadas",
    description: "DeFi institutions, gaming studios e enterprises lançando subnets customizadas",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.45,
    confidence: 0.8,
    probability: 0.8,
    sources: ["Avalanche Foundation", "Subnet Deployments"]
  },
  {
    id: "AVAX-20250910-ENTERPRISE",
    ticker: "AVAX",
    date: "2025-09-10",
    type: "corporate",
    category: "adoption",
    title: "Grande empresa de asset management usando Avalanche",
    description: "Instituição financeira majoritária implementando soluções digitais em subnet privada",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.25,
    confidence: 0.6,
    probability: 0.55,
    sources: ["Enterprise Deployments", "Financial Services"]
  },

  // ==================== POLYGON (MATIC) EVENTS ====================
  {
    id: "MATIC-20250215-ZKROLLUPS",
    ticker: "MATIC",
    date: "2025-02-15",
    type: "upgrade",
    category: "technical",
    title: "zkEVM alcança paridade completa com Ethereum",
    description: "Performance e compatibilidade maximizadas, atraindo grandes projetos DeFi",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.4,
    confidence: 0.85,
    probability: 0.8,
    sources: ["Polygon Labs", "zkEVM Development"]
  },
  {
    id: "MATIC-20250701-INSTITUTIONAL",
    ticker: "MATIC",
    date: "2025-07-01",
    type: "partnership",
    category: "adoption",
    title: "Parceria estratégica com gigante tech para Web3 identity",
    description: "Solução de identidade digital usando Polygon para milhões de usuários",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.3,
    confidence: 0.7,
    probability: 0.65,
    sources: ["Tech Partnerships", "Identity Solutions"]
  },

  // ==================== DOGECOIN (DOGE) EVENTS ====================
  {
    id: "DOGE-20241201-ELON",
    ticker: "DOGE",
    date: "2024-12-01",
    type: "rumors",
    category: "adoption",
    title: "Rumores: Integração DOGE em plataforma X (Twitter)",
    description: "Especulações sobre pagamentos e tips usando Dogecoin na rede social",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.6,
    confidence: 0.4,
    probability: 0.3,
    sources: ["Social Media Rumors", "Elon Musk Tweets"]
  },
  {
    id: "DOGE-20250615-MERCHANTS",
    ticker: "DOGE",
    date: "2025-06-15",
    type: "adoption",
    category: "partnership",
    title: "Grande varejista aceita DOGE como método de pagamento",
    description: "Empresa de e-commerce ou varejo físico integrando Dogecoin",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.35,
    confidence: 0.5,
    probability: 0.4,
    sources: ["Merchant Adoption", "Payment Processors"]
  },

  // ==================== TONCOIN (TON) EVENTS ====================
  {
    id: "TON-20250601-TELEGRAM",
    ticker: "TON",
    date: "2025-06-01",
    type: "partnership",
    category: "adoption",
    title: "Integração profunda de pagamentos via Telegram",
    description: "Expansão da funcionalidade de pagamentos P2P e compras dentro do aplicativo Telegram para sua base global de usuários.",
    impact: "very_high",
    sentiment: "positive",
    priceImpact: 0.8,
    confidence: 0.85,
    probability: 0.8,
    sources: ["Telegram Blog", "TON Foundation"]
  },
  {
    id: "TON-20250315-STAKING",
    ticker: "TON",
    date: "2025-03-15",
    type: "technological",
    category: "technical",
    title: "Novo programa de staking com recompensas ampliadas",
    description: "Atualização do mecanismo de consenso para oferecer APYs mais competitivos e atrair maior participação na rede.",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.4,
    confidence: 0.8,
    probability: 0.9,
    sources: ["TON Development Roadmap"]
  },
  {
    id: "TON-20241201-DEFI",
    ticker: "TON",
    date: "2024-12-01",
    type: "adoption",
    category: "partnership",
    title: "Lançamento de grandes projetos DeFi e NFTs no ecossistema TON",
    description: "Rumores de que DEXs e mercados NFT de grande porte estão se preparando para lançar na blockchain TON, aproveitando a base de usuários do Telegram.",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.5,
    confidence: 0.7,
    probability: 0.6,
    sources: ["Ecosystem Rumors", "Developer Leaks"]
  },

  // ==================== FLOKI (FLOKI) EVENTS ====================
  {
    id: "FLOKI-20241101-ROBINHOOD",
    ticker: "FLOKI",
    date: "2024-11-01",
    type: "adoption",
    category: "regulatory",
    title: "Listagem do FLOKI no aplicativo Robinhood",
    description: "Listagem confirmada no grande varejista de investimentos Robinhood, proporcionando acesso massivo a investidores de varejo nos EUA e Europa:cite[1].",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.5,
    confidence: 0.95,
    probability: 0.95,
    sources: ["Robinhood Announcement", "Floki Official Blog"]
  },
  {
    id: "FLOKI-20250115-DEBITCARD",
    ticker: "FLOKI",
    date: "2025-01-15",
    type: "adoption",
    category: "partnership",
    title: "Lançamento oficial do Cartão de Débito Floki",
    description: "Cartão de débito que suporta conversão de múltiplas criptomoedas para fiato, com limite diário de 5.000 USDT e 0% de taxas de transação:cite[1].",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.3,
    confidence: 0.9,
    probability: 0.85,
    sources: ["Floki.com", "FNT Crypto Partnership"]
  },
  {
    id: "FLOKI-20250301-VALHALLA",
    ticker: "FLOKI",
    date: "2025-03-01",
    type: "technological",
    category: "technical",
    title: "Atualização major do Metaverso Valhalla e versão chinesa",
    description: "Lançamento de nova versão do metaverso flagship Valhalla com conteúdo exclusivo para o mercado chinês, incluindo modelos e trilhas sonoras localizadas:cite[1].",
    impact: "high",
    sentiment: "positive",
    priceImpact: 0.4,
    confidence: 0.8,
    probability: 0.8,
    sources: ["Valhalla Development Updates"]
  },
  {
    id: "FLOKI-20250201-TOKENFI",
    ticker: "FLOKI",
    date: "2025-02-01",
    type: "technological",
    category: "technical",
    title: "Expansão da plataforma TokenFi de tokenização",
    description: "Novos recursos para tokenização de Ativos do Mundo Real (RWA) na plataforma TokenFi, impulsionando utilidade para o ecossistema FLOKI:cite[4].",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.25,
    confidence: 0.75,
    probability: 0.7,
    sources: ["TokenFi Roadmap", "Floki AMA"]
  },
  {
    id: "FLOKI-20250415-BURNS",
    ticker: "FLOKI",
    date: "2025-04-15",
    type: "corporate",
    category: "technical",
    title: "Mecanismos de queima (burn) automáticos ampliados",
    description: "Implementação de queimas automáticas de tokens baseadas na receita de produtos como FlokiFi Locker, reduzindo a oferta circulante de FLOKI:cite[4].",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.2,
    confidence: 0.8,
    probability: 0.9,
    sources: ["FlokiFi Documentation", "Core Team AMA"]
  },
  {
    id: "FLOKI-20250601-UNIVERSITY",
    ticker: "FLOKI",
    date: "2025-06-01",
    type: "adoption",
    category: "partnership",
    title: "Lançamento completo da University of Floki",
    description: "Plataforma de educação cripto com conteúdo assíncrono, usando FLOKI como token de utilidade para funcionalidades premium:cite[1].",
    impact: "low",
    sentiment: "positive",
    priceImpact: 0.15,
    confidence: 0.7,
    probability: 0.6,
    sources: ["University of Floki Beta Updates"]
  },
  {
    id: "FLOKI-20250701-REGULATORY",
    ticker: "FLOKI",
    date: "2025-07-01",
    type: "regulatory",
    category: "regulatory",
    title: "Vantagens da conformidade MiCAR na Europa",
    description: "Status de conformidade com MiCAR abre portas para parcerias institucionais e listagens regulamentadas na União Europeia:cite[4].",
    impact: "medium",
    sentiment: "positive",
    priceImpact: 0.25,
    confidence: 0.8,
    probability: 0.75,
    sources: ["ESMA Regulatory Filings", "Floki Legal Team"]
  },

  // ==================== EVENTOS DE RISCO REGULATÓRIO ====================
  {
    id: "CRYPTO-20250301-REGCRACKDOWN",
    ticker: "BTC",
    date: "2025-03-01",
    type: "regulatory",
    category: "negative_news",
    title: "Potencial crackdown regulatório em major jurisdiction",
    description: "Grande economia anunciando restrições severas a criptoativos",
    impact: "high",
    sentiment: "negative",
    priceImpact: -0.4,
    confidence: 0.3,
    probability: 0.25,
    sources: ["Regulatory Watch", "Policy Analysis"]
  },
  {
    id: "CRYPTO-20250801-GLOBALTAX",
    ticker: "ETH",
    date: "2025-08-01",
    type: "regulatory",
    category: "negative_news",
    title: "Harmonização global de taxação sobre cripto",
    description: "OECD implementando framework comum de taxação para transações cripto",
    impact: "medium",
    sentiment: "negative",
    priceImpact: -0.25,
    confidence: 0.6,
    probability: 0.7,
    sources: ["OECD Reports", "Tax Policy"]
  }
];

// ============================================
// NOVO: CONDITIONAL LOGIC ENGINE (IF/THEN)
// ============================================

const CONDITIONAL_LOGIC = {
    // RWA Tokenization Event (Alto Risco/Alto Retorno Assimétrico)
    RWA_TOKENIZATION_LAUNCH: {
        // CONDIÇÃO: Stablecoin supply de RWA > $1B E Market Cap do token < $5B (Busca por assimetria)
        condition: (asset) => {
            const minCapitalTrigger = 1000000000; // $1B em capital RWA
            const maxMarketCapForAsymmetry = 5000000000; // $5B de Market Cap
            
            // Assume-se que o asset tem stablecoinSupplyRWA (novo campo no data-crypto.js)
            const rwaCapital = asset.metrics.stablecoinSupplyRWA || 0;
            const marketCap = asset.marketCap || 1;

            return rwaCapital >= minCapitalTrigger && 
                   marketCap <= maxMarketCapForAsymmetry;
        },
        
        // CÁLCULO: Recompensa o Market Cap pequeno que recebe capital grande (Fórmula Assimétrica)
        calculate: (asset) => {
            const rwaCapital = asset.metrics.stablecoinSupplyRWA || 0;
            const marketCap = asset.marketCap || 1;
            
            // Prêmio é a raiz quadrada da razão (RWA/MC) * um fator de peso (0.5)
            const premiumFactor = Math.sqrt(rwaCapital / marketCap) * 0.5;
            
            // Limita o prêmio máximo em 200% (2.0)
            return Math.min(2.0, premiumFactor); 
        },
        
        // Metadados
        type: 'asymmetric_adoption',
        risk_level: 'high_reward',
    },

    // Exemplo 2: Penalidade de Centralização (SOL/AVAX)
    DECENTRALIZATION_PENALTY: {
        condition: (asset) => {
            // Se o score de descentralização for baixo (<50) E TVL for alto (> $5B) (Risco de único ponto de falha)
            const decentralization = asset.metrics.decentralizationScore || 50;
            const tvl = asset.metrics.tvl || 0;
            return decentralization < 50 && tvl > 5000000000; 
        },
        calculate: () => -0.25, // Penalidade de 25% no preço
        type: 'protocol_risk',
        risk_level: 'high_risk',
    }
};

// ============================================
// NOVO: Aplica a lógica condicional ao evento
// ============================================
function applyConditionalLogic(event, asset) {
    if (!event.triggerId || !CONDITIONAL_LOGIC[event.triggerId]) {
        return event.priceImpact;
    }
    
    const logic = CONDITIONAL_LOGIC[event.triggerId];

    if (logic.condition(asset)) {
        // Se a condição for atendida, usa o fator calculado
        return logic.calculate(asset);
    } 
    
    // Se a condição não for atendida, o impacto é zero (ou o impacto base do evento, dependendo da regra)
    // Aqui, preferimos o impacto zero se o trigger não for atingido
    return 0; 
}

// Função para calcular score de impacto para um evento
function calculateEventScore(event) {
  const baseImpact = event.priceImpact || 0;
  const typeWeight = IMPACT_WEIGHTS[event.type] || 0.5;
  const sentimentMult = SENTIMENT_MULTIPLIERS[event.sentiment] || 0;
  const confidenceAdj = event.confidence || 0.5;
  const probabilityAdj = event.probability || 0.5;
  const score = baseImpact * typeWeight * sentimentMult * confidenceAdj * probabilityAdj;
  return score;
}

// Filtrar eventos por criptomoeda monitorada
function getEventsByTicker(ticker) {
  return EVENTS_DATABASE.filter(event => event.ticker === ticker);
}

// Filtrar eventos por data futura e por impacto
function getUpcomingEvents(ticker, daysAhead = 365) {
  const now = new Date();
  const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  return getEventsByTicker(ticker).filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= now && eventDate <= futureDate;
  });
}

// Gerar insights combinados para um criptoativo baseado em eventos
function generateEventInsights(ticker) {
  const upcomingEvents = getUpcomingEvents(ticker);
  if (upcomingEvents.length === 0) {
    return {
      ticker,
      sentiment: "neutral",
      confidence: 0,
      eventCount: 0,
      aggregatedScore: 0,
      topEvent: null
    };
  }

  let aggregatedScore = 0;
  let weightedConfidence = 0;
  let eventCount = 0;
  let topEvent = upcomingEvents[0];
  let maxScore = calculateEventScore(topEvent);

  upcomingEvents.forEach(event => {
    const score = calculateEventScore(event);
    aggregatedScore += score;
    weightedConfidence += score * (event.confidence || 0.5);
    eventCount++;
    if (score > maxScore) {
      maxScore = score;
      topEvent = event;
    }
  });

  const avgConfidence = weightedConfidence / aggregatedScore || 0;
  const sentiment = aggregatedScore > 0.1 ? "positive" : aggregatedScore < -0.1 ? "negative" : "neutral";

  return {
    ticker,
    sentiment,
    confidence: avgConfidence,
    eventCount,
    aggregatedScore,
    topEvent
  };
}

// Análise comparativa entre criptomoedas baseada em eventos
function generateComparativeAnalysis() {
  const analysis = {};
  MONITORED_CRYPTOS.forEach(ticker => {
    analysis[ticker] = generateEventInsights(ticker);
  });
  
  // Ordenar por potencial de upside baseado em eventos
  const ranked = MONITORED_CRYPTOS.sort((a, b) => {
    return analysis[b].aggregatedScore - analysis[a].aggregatedScore;
  });
  
  return {
    analysis,
    ranking: ranked,
    topPerformer: ranked[0],
    worstPerformer: ranked[ranked.length - 1]
  };
}

// Exportar funções e constantes para uso em outros módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    MONITORED_CRYPTOS,
    EVENTS_DATABASE,
    calculateEventScore,
    getEventsByTicker,
    getUpcomingEvents,
    generateEventInsights,
    generateComparativeAnalysis,
    IMPACT_WEIGHTS,
    SENTIMENT_MULTIPLIERS
  };
}