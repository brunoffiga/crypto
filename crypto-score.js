// ============================================
// CRYPTO-CONFIDENCE.JS - Protocol Risk Model
// Confiabilidade de Projeção para Criptoativos
// ============================================

/**
 * Funções auxiliares para buscar dados aninhados (simulação)
 */
function getNestedProperty(asset, path) {
    if (path === 'tvl') return asset.metrics?.tvl;
    if (path === 'marketCap') return asset.metrics?.marketCap;
    if (path === 'protocolRevenue') return asset.metrics?.protocolRevenue;
    if (path === 'activeAddresses') return asset.metrics?.activeAddresses;
    // Simula MVRV Z-Score (normalmente entre -1.5 e 7)
    if (path === 'mvrvZScore') return asset.metrics?.mvrvZScore; 
    // Simula Risco de Contrato (0=Baixo, 100=Alto)
    if (path === 'smartContractRisk') return asset.metrics?.smartContractRisk;
    // Simula Score de Descentralização (0=Centralizado, 100=Descentralizado)
    if (path === 'decentralizationScore') return asset.metrics?.decentralizationScore;
    if (path === 'performanceBear') return asset.performance?.bearMarketDrawdown;
    return asset[path];
}

/**
 * Calcula confiabilidade geral das projeções (Crypto)
 * @param {object} asset - O objeto de dados do criptoativo.
 */
function calculateCryptoConfidence(asset) {
    let confidenceScore = 50; // Base neutra

    // 1. CONFIANÇA INSTITUCIONAL (Peso: 25%)
    const institutionalScore = calculateInstitutionalConfidence(asset);
    confidenceScore += institutionalScore * 0.25;

    // 2. QUALIDADE DO PROTOCOLO (Peso: 20%)
    const protocolQualityScore = calculateProtocolQualityScore(asset);
    confidenceScore += protocolQualityScore * 0.20;

    // 3. SEGURANÇA E CENTRALIZAÇÃO (Peso: 20%)
    const securityScore = calculateSecurityDecentralizationScore(asset);
    confidenceScore += securityScore * 0.20;

    // 4. PERFORMANCE HISTÓRICA (Peso: 20%)
    const historyScore = calculateHistoryScore(asset);
    confidenceScore += historyScore * 0.20;

    // 5. LIQUIDEZ E ADOÇÃO (Peso: 15%)
    const liquidityScore = calculateLiquidityAdoptionScore(asset);
    confidenceScore += liquidityScore * 0.15;

    // Normaliza entre 0-100
    return Math.max(0, Math.min(100, confidenceScore));
}

// ============================================
// Fatores de Confiabilidade
// ============================================

/**
 * 1. Score baseado em MVRV Z-Score (Ciclicidade)
 */
function calculateInstitutionalConfidence(asset) {
    const mvrvZScore = getNestedProperty(asset, 'mvrvZScore') || 0; // Ex: 1.5 a -1.5

    // Z-Score alto (>2) indica TOPO de ciclo (baixa confiança no upside)
    if (mvrvZScore > 2) return -20;
    // Z-Score negativo (abaixo de -1) indica FUNDO (alta confiança no upside)
    if (mvrvZScore < -1) return 30;
    // Z-Score entre 0 e 1 (neutro)
    if (mvrvZScore < 1) return 10;
    
    return 0;
}

/**
 * 2. Score baseado em TVL e Receita (Analogia ROE e P/L)
 */
function calculateProtocolQualityScore(asset) {
    const tvl = getNestedProperty(asset, 'tvl') || 1;
    const marketCap = getNestedProperty(asset, 'marketCap') || 1;
    const revenue = getNestedProperty(asset, 'protocolRevenue') || 0;
    
    // TVL/MC Ratio: > 1.0 é muito bom (50pts)
    const tvlMcRatio = tvl / marketCap;
    let score = 0;
    
    if (tvlMcRatio > 2.0) score += 30;
    else if (tvlMcRatio > 1.0) score += 20;
    else if (tvlMcRatio > 0.5) score += 10;
    else score -= 10;

    // Protocol Revenue (em milhões): Recompensa geração de caixa
    if (revenue > 100) score += 20; // > $100M em receita anual
    else if (revenue > 20) score += 10;
    
    return score;
}

/**
 * 3. Score baseado em Smart Contract Risk e Centralização
 */
function calculateSecurityDecentralizationScore(asset) {
    const risk = getNestedProperty(asset, 'smartContractRisk') || 50; // 0=Baixo, 100=Alto
    const decentralization = getNestedProperty(asset, 'decentralizationScore') || 50; // 0=Centralizado, 100=Descentralizado
    
    let score = 0;
    
    // Smart Contract Risk: Risco alto (acima de 70) penaliza severamente
    if (risk > 70) score -= 30;
    else if (risk < 30) score += 20;
    
    // Descentralização: Projetos descentralizados (acima de 70) são mais confiáveis
    if (decentralization > 70) score += 20;
    else if (decentralization < 30) score -= 10;
    
    return score;
}

function calculateSmartContractRiskScore(asset) {
    const smartContractRisk = getNestedProperty(asset, 'smartContractRisk') || 50;
    const hasAudit = asset.metrics?.hasMajorAudit || false; // Novo campo booleano

    let score = 0;

    // Regra 1: Penalidade baseada no risco relatado (0 a 100)
    score -= smartContractRisk * 0.3; // Risco de 70 = -21 pontos

    // Regra 2: Penalidade por falta de auditoria (Fator Binário)
    if (smartContractRisk > 30 && !hasAudit) {
        score -= 40; // Penalidade forte para protocolos não auditados e com risco moderado/alto
    } else if (smartContractRisk <= 30 && hasAudit) {
        score += 15; // Bônus para protocolos de baixo risco e auditados
    }

    return score;
}

/**
 * 4. Score baseado em correlação e resiliência
 */
function calculateHistoryScore(asset) {
    const correlation = asset.performance?.btcCorrelation || 0.5; // Ex: 0.8
    const drawdown = getNestedProperty(asset, 'performanceBear') || -90; // Ex: -60%
    
    let score = 0;
    
    // Correlação com BTC: Corelação muito baixa (<0.3) é um risco (falta de liquidez/novidade)
    if (correlation < 0.3) score -= 10;
    // Correlação muito alta (>0.9) também é risco (não tem tese própria)
    if (correlation > 0.9) score -= 5;
    
    // Resiliência no Bear Market: Drawdown menor é melhor
    if (drawdown > -50) score += 30; // Drawdown < 50% é excelente
    else if (drawdown > -75) score += 10;
    else if (drawdown < -90) score -= 20; // Queda de 90%+ indica falha quase total
    
    return score;
}

/**
 * 5. Score baseado em Endereços Ativos
 */
function calculateLiquidityAdoptionScore(asset) {
    const activeAddresses = getNestedProperty(asset, 'activeAddresses') || 10000; // Ex: 500k
    const marketCap = getNestedProperty(asset, 'marketCap') || 1;
    
    // Escala de Adoção: Normaliza endereços pelo Market Cap (Endereços/Milhões de MC)
    const ratio = activeAddresses / (marketCap / 1000000); 
    let score = 0;
    
    if (ratio > 100) score += 20; // 100k endereços por $1B MC
    else if (ratio > 50) score += 10;
    else if (ratio < 10) score -= 10;
    
    // Volume On-Chain (Simulação de liquidez real)
    const volumeOnChain = asset.metrics?.volumeOnChain || 0;
    if (volumeOnChain > 50000000) score += 10; // > $50M em volume diário
    
    return score;
}

// ============================================
// Funções de Decaimento (Mantidas para consistência)
// ============================================

/**
 * Calcula confiabilidade específica por horizonte de tempo (Decaimento Logarítmico)
 * A confiança decai mais rápido em Crypto do que em Ações.
 */
function calculateHorizonConfidence(baseConfidence, years) {
    if (years <= 1) return baseConfidence;
    
    // Fator de ajuste 'k' mais agressivo (0.6) para refletir a alta velocidade do Crypto
    const k = 0.6; 
    const logDecayFactor = 1 / (1 + k * Math.log(years)); 
    
    return Math.max(0, Math.min(100, baseConfidence * logDecayFactor));
}

// ============================================
// Funções de Relatório
// ============================================

function getConfidenceDescription(confidence) {
    if (confidence >= 85) return 'Muito Alta (Sólido)';
    if (confidence >= 70) return 'Alta (Protocolo Maduro)';
    if (confidence >= 55) return 'Moderada (Aposta em Risco)';
    if (confidence >= 40) return 'Baixa (Especulativo)';
    return 'Muito Baixa (Alto Risco)';
}

function getConfidenceIcon(confidence) {
    if (confidence >= 85) return '✅';
    if (confidence >= 70) return '🟢';
    if (confidence >= 55) return '🟡';
    return '🔴';
}

/**
 * Gera relatório detalhado de confiabilidade
 */
function generateConfidenceReport(asset) {
    const baseConfidence = calculateCryptoConfidence(asset);
    
    return {
        overall: baseConfidence,
        description: getConfidenceDescription(baseConfidence),
        icon: getConfidenceIcon(baseConfidence),
        byHorizon: {
            oneYear: calculateHorizonConfidence(baseConfidence, 1),
            threeYears: calculateHorizonConfidence(baseConfidence, 3),
            fiveYears: calculateHorizonConfidence(baseConfidence, 5),
        },
        factors: {
            institutional: calculateInstitutionalConfidence(asset),
            protocolQuality: calculateProtocolQualityScore(asset),
            security: calculateSecurityDecentralizationScore(asset),
            history: calculateHistoryScore(asset),
            liquidity: calculateLiquidityAdoptionScore(asset)
        }
    };
}