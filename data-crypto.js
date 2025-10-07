const CRYPTO_DATABASE = [
  // ==================== LAYER 1 (L1) ====================
  {
    ticker: "BTC",
    name: "Bitcoin",
    protocolType: "L1",
    sector: "Reserva de Valor / Moeda Digital",
    marketCap: 2460000000000, // US$ 2.46T
    currentPrice: 123875, // US$
    circulatingSupply: 19900000, // Unidades aproximadas
    targetMVRV: 3.0,
    upsideTarget: 175000,
    score: 98,
    ranking: 1,
    recommendation: "CORE HOLD",
    metrics: {
      tvl: 0,
      protocolRevenue: 1000000000, // US$ 1B estimado
      activeAddresses: 1000000,
      mvrvZScore: 1.1,
      volatility60d: 0.025,
      volumeOnChain: 20000000000,
      smartContractRisk: 5,
      decentralizationScore: 95,
    },
    roadmapEvents: [
      "Taproot upgrades e melhorias de privacidade",
      "Desenvolvimento Lightning Network e scaling Layer 2",
      "Potencial adoção institucional ampliada"
    ],
    regulatoryRisks: [
      "Regulamentação global crescente para criptoativos",
      "Políticas ambientais contra Proof-of-Work"
    ],
    performance: {
      btcCorrelation: 1.0,
      bearMarketDrawdown: -85,
    },
    analystConsensus: { buy: 15, hold: 3, sell: 0 },
    projections: { target1Y: 150000, target3Y: 200000, target5Y: 300000 },
    confidence: 95
  },

  {
    ticker: "ETH",
    name: "Ethereum",
    protocolType: "L1/L2/DeFi/NFTs",
    sector: "Infraestrutura",
    marketCap: 551000000000,
    currentPrice: 4565,
    circulatingSupply: 120000000,
    targetMVRV: 2.5,
    upsideTarget: 10500,
    score: 95,
    ranking: 2,
    recommendation: "CORE HOLD",
    metrics: {
      tvl: 50000000000,
      protocolRevenue: 1800000000,
      activeAddresses: 550000,
      mvrvZScore: 0.9,
      volatility60d: 0.03,
      volumeOnChain: 2500000000,
      smartContractRisk: 10,
      decentralizationScore: 98,
    },
    roadmapEvents: [
      "The Surge: Escalabilidade via Rollups (2026)",
      "EIP-4844 (Proto-Danksharding) - Redução custo L2",
      "Abstração de Contas (Adoção Mainstream)"
    ],
    regulatoryRisks: [
      "Classificação SEC (Securities vs Commodity)",
      "Regulamentação de Staking"
    ],
    performance: {
      btcCorrelation: 0.85,
      bearMarketDrawdown: -80,
    },
    analystConsensus: { buy: 10, hold: 0, sell: 0 },
    projections: { target1Y: 5500, target3Y: 8000, target5Y: 10500 },
    confidence: 90
  },

  // ==================== LAYER 1 HIGH-PERF ====================
  {
    ticker: "SOL",
    name: "Solana",
    protocolType: "L1/DePIN/NFTs",
    sector: "Infraestrutura Escalável",
    marketCap: 127000000000,
    currentPrice: 234,
    circulatingSupply: 460000000,
    targetMVRV: 3.0,
    upsideTarget: 420,
    score: 88,
    ranking: 3,
    recommendation: "GROWTH BUY",
    metrics: {
      tvl: 4500000000,
      protocolRevenue: 150000000,
      activeAddresses: 1100000,
      mvrvZScore: 1.2,
      volatility60d: 0.05,
      volumeOnChain: 1800000000,
      smartContractRisk: 25,
      decentralizationScore: 65,
    },
    roadmapEvents: [
      "Firedancer: Novo Cliente (Descentralização + Estabilidade)",
      "Integração Mobile (Saga Phone/Web3 Mobile)",
      "Crescimento DePIN (Render, Helium)"
    ],
    regulatoryRisks: [
      "Concorrência L1/L2",
      "Potencial de Outages (Problemas de Rede)"
    ],
    performance: {
      btcCorrelation: 0.75,
      bearMarketDrawdown: -95,
    },
    analystConsensus: { buy: 8, hold: 2, sell: 0 },
    projections: { target1Y: 250, target3Y: 350, target5Y: 420 },
    confidence: 82
  },

  {
    ticker: "XRP",
    name: "Ripple",
    protocolType: "L1/Financeiro",
    sector: "Pagamentos Globais",
    marketCap: 179000000000,
    currentPrice: 2.99,
    circulatingSupply: 60000000000,
    targetMVRV: 3.5,
    upsideTarget: 7.5,
    score: 85,
    ranking: 4,
    recommendation: "STRATEGIC BUY",
    metrics: {
      tvl: 0,
      protocolRevenue: 500000000,
      activeAddresses: 300000,
      mvrvZScore: 0.8,
      volatility60d: 0.04,
      volumeOnChain: 200000000,
      smartContractRisk: 30,
      decentralizationScore: 70,
    },
    roadmapEvents: [
      "Expansão soluções de pagamento cross-border",
      "Possível listagem Ripple ETF",
      "Melhorias de conformidade regulatória"
    ],
    regulatoryRisks: [
      "Litígio com SEC",
      "Regulamentação bancária"
    ],
    performance: {
      btcCorrelation: 0.6,
      bearMarketDrawdown: -78,
    },
    analystConsensus: { buy: 7, hold: 3, sell: 1 },
    projections: { target1Y: 4.5, target3Y: 6, target5Y: 7.5 },
    confidence: 80
  },

  {
    ticker: "ADA",
    name: "Cardano",
    protocolType: "L1",
    sector: "Infraestrutura",
    marketCap: 30350000000,
    currentPrice: 0.85,
    circulatingSupply: 36000000000,
    targetMVRV: 3.2,
    upsideTarget: 2.2,
    score: 83,
    ranking: 5,
    recommendation: "HOLD",
    metrics: {
      tvl: 5000000000,
      protocolRevenue: 150000000,
      activeAddresses: 450000,
      mvrvZScore: 0.6,
      volatility60d: 0.04,
      volumeOnChain: 70000000,
      smartContractRisk: 15,
      decentralizationScore: 90,
    },
    roadmapEvents: [
      "Atualizações para escalabilidade e interoperabilidade",
      "Integração em novas aplicações DeFi e NFT"
    ],
    regulatoryRisks: [
      "Avaliando regulação para PoS",
    ],
    performance: {
      btcCorrelation: 0.7,
      bearMarketDrawdown: -83,
    },
    analystConsensus: { buy: 6, hold: 4, sell: 0 },
    projections: { target1Y: 1.3, target3Y: 1.8, target5Y: 2.2 },
    confidence: 78
  },

  {
    ticker: "LINK",
    name: "Chainlink",
    protocolType: "Oráculos/Infraestrutura",
    sector: "Dados & Serviços",
    marketCap: 12000000000,
    currentPrice: 20,
    circulatingSupply: 580000000,
    targetMVRV: 4.0,
    upsideTarget: 75,
    score: 92,
    ranking: 6,
    recommendation: "STRATEGIC BUY",
    metrics: {
      tvl: 0,
      protocolRevenue: 80000000,
      activeAddresses: 35000,
      mvrvZScore: 0.7,
      volatility60d: 0.04,
      volumeOnChain: 150000000,
      smartContractRisk: 15,
      decentralizationScore: 85,
    },
    roadmapEvents: [
      "Chainlink Staking v3",
      "CCIP (Cross-Chain Interoperability Protocol)",
      "Integração com SWIFT e Real World Assets"
    ],
    regulatoryRisks: [
      "Regulamentação de Oráculos",
      "Classificação como Security"
    ],
    performance: {
      btcCorrelation: 0.65,
      bearMarketDrawdown: -75,
    },
    analystConsensus: { buy: 9, hold: 1, sell: 0 },
    projections: { target1Y: 35, target3Y: 60, target5Y: 75 },
    confidence: 88
  },

  {
    ticker: "AVAX",
    name: "Avalanche",
    protocolType: "L1/DeFi",
    sector: "Infraestrutura",
    marketCap: 12800000000,
    currentPrice: 30.35,
    circulatingSupply: 421000000,
    targetMVRV: 3.3,
    upsideTarget: 85,
    score: 80,
    ranking: 7,
    recommendation: "GROWTH BUY",
    metrics: {
      tvl: 11000000000,
      protocolRevenue: 120000000,
      activeAddresses: 500000,
      mvrvZScore: 0.7,
      volatility60d: 0.05,
      volumeOnChain: 90000000,
      smartContractRisk: 20,
      decentralizationScore: 70,
    },
    roadmapEvents: [
      "Melhorias no consensus",
      "Expansão DeFi e NFT marketplaces"
    ],
    regulatoryRisks: [
      "Concorrência direta com Ethereum"
    ],
    performance: {
      btcCorrelation: 0.72,
      bearMarketDrawdown: -85,
    },
    analystConsensus: { buy: 6, hold: 4, sell: 1 },
    projections: { target1Y: 45, target3Y: 65, target5Y: 85 },
    confidence: 78
  },

  {
    ticker: "MATIC",
    name: "Polygon",
    protocolType: "L2/Infraestrutura",
    sector: "Escalabilidade/DeFi",
    marketCap: 9000000000,
    currentPrice: 1.2,
    circulatingSupply: 7500000000,
    targetMVRV: 3.6,
    upsideTarget: 3.8,
    score: 85,
    ranking: 8,
    recommendation: "CORE BUY",
    metrics: {
      tvl: 6000000000,
      protocolRevenue: 90000000,
      activeAddresses: 800000,
      mvrvZScore: 0.8,
      volatility60d: 0.04,
      volumeOnChain: 120000000,
      smartContractRisk: 12,
      decentralizationScore: 75,
    },
    roadmapEvents: [
      "Expansão dos zk-Rollups e soluções L2",
      "Parcerias no ecossistema Ethereum"
    ],
    regulatoryRisks: ["Regulamentação geral cripto"],
    performance: {
      btcCorrelation: 0.68,
      bearMarketDrawdown: -72,
    },
    analystConsensus: { buy: 8, hold: 2, sell: 0 },
    projections: { target1Y: 2.2, target3Y: 3.1, target5Y: 3.8 },
    confidence: 82
  },

  {
    ticker: "DOGE",
    name: "Dogecoin",
    protocolType: "Memecoin",
    sector: "Moeda Digital / Comunitária",
    marketCap: 38920000000,
    currentPrice: 0.2573,
    circulatingSupply: 130000000000,
    targetMVRV: 2.0,
    upsideTarget: 0.8,
    score: 65,
    ranking: 9,
    recommendation: "SPECULATIVE HOLD",
    metrics: {
      tvl: 0,
      protocolRevenue: 0,
      activeAddresses: 150000,
      mvrvZScore: 0.2,
      volatility60d: 0.08,
      volumeOnChain: 50000000,
      smartContractRisk: 50,
      decentralizationScore: 50,
    },
    roadmapEvents: [
      "Eventos comunitários e colaborações",
      "Atualizações técnicas limitadas"
    ],
    regulatoryRisks: ["Avaliação regulatória indefinida para memecoins"],
    performance: {
      btcCorrelation: 0.5,
      bearMarketDrawdown: -90,
    },
    analystConsensus: { buy: 3, hold: 7, sell: 5 },
    projections: { target1Y: 0.4, target3Y: 0.6, target5Y: 0.8 },
    confidence: 55
  },

  // ==================== LAYER 2 & SCALING ====================
  {
    ticker: "ARB",
    name: "Arbitrum",
    protocolType: "L2/Rollup",
    sector: "Escalabilidade Ethereum",
    marketCap: 12500000000, // US$ 12.5B - Valor ilustrativo
    currentPrice: 1.05, // US$ - Valor ilustrativo
    circulatingSupply: 12000000000, // Unidades aproximadas
    targetMVRV: 3.5,
    upsideTarget: 3.5,
    score: 86,
    ranking: 10,
    recommendation: "GROWTH BUY",
    metrics: {
      tvl: 15000000000,
      protocolRevenue: 50000000,
      activeAddresses: 400000,
      mvrvZScore: 0.65,
      volatility60d: 0.06,
      volumeOnChain: 800000000,
      smartContractRisk: 18,
      decentralizationScore: 70,
    },
    roadmapEvents: [
      "Arbitrum Orbit: Expansão de L3s e customização",
      "Governança avançada e financiamento de projetos via DAO",
      "Staking para sequenciadores e aprimoramentos de segurança"
    ],
    regulatoryRisks: [
      "Regulamentação específica para Layer 2",
      "Dependência regulatória do Ethereum"
    ],
    performance: {
      btcCorrelation: 0.75,
      bearMarketDrawdown: -82,
    },
    analystConsensus: { buy: 8, hold: 3, sell: 1 },
    projections: { target1Y: 2.0, target3Y: 2.8, target5Y: 3.5 },
    confidence: 80
  },

  {
    ticker: "OP",
    name: "Optimism",
    protocolType: "L2/Rollup",
    sector: "Escalabilidade Ethereum",
    marketCap: 9800000000, // US$ 9.8B - Valor ilustrativo
    currentPrice: 2.80, // US$ - Valor ilustrativo
    circulatingSupply: 3500000000, // Unidades aproximadas
    targetMVRV: 4.0,
    upsideTarget: 8.5,
    score: 84,
    ranking: 11,
    recommendation: "GROWTH BUY",
    metrics: {
      tvl: 6000000000,
      protocolRevenue: 45000000,
      activeAddresses: 350000,
      mvrvZScore: 0.6,
      volatility60d: 0.055,
      volumeOnChain: 600000000,
      smartContractRisk: 16,
      decentralizationScore: 72,
    },
    roadmapEvents: [
      "Superchain: Interoperabilidade entre chains OP",
      "Fault proofs descentralizados (Stage 2 decentralization)",
      "Expansão do ecossistema Superchain com novas chains"
    ],
    regulatoryRisks: [
      "Regulamentação de redes superpostas",
      "Concorrência acirrada com outros L2s"
    ],
    performance: {
      btcCorrelation: 0.78,
      bearMarketDrawdown: -85,
    },
    analystConsensus: { buy: 7, hold: 4, sell: 1 },
    projections: { target1Y: 4.5, target3Y: 6.5, target5Y: 8.5 },
    confidence: 78
  },

  // ==================== WEB3 INFRASTRUCTURE ====================
  {
    ticker: "ENS",
    name: "Ethereum Name Service",
    protocolType: "Web3/Identity",
    sector: "Identidade Digital & Domínios",
    marketCap: 850000000, // US$ 850M - Valor ilustrativo
    currentPrice: 22.50, // US$ - Valor ilustrativo
    circulatingSupply: 38000000, // Unidades aproximadas
    targetMVRV: 5.0,
    upsideTarget: 85,
    score: 82,
    ranking: 12,
    recommendation: "STRATEGIC BUY",
    metrics: {
      tvl: 0,
      protocolRevenue: 25000000,
      activeAddresses: 50000,
      mvrvZScore: 0.5,
      volatility60d: 0.065,
      volumeOnChain: 50000000,
      smartContractRisk: 25,
      decentralizationScore: 88,
    },
    roadmapEvents: [
      "Expansão para multi-chain (L2s e outras EVMs)",
      "Integração com navegadores e aplicativos mainstream",
      "Novos TLDs (Top-Level Domains) e serviços de subdomínios"
    ],
    regulatoryRisks: [
      "Regulamentação de identidade digital",
      "Conflitos com sistemas de nomes tradicionais (DNS)"
    ],
    performance: {
      btcCorrelation: 0.6,
      bearMarketDrawdown: -80,
    },
    analystConsensus: { buy: 6, hold: 5, sell: 2 },
    projections: { target1Y: 40, target3Y: 65, target5Y: 85 },
    confidence: 75
  },

  // ==================== LAYER 1 ALTERNATIVES ====================
  {
    ticker: "ALGO",
    name: "Algorand",
    protocolType: "L1/DeFi",
    sector: "Infraestrutura Escalável",
    marketCap: 2200000000, // US$ 2.2B - Valor ilustrativo
    currentPrice: 0.28, // US$ - Valor ilustrativo
    circulatingSupply: 7800000000, // Unidades aproximadas
    targetMVRV: 4.5,
    upsideTarget: 1.8,
    score: 79,
    ranking: 13,
    recommendation: "HOLD",
    metrics: {
      tvl: 1200000000,
      protocolRevenue: 15000000,
      activeAddresses: 180000,
      mvrvZScore: 0.4,
      volatility60d: 0.07,
      volumeOnChain: 80000000,
      smartContractRisk: 22,
      decentralizationScore: 75,
    },
    roadmapEvents: [
      "Algorand 2.0: Melhorias de performance e governança",
      "Foco em RWA (Real World Assets) tokenization",
      "Parcerias institucionais em finanças tradicionais"
    ],
    regulatoryRisks: [
      "Concorrência com L1s estabelecidos",
      "Adoção limitada do ecossistema DeFi"
    ],
    performance: {
      btcCorrelation: 0.65,
      bearMarketDrawdown: -90,
    },
    analystConsensus: { buy: 5, hold: 6, sell: 3 },
    projections: { target1Y: 0.6, target3Y: 1.2, target5Y: 1.8 },
    confidence: 70
  },

  {
    ticker: "DOT",
    name: "Polkadot",
    protocolType: "L1/Interoperabilidade",
    sector: "Infraestrutura Multi-Chain",
    marketCap: 11500000000, // US$ 11.5B - Valor ilustrativo
    currentPrice: 8.90, // US$ - Valor ilustrativo
    circulatingSupply: 1300000000, // Unidades aproximadas
    targetMVRV: 3.8,
    upsideTarget: 35,
    score: 81,
    ranking: 14,
    recommendation: "STRATEGIC BUY",
    metrics: {
      tvl: 3000000000,
      protocolRevenue: 60000000,
      activeAddresses: 220000,
      mvrvZScore: 0.55,
      volatility60d: 0.055,
      volumeOnChain: 250000000,
      smartContractRisk: 20,
      decentralizationScore: 85,
    },
    roadmapEvents: [
      "Polkadot 2.0: Agile Coretime e Elastic Scaling",
      "Expansão de parachains e ecossistema cross-chain",
      "Governança simplificada e mais acessível"
    ],
    regulatoryRisks: [
      "Complexidade técnica como barreira de adoção",
      "Regulamentação de redes complexas multi-chain"
    ],
    performance: {
      btcCorrelation: 0.72,
      bearMarketDrawdown: -83,
    },
    analystConsensus: { buy: 7, hold: 5, sell: 2 },
    projections: { target1Y: 15, target3Y: 25, target5Y: 35 },
    confidence: 77
  },

  {
    ticker: "ATOM",
    name: "Cosmos",
    protocolType: "L1/Interoperabilidade",
    sector: "Internet of Blockchains",
    marketCap: 6800000000, // US$ 6.8B - Valor ilustrativo
    currentPrice: 9.20, // US$ - Valor ilustrativo
    circulatingSupply: 740000000, // Unidades aproximadas
    targetMVRV: 4.2,
    upsideTarget: 45,
    score: 83,
    ranking: 15,
    recommendation: "GROWTH BUY",
    metrics: {
      tvl: 5000000000,
      protocolRevenue: 40000000,
      activeAddresses: 190000,
      mvrvZScore: 0.58,
      volatility60d: 0.06,
      volumeOnChain: 180000000,
      smartContractRisk: 18,
      decentralizationScore: 88,
    },
    roadmapEvents: [
      "Interchain Security: Compartilhamento de segurança entre chains",
      "Expansão do IBC (Inter-Blockchain Communication)",
      "Cosmos Hub: Novas funcionalidades e utilities"
    ],
    regulatoryRisks: [
      "Fragmentação do ecossistema entre zonas independentes",
      "Governança complexa entre múltiplas chains"
    ],
    performance: {
      btcCorrelation: 0.68,
      bearMarketDrawdown: -81,
    },
    analystConsensus: { buy: 8, hold: 4, sell: 1 },
    projections: { target1Y: 18, target3Y: 32, target5Y: 45 },
    confidence: 79
  },

  // ==================== FINANCIAL & PAYMENTS ====================
  {
    ticker: "XCN",
    name: "Chain",
    protocolType: "Infraestrutura/Financeiro",
    sector: "Serviços Financeiros Blockchain",
    marketCap: 350000000, // US$ 350M - Valor ilustrativo
    currentPrice: 0.035, // US$ - Valor ilustrativo
    circulatingSupply: 10000000000, // Unidades aproximadas
    targetMVRV: 6.0,
    upsideTarget: 0.25,
    score: 68,
    ranking: 16,
    recommendation: "SPECULATIVE BUY",
    metrics: {
      tvl: 0,
      protocolRevenue: 8000000,
      activeAddresses: 25000,
      mvrvZScore: 0.3,
      volatility60d: 0.09,
      volumeOnChain: 15000000,
      smartContractRisk: 35,
      decentralizationScore: 60,
    },
    roadmapEvents: [
      "Expansão de Sequence: infraestrutura Web3 para empresas",
      "Parcerias com instituições financeiras tradicionais",
      "Novos produtos para tokenização de ativos"
    ],
    regulatoryRisks: [
      "Alta competição no setor de infraestrutura financeira",
      "Regulamentação de serviços financeiros blockchain"
    ],
    performance: {
      btcCorrelation: 0.55,
      bearMarketDrawdown: -88,
    },
    analystConsensus: { buy: 4, hold: 7, sell: 4 },
    projections: { target1Y: 0.08, target3Y: 0.16, target5Y: 0.25 },
    confidence: 60
  },

  {
    ticker: "TON",
    name: "Toncoin",
    protocolType: "L1/Pagamentos",
    sector: "Pagamentos & Serviços Web3",
    marketCap: 18500000000, // US$ 18.5B - Valor ilustrativo
    currentPrice: 5.20, // US$ - Valor ilustrativo
    circulatingSupply: 3550000000, // Unidades aproximadas
    targetMVRV: 4.8,
    upsideTarget: 22,
    score: 87,
    ranking: 17,
    recommendation: "GROWTH BUY",
    metrics: {
      tvl: 800000000,
      protocolRevenue: 75000000,
      activeAddresses: 550000,
      mvrvZScore: 0.8,
      volatility60d: 0.05,
      volumeOnChain: 400000000,
      smartContractRisk: 28,
      decentralizationScore: 65,
    },
    roadmapEvents: [
      "Integração profunda com Telegram (900M+ usuários)",
      "TON Payments: micropagamentos em-chat",
      "Expansão do ecossistema DeFi e NFTs no TON"
    ],
    regulatoryRisks: [
      "Risco regulatório por associação com Telegram",
      "Regulamentação de pagamentos P2P globais"
    ],
    performance: {
      btcCorrelation: 0.62,
      bearMarketDrawdown: -78,
    },
    analystConsensus: { buy: 9, hold: 3, sell: 1 },
    projections: { target1Y: 9, target3Y: 16, target5Y: 22 },
    confidence: 82
  },

  // ==================== NICHO & MEME COINS ====================
  {
    ticker: "FLOKI",
    name: "Floki Inu",
    protocolType: "Memecoin/Ecossistema",
    sector: "Comunitário & Utilidade",
    marketCap: 1200000000, // US$ 1.2B - Valor ilustrativo
    currentPrice: 0.00012, // US$ - Valor ilustrativo
    circulatingSupply: 10000000000000, // Unidades aproximadas
    targetMVRV: 3.0,
    upsideTarget: 0.00045,
    score: 62,
    ranking: 18,
    recommendation: "SPECULATIVE HOLD",
    metrics: {
      tvl: 150000000,
      protocolRevenue: 5000000,
      activeAddresses: 80000,
      mvrvZScore: 0.25,
      volatility60d: 0.12,
      volumeOnChain: 30000000,
      smartContractRisk: 45,
      decentralizationScore: 55,
    },
    roadmapEvents: [
      "Expansão do metaverso Valhalla e jogos P2E",
      "Novos produtos DeFi no ecossistema Floki",
      "Parcerias de marketing e adoção comercial"
    ],
    regulatoryRisks: [
      "Alta volatilidade típica de memecoins",
      "Regulamentação crescente sobre tokens utilitários"
    ],
    performance: {
      btcCorrelation: 0.45,
      bearMarketDrawdown: -92,
    },
    analystConsensus: { buy: 3, hold: 8, sell: 6 },
    projections: { target1Y: 0.00022, target3Y: 0.00035, target5Y: 0.00045 },
    confidence: 55
  },

  {
    ticker: "OVL",
    name: "Overlay",
    protocolType: "DeFi/Derivativos",
    sector: "Protocolos de Trading",
    marketCap: 95000000, // US$ 95M - Valor ilustrativo
    currentPrice: 0.85, // US$ - Valor ilustrativo
    circulatingSupply: 110000000, // Unidades aproximadas
    targetMVRV: 7.0,
    upsideTarget: 8.5,
    score: 71,
    ranking: 19,
    recommendation: "HIGH RISK BUY",
    metrics: {
      tvl: 80000000,
      protocolRevenue: 2000000,
      activeAddresses: 12000,
      mvrvZScore: 0.35,
      volatility60d: 0.15,
      volumeOnChain: 8000000,
      smartContractRisk: 60,
      decentralizationScore: 80,
    },
    roadmapEvents: [
      "Novos mercados de dados para trading",
      "Integração com múltiplas blockchains",
      "Melhorias no mecanismo de sintetização de ativos"
    ],
    regulatoryRisks: [
      "Regulamentação de derivados descentralizados",
      "Riscos de smart contracts complexos"
    ],
    performance: {
      btcCorrelation: 0.4,
      bearMarketDrawdown: -89,
    },
    analystConsensus: { buy: 2, hold: 5, sell: 3 },
    projections: { target1Y: 2.5, target3Y: 5.5, target5Y: 8.5 },
    confidence: 65
  }
];

// Export para uso em outros módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CRYPTO_DATABASE };
}