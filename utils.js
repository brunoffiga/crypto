// ============================================
// UTILS.JS - Gemini Crypto Engine (GCE)
// Funções Auxiliares Centralizadas e Adaptadas para Crypto
// ============================================

/**
 * Obtém valor de propriedade aninhada.
 * Adaptada para acessar métricas Crypto (TVL, MVRV, etc.).
 */
function getNestedProperty(obj, path) {
    if (!obj) return null;
    
    // Mapeamento de métricas Crypto
    const cryptoMetrics = [
        'tvl', 'protocolRevenue', 'activeAddresses', 'mvrvZScore', 
        'volatility60d', 'volumeOnChain', 'smartContractRisk', 
        'decentralizationScore', 'btcCorrelation'
    ];
    
    if (path.startsWith('metrics.')) {
        const metric = path.replace('metrics.', '');
        if (cryptoMetrics.includes(metric)) {
            return obj.metrics ? obj.metrics[metric] : null;
        }
    }
    
    // Projeções (target1Y, target3Y, target5Y)
    if (path.startsWith('projections.target')) {
        return obj.projections ? obj.projections[path.replace('projections.', '')] : null;
    }

    // Performance (para performance.bearMarketDrawdown)
    if (path.startsWith('performance.')) {
        return obj.performance ? obj.performance[path.replace('performance.', '')] : null;
    }

    if (path === 'confidence') {
        return obj.confidence || null;
    }
    
    return obj[path] || null;
}

/**
 * Calcula o Upside dado um Preço Alvo e o Preço Atual.
 */
function calculateUpside(currentPrice, targetPrice) {
    if (!currentPrice || !targetPrice) return null;
    return ((targetPrice - currentPrice) / currentPrice) * 100;
}

/**
 * Formata valores grandes (TVL, Market Cap) em $ B/M/T.
 */
function formatCryptoValue(value) {
    if (value === null || value === undefined) return '-';
    
    // Se for BTC (com MarketCap muito grande)
    if (value >= 1e12) {
        return `$ ${(value / 1e12).toFixed(2)}T`;
    }
    // Bilhões
    if (value >= 1e9) {
        return `$ ${(value / 1e9).toFixed(2)}B`;
    }
    // Milhões
    if (value >= 1e6) {
        return `$ ${(value / 1e6).toFixed(2)}M`;
    } 
    // Outros (ex: Revenue pequeno)
    return `$ ${value.toFixed(2)}`;
}

/**
 * Formata preço (Current Price, Target Price).
 */
function formatPrice(value) {
    if (value === null || value === undefined) return '-';
    // Remove o símbolo $ para que a tabela HTML possa adicionar, se necessário.
    return value.toFixed(4).replace(/\.?0+$/, ''); // Remove zeros insignificantes (ex: 2.9900 -> 2.99)
}

/**
 * Formata número como porcentagem.
 */
function formatPercentage(value, decimals = 1) {
    if (value === null || value === undefined) return '-';
    return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

/**
 * Classifica GCE Score (0-100) para cores.
 */
function getScoreClass(score) {
    if (score >= 90) return 'score-excellent'; // BTC, ETH (Líderes)
    if (score >= 80) return 'score-good';      // SOL, LINK, L2s (Alta Qualidade/Crescimento)
    if (score >= 70) return 'score-fair';      // Utility/Altcoins Promissoras (Risco Aceitável)
    if (score >= 55) return 'score-poor';      // Especulativas (DOGE, FLOKI)
    return 'score-low';
}

/**
 * Calcula o Risk Score, adaptado do modelo anterior.
 * Em crypto, o foco é o Smart Contract e a Volatilidade.
 */
function calculateRiskScore(asset) {
    let riskScore = 0;
    
    // 1. Smart Contract Risk (Pior Risco em Crypto)
    const scRisk = getNestedProperty(asset, 'metrics.smartContractRisk') || 30;
    riskScore += scRisk * 0.5; // Peso forte no risco de código
    
    // 2. Volatilidade (Gamma, mas é risco no eixo X da matriz)
    const vol = getNestedProperty(asset, 'metrics.volatility60d') || 0.05;
    riskScore += Math.min(vol * 1500, 30); // Volatilidade de 5% (0.05) = 7.5 pontos
    
    // 3. Score de Descentralização (Quanto menor a descentralização, maior o risco)
    const decentralization = getNestedProperty(asset, 'metrics.decentralizationScore') || 50;
    riskScore += (100 - decentralization) * 0.3; // Descentralização de 50 = 15 pontos
    
    return Math.min(riskScore, 100);
}

/**
 * Mapeia valor de um range para outro.
 */
function mapValue(value, minInput, maxInput, minOutput, maxOutput) {
    // Evita divisão por zero ou ranges inválidos
    if (maxInput === minInput) return minOutput;
    
    // Clamping para garantir que o valor não saia do range de entrada
    const clampedValue = Math.max(minInput, Math.min(maxInput, value));
    
    return minOutput + (maxOutput - minOutput) * ((clampedValue - minInput) / (maxInput - minInput));
}


// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getNestedProperty,
        calculateUpside,
        formatCryptoValue,
        formatPrice,
        formatPercentage,
        getScoreClass,
        calculateRiskScore,
        mapValue,
        // Adicione outras funções essenciais aqui, como createGradient, debounce, etc., se forem usadas nos outros arquivos
        // Exemplo:
        // createGradient,
        // debounce,
    };
}