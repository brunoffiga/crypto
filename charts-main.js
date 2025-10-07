// ============================================
// CHARTS-MAIN-CRYPTO.JS - Visualization Engine (GCE)
// Dashboards e gráficos interativos com Chart.js, focados em Métricas On-Chain
// ============================================

let companiesData = [];
let charts = {};

// Função auxiliar (necessária para resolver a referência cruzada)
function getTargetPrice(company, horizon) {
    const target = company.projections ? company.projections[`target${horizon}`] : null;
    if (!target && horizon === '5Y' && company.upsideTarget) {
         return company.upsideTarget;
    }
    return target;
}
function calculateUpside(currentPrice, targetPrice) {
    if (!currentPrice || !targetPrice) return null;
    return ((targetPrice - currentPrice) / currentPrice) * 100;
}


// ============================
// Initialization
// ============================
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeModalHandling();
    // Renomeado para evitar conflito, mas mantém o mesmo objetivo
    createAllCryptoCharts(); 
    initializeRiskMatrix();
});

function loadData() {
    // Agora carregamos a base de dados de CRYPTO
    companiesData = CRYPTO_DATABASE || [];
    
    // Processamento de dados Crypto (calcula Upside 1Y para uso nos gráficos)
    companiesData = companiesData.map(c => {
        const target1Y = getTargetPrice(c, '1Y');
        c.upside = calculateUpside(c.currentPrice, target1Y); // Adiciona 'upside' como campo top-level
        return c;
    });

    console.log(`✅ ${companiesData.length} criptoativos carregados para visualização`);
}

function createAllCryptoCharts() {
    createScoreDistribution();
    createSectorDistribution();
    createValuationMatrix(); // TVL/MC vs Protocol Revenue
    createGrowthValueChart(); // Upside vs GCE Score
    createPerformanceChart(); // Top 7 Performance YTD (Simulada)
    createWorstPerformanceChart(); // Piores 7 (Drawdown Bear Market)
    createMarketCapChart();
    createRecommendationChart();
}

// ============================
// LÓGICA DO MODAL (REUTILIZÁVEL)
// [Assumindo que showModal, initializeModalHandling e closeBtn existem no HTML]
// ============================
function showModal(title, companies) {
    const modal = document.getElementById('dataModal');
    const modalTitle = document.getElementById('modalTitle');
    const list = document.getElementById('modalCompanyList');

    modalTitle.textContent = title;
    list.innerHTML = ''; 

    if (companies.length === 0) {
        list.innerHTML = '<li>Nenhum protocolo encontrado nesta categoria.</li>';
    } else {
        // Ordena por Score
        companies.sort((a, b) => (b.score || 0) - (a.score || 0)).forEach(company => {
            const ups = company.upside !== undefined ? `↑ ${company.upside.toFixed(1)}%` : '';
            li = document.createElement('li');
            li.innerHTML = `<strong>${company.ticker}, ${company.score ?? 'N/A'}</strong>${ups}`;
            list.appendChild(li);
        });
    }

    modal.style.display = 'block';
}

function initializeModalHandling() {
    const modal = document.getElementById('dataModal');
    // Adiciona listener para fechar o modal
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.onclick = function() { modal.style.display = 'none'; };
    }
    window.onclick = function(event) {
        if (event.target == modal) { modal.style.display = 'none'; }
    }
}


// ============================
// 1. GCE Score Distribution
// ============================
function createScoreDistribution() {
    const ctx = document.getElementById('score-distribution-chart').getContext('2d');
    
    // Buckets adaptados para a nomenclatura Crypto (Qualidade de Protocolo)
    const buckets = {
        '90-100 (Core)': 0,
        '80-89 (Growth)': 0,
        '70-79 (Strategic)': 0,
        '50-69 (Speculative)': 0
    };
    
    companiesData.forEach(company => {
        const score = company.score;
        if (score >= 90) buckets['90-100 (Core)']++;
        else if (score >= 80) buckets['80-89 (Growth)']++;
        else if (score >= 70) buckets['70-79 (Strategic)']++;
        else if (score >= 50) buckets['50-69 (Speculative)']++;
    });
    
    charts.scoreDistribution = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(buckets),
            datasets: [{
                label: 'Número de Protocolos',
                data: Object.values(buckets),
                backgroundColor: [
                    '#10b981', // Verde
                    '#3b82f6', // Azul
                    '#f59e0b', // Amarelo
                    '#ef4444', // Vermelho
                ],
                borderColor: '#1f2937',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
            },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } },
                x: { ticks: { color: '#e5e7eb' } }
            },
            onClick: (e) => {
                const activePoints = charts.scoreDistribution.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
                if (activePoints.length > 0) {
                    const firstPoint = activePoints[0];
                    const label = charts.scoreDistribution.data.labels[firstPoint.index];
                    const [minStr, maxStr] = label.split(' ')[0].split('-');
                    const min = parseInt(minStr);
                    const max = parseInt(maxStr);
                    
                    const filteredCompanies = companiesData.filter(c => c.score >= min && c.score <= max);
                    showModal(`Score entre ${min} e ${max}`, filteredCompanies);
                }
            }
        }
    });
}

// ============================
// 2. Protocol Type Distribution (Setor)
// ============================
function createSectorDistribution() {
    const ctx = document.getElementById('sector-distribution-chart').getContext('2d');
    
    // Mapeia por protocolType (L1, L2/Rollup, Oráculos/Utility, Memecoin)
    const typeCounts = {};
    companiesData.forEach(company => {
        // Simplifica a categorização para o gráfico
        let type = company.protocolType.includes('L2') ? 'L2/Rollup' : 
                   company.protocolType.includes('L1') ? 'L1/Base Layer' :
                   company.protocolType.includes('Oráculos') ? 'Utility/Oráculos' :
                   company.protocolType.includes('Memecoin') ? 'Memecoin/Nicho' : 'Outros';

        typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    const sortedTypes = Object.entries(typeCounts)
        .sort((a, b) => b[1] - a[1]);
    
    const colors = [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
        '#8b5cf6', '#ec4899', '#14b8a6', '#6366f1'
    ];
    
    charts.sectorDistribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sortedTypes.map(s => s[0]),
            datasets: [{
                data: sortedTypes.map(s => s[1]),
                backgroundColor: colors,
                borderColor: '#1f2937',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'right', labels: { color: '#e5e7eb' } },
                tooltip: { callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }}
            },
            onClick: (e) => {
                const activePoints = charts.sectorDistribution.getElementsAtEventForMode(e, 'point', { intersect: true }, true);
                if (activePoints.length > 0) {
                    const firstPoint = activePoints[0];
                    const type = charts.sectorDistribution.data.labels[firstPoint.index];
                    
                    const filteredCompanies = companiesData.filter(c => 
                        (type === 'L2/Rollup' && c.protocolType.includes('L2')) ||
                        (type === 'L1/Base Layer' && c.protocolType.includes('L1') && !c.protocolType.includes('L2')) ||
                        (type === 'Utility/Oráculos' && c.protocolType.includes('Oráculos')) ||
                        (type === 'Memecoin/Nicho' && c.protocolType.includes('Memecoin')) ||
                        (type === 'Outros' && !c.protocolType.includes('L1') && !c.protocolType.includes('L2') && !c.protocolType.includes('Oráculos') && !c.protocolType.includes('Memecoin'))
                    );
                    showModal(`${type}`, filteredCompanies);
                }
            }
        }
    });
}


// ============================
// 3. Valuation Matrix (TVL/MC vs Protocol Revenue)
// Substitui ROE vs P/L
// ============================
function createValuationMatrix() {
    const ctx = document.getElementById('valuation-matrix-chart').getContext('2d');
    
    // Acessa TVL, MC e ProtocolRevenue
    const data = companiesData
        .filter(c => (c.metrics.tvl > 0 || c.metrics.protocolRevenue > 0) && c.marketCap > 0)
        .map(company => {
            const tvlMcRatio = (company.metrics.tvl || 0) / (company.marketCap || 1);
            const revenueNormalised = (company.metrics.protocolRevenue || 0) / 1000000; // Milhões
            
            return {
                x: revenueNormalised,
                y: tvlMcRatio,
                r: Math.sqrt((company.marketCap || 1) / 1000000000) * 5, // Tamanho pela raiz do Market Cap (Bilhão)
                label: company.ticker
            };
        });
    
    charts.valuationMatrix = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Protocolos',
                data: data,
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: '#3b82f6',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: {
                    label: function(context) {
                        const point = context.raw;
                        return [
                            `Ticker: ${point.label}`,
                            `Revenue Anual (M$): $${point.x.toFixed(1)}M`,
                            `TVL/MC Ratio: ${point.y.toFixed(2)}x`
                        ];
                    }
                }}
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Protocol Revenue Anual (M$ - geração de Fees)',
                        color: '#e5e7eb'
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#e5e7eb' }
                },
                y: {
                    title: {
                        display: true,
                        text: 'TVL / Market Cap Ratio (Quanto > 1, mais "barato" em TVL)',
                        color: '#e5e7eb'
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#e5e7eb' }
                }
            }
        }
    });
}


// ============================
// 4. Growth vs Value (Upside vs GCE Score)
// Mantém a lógica, mas com novo score
// ============================
function createGrowthValueChart() {
    const ctx = document.getElementById('growth-value-chart').getContext('2d');
    
    const data = companiesData.map(company => ({
        x: company.score, // GCE Score
        y: company.upside, // Upside
        r: Math.sqrt((company.marketCap || 1) / 1000000000) * 5,
        label: company.ticker,
        backgroundColor: company.recommendation.includes('CORE') ? '#10b981' :
                        company.recommendation.includes('GROWTH') ? '#3b82f6' :
                        company.recommendation.includes('SPECULATIVE') ? '#f59e0b' : '#ef4444'
    }));
    
    charts.growthValue = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Protocolos',
                data: data,
                backgroundColor: data.map(d => d.backgroundColor),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: {
                    label: function(context) {
                        const point = context.raw;
                        return [
                            `Ticker: ${point.label}`,
                            `GCE Score: ${point.x}`,
                            `Upside: ${point.y.toFixed(1)}%`
                        ];
                    }
                }}
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'GCE Score de Qualidade',
                        color: '#e5e7eb'
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#e5e7eb' }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Upside Potencial (%)',
                        color: '#e5e7eb'
                    },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#e5e7eb' }
                }
            }
        }
    });
}


// ============================
// 5. Performance YTD Chart (Top 7)
// ============================
function createPerformanceChart() {
    const ctx = document.getElementById('performance-chart').getContext('2d');
    
    // Filtra altcoins (exclui BTC e ETH) e simula performance YTD (não é real, mas ilustrativa)
    const topPerformers = [...companiesData]
        .filter(c => c.ticker !== 'BTC' && c.ticker !== 'ETH' && c.upside > 0)
        // Usa o Upside 1Y como proxy para o crescimento (ilustrativo)
        .sort((a, b) => b.upside - a.upside)
        .slice(0, 7);
    
    charts.performance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topPerformers.map(c => c.ticker),
            datasets: [{
                label: 'Upside Potencial (1Y)',
                data: topPerformers.map(c => c.upside),
                backgroundColor: topPerformers.map(c => c.upside > 0 ? '#10b981' : '#ef4444'),
                borderColor: '#1f2937',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#e5e7eb', callback: function(value) { return value + '%'; } }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#e5e7eb', font: { weight: 'bold' } }
                }
            }
        }
    });
}


// ============================
// 6. Drawdown em Bear Market
// Substitui Piores 10 YTD/Dividendos
// ============================
function createWorstPerformanceChart() {
    // Reutiliza o canvas ID do antigo Top Dividend Yields
    const ctx = document.getElementById('dividend-chart').getContext('2d');
    
    // Classifica por Drawdown em Bear Market (quanto maior o número negativo, pior)
    const worstDrawdowns = [...companiesData]
        .filter(c => c.performance.bearMarketDrawdown < -50)
        .sort((a, b) => a.performance.bearMarketDrawdown - b.performance.bearMarketDrawdown) // Piores para a esquerda (mais negativo)
        .slice(0, 7);
    
    charts.worstPerformance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: worstDrawdowns.map(c => c.ticker),
            datasets: [{
                label: 'Bear Market Drawdown (%)',
                data: worstDrawdowns.map(c => c.performance.bearMarketDrawdown),
                // Cor: Mais vermelho para maior drawdown
                backgroundColor: worstDrawdowns.map(c => {
                    const magnitude = Math.abs(c.performance.bearMarketDrawdown);
                    return magnitude > 90 ? '#ef4444' : magnitude > 80 ? '#f59e0b' : '#3b82f6';
                }),
                borderColor: '#1f2937',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', 
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#e5e7eb', callback: function(value) { return value + '%'; } }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#e5e7eb', font: { weight: 'bold' } }
                }
            }
        }
    });
}


// ============================
// 7. Market Cap Distribution (Mantém)
// ============================
function createMarketCapChart() {
    const ctx = document.getElementById('marketcap-chart').getContext('2d');
    
    // Market Cap em Bilhões (US$)
    const sorted = [...companiesData].sort((a, b) => b.marketCap - a.marketCap);
    
    charts.marketCap = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(c => c.ticker),
            datasets: [{
                label: 'Market Cap (US$ Bilhões)',
                data: sorted.map(c => (c.marketCap || 0) / 1000000000),
                backgroundColor: '#3b82f6',
                borderColor: '#1f2937',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#e5e7eb', callback: function(value) { return '$' + value.toFixed(0) + 'B'; } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#e5e7eb', font: { size: 10 } }
                }
            }
        }
    });
}

// ============================
// 8. Recommendation Distribution (Mantém)
// ============================
function createRecommendationChart() {
    const ctx = document.getElementById('recommendation-chart').getContext('2d');
    
    // Count by recommendation
    const recCounts = {
        'CORE HOLD': 0,
        'GROWTH BUY': 0,
        'STRATEGIC BUY': 0,
        'CORE BUY': 0,
        'SPECULATIVE HOLD': 0,
        'HIGH RISK BUY': 0,
        'HOLD': 0
    };
    
    companiesData.forEach(company => {
        if (recCounts.hasOwnProperty(company.recommendation)) {
            recCounts[company.recommendation]++;
        } else {
            // Se houver uma recomendação não mapeada, adiciona em "Outros"
            recCounts['HOLD']++;
        }
    });
    
    // Filtra recomendações com contagem zero para limpar o gráfico
    const labels = Object.keys(recCounts).filter(key => recCounts[key] > 0);
    const data = labels.map(key => recCounts[key]);

    charts.recommendation = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#10b981', // CORE HOLD
                    '#3b82f6', // GROWTH BUY
                    '#f59e0b', // STRATEGIC BUY
                    '#00bcd4', // CORE BUY
                    '#ef4444', // SPECULATIVE HOLD
                    '#8b5cf6', // HIGH RISK BUY
                    '#94a3b8'  // HOLD
                ],
                borderColor: '#1f2937',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'right', labels: { color: '#e5e7eb' } },
                tooltip: { callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }}
            },
            onClick: (e) => {
                const activePoints = charts.recommendation.getElementsAtEventForMode(e, 'point', { intersect: true }, true);
                if (activePoints.length > 0) {
                    const firstPoint = activePoints[0];
                    const recommendation = charts.recommendation.data.labels[firstPoint.index];
                    
                    const filteredCompanies = companiesData.filter(c => c.recommendation === recommendation);
                    showModal(`${recommendation}`, filteredCompanies);
                }
            }
        }
    });
}

// ============================
// 9. Risk Matrix Initialization (Mantém)
// ============================
// Esta função é crítica e foi copiada e ajustada do index.html para funcionar aqui.
function initializeRiskMatrix() {
    const canvas = document.getElementById('risk-matrix-canvas');
    if (!canvas) return;

    let tooltip = document.getElementById('matrix-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'matrix-tooltip';
        tooltip.className = 'matrix-tooltip';
        document.body.appendChild(tooltip);
    }

    const ctx = canvas.getContext('2d');

    // CONFIGURAÇÕES CRIPTO
    const CSS_HEIGHT = 600; 
    const PADDING = 60;
    const IDEAL_MIN_RISK = 0.0;
    const IDEAL_MAX_RISK = 100.0;
    const IDEAL_MIN_UPSIDE = 0.0; 
    const IDEAL_MAX_UPSIDE = 100.0; // Aumentado para cobrir a maioria dos upsides
    const CUT_OFF_RISK = 40.0; // Risco de Smart Contract/Centralização
    const CUT_OFF_UPSIDE = 40.0; // Upside %

    const SHIFT_X = 300; 
    const SHIFT_Y = 50;  

    // Configura canvas
    function configureCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const cssWidth = canvas.parentElement.offsetWidth;
        const cssHeight = CSS_HEIGHT;

        canvas.style.width = cssWidth + 'px';
        canvas.style.height = cssHeight + 'px';

        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        return { width: cssWidth, height: cssHeight, padding: PADDING };
    }

    let width, height, padding;
    function updateScales() {
        const dims = configureCanvas();
        width = dims.width;
        height = dims.height;
        padding = dims.padding;
    }

    updateScales();

    // Funções de escala (transforma score em pixel)
    const scaleX = (riskScore) => {
        const clampedRisk = Math.max(IDEAL_MIN_RISK, Math.min(IDEAL_MAX_RISK, riskScore));
        return padding + (clampedRisk - IDEAL_MIN_RISK) / (IDEAL_MAX_RISK - IDEAL_MIN_RISK) * (width - 2 * padding);
    };

    const scaleY = (upside) => {
        const clampedUpside = Math.max(IDEAL_MIN_UPSIDE, Math.min(IDEAL_MAX_UPSIDE, upside));
        return height - padding - (clampedUpside - IDEAL_MIN_UPSIDE) / (IDEAL_MAX_UPSIDE - IDEAL_MIN_UPSIDE) * (height - 2 * padding);
    };

    function drawMatrix() {
        const cutX = scaleX(CUT_OFF_RISK);
        const cutY = scaleY(CUT_OFF_UPSIDE);

        ctx.clearRect(0, 0, width, height);

        // Quadrantes coloridos
        const topHeight = cutY - padding;
        const bottomHeight = height - padding - cutY;

        // Alto Retorno / Baixo Risco (SMART MONEY) - Verde
        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.fillRect(padding, padding, cutX - padding, topHeight);
        
        // Alto Retorno / Alto Risco (APOSTA DE ALTA VOLATILIDADE) - Amarelo
        ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
        ctx.fillRect(cutX, padding, width - cutX - padding, topHeight);
        
        // Baixo Retorno / Baixo Risco (ESTAGNAÇÃO) - Azul
        ctx.fillStyle = 'rgba(59, 130, 246, 0.12)';
        ctx.fillRect(padding, cutY, cutX - padding, bottomHeight);
        
        // Baixo Retorno / Alto Risco (EVITAR) - Vermelho
        ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
        ctx.fillRect(cutX, cutY, width - cutX - padding, bottomHeight);

        // Linhas de corte
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(padding, cutY); ctx.lineTo(width - padding, cutY); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cutX, padding); ctx.lineTo(cutX, height - padding); ctx.stroke();

        // RÓTULOS DOS EIXOS
        ctx.fillStyle = '#e5e7eb';
        ctx.font = '12px Inter';
        
        // EIXO X (Risco Score Compósito)
        ctx.textAlign = 'center';
        ctx.fillText('Risco (Smart Contract / Centralização) →', width / 2, height - 20);
        
        ctx.textAlign = 'left';
        ctx.fillText(IDEAL_MIN_RISK.toFixed(0), padding, height - padding + 15);
        ctx.textAlign = 'center';
        ctx.fillText(CUT_OFF_RISK.toFixed(0), cutX, height - padding + 15);
        ctx.textAlign = 'right';
        ctx.fillText(IDEAL_MAX_RISK.toFixed(0), width - padding, height - padding + 15);

        // EIXO Y (Retorno Upside %)
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Upside Potencial (%) →', 0, 0);
        ctx.restore();
        
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(IDEAL_MAX_UPSIDE.toFixed(0) + '%', padding - 5, padding);
        ctx.fillText(CUT_OFF_UPSIDE.toFixed(0) + '%', padding - 5, cutY);
        ctx.fillText(IDEAL_MIN_UPSIDE.toFixed(0) + '%', padding - 5, height - padding);
        
        // Desenho dos pontos
        companiesData.forEach(company => {
            // **CHAMADA DE FUNÇÃO CRÍTICA DO UTILS.JS**
            const riskScore = (typeof calculateRiskScore === 'function') ? calculateRiskScore(company) : 50; 
            const upside = company.upside ?? 0;
            const x = scaleX(riskScore);
            const y = scaleY(upside);
            const radius = 6;

            let color;
            if (riskScore < CUT_OFF_RISK && upside >= CUT_OFF_UPSIDE) color = '#10b981'; // Smart Money
            else if (riskScore >= CUT_OFF_RISK && upside >= CUT_OFF_UPSIDE) color = '#f59e0b'; // Alto Risco
            else if (riskScore < CUT_OFF_RISK) color = '#3b82f6'; // Estagnação
            else color = '#ef4444'; // Evitar

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Guarda coordenadas CSS para tooltip
            company._chartX = x;
            company._chartY = y;
            company._chartRadius = radius;
            company._riskScore = riskScore;
        });
    }

    drawMatrix();
    // [CÓDIGO DE INTERAÇÃO mousemove E resize É MANTIDO PARA FUNCIONAR O TOOLTIP]
    
    // Evento mousemove: detecta ponto mais próximo e posiciona tooltip
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let hoveredCompany = null;
        let minDistance = Infinity;

        companiesData.forEach(company => {
            if (typeof company._chartX !== 'number' || typeof company._chartY !== 'number') return;
            const dx = mouseX - company._chartX;
            const dy = mouseY - company._chartY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const threshold = (company._chartRadius || 6) + 8;
            if (distance <= threshold && distance < minDistance) {
                minDistance = distance;
                hoveredCompany = company;
            }
        });

        if (hoveredCompany) {
            tooltip.style.display = 'block';
            canvas.style.cursor = 'pointer';

            const riskScore = hoveredCompany._riskScore ? hoveredCompany._riskScore.toFixed(0) : 'N/A';
            
            tooltip.innerHTML = `
                <strong>${hoveredCompany.ticker}</strong>
                <span style="display: block;">${hoveredCompany.name || ''}</span>
                <span style="display: block;">Risco: ${riskScore}/100</span>
                <span style="display: block;">Upside: ${hoveredCompany.upside !== undefined ? hoveredCompany.upside.toFixed(1) : 'N/A'}%</span>
                <span style="display: block;">Score: ${hoveredCompany.score ?? 'N/A'}</span>
                <span style="display: block;">Recom: ${hoveredCompany.recommendation ?? 'N/A'}</span>
            `;

            tooltip.style.position = 'fixed';
            tooltip.style.zIndex = '99999';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.display = 'block';

            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            const offset = 12;
            const screenPadding = 12;
            const pointClientX = rect.left + hoveredCompany._chartX;
            const pointClientY = rect.top + hoveredCompany._chartY;

            let finalLeft = Math.round(pointClientX + offset);
            let finalTop = Math.round(pointClientY + offset);

            if (finalLeft + tooltipWidth > window.innerWidth - screenPadding) {
                finalLeft = Math.round(pointClientX - tooltipWidth - offset);
            }
            if (finalTop + tooltipHeight > window.innerHeight - screenPadding) {
                finalTop = Math.round(pointClientY - tooltipHeight - offset);
            }

            // --- APLICA SHIFT FIXO SOLICITADO ---
            finalLeft = finalLeft - SHIFT_X;
            finalTop = finalTop - SHIFT_Y;  
            // -------------------------------------

            if (finalLeft < screenPadding) finalLeft = screenPadding;
            if (finalTop < screenPadding) finalTop = screenPadding;
            if (finalLeft + tooltipWidth > window.innerWidth - screenPadding) finalLeft = window.innerWidth - tooltipWidth - screenPadding;
            if (finalTop + tooltipHeight > window.innerHeight - screenPadding) finalTop = window.innerHeight - tooltipHeight - screenPadding;

            tooltip.style.left = `${finalLeft}px`;
            tooltip.style.top = `${finalTop}px`;
        } else {
            tooltip.style.display = 'none';
            canvas.style.cursor = 'default';
        }
    });

    canvas.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
        canvas.style.cursor = 'default';
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateScales();
            drawMatrix();
        }, 120);
    });
}