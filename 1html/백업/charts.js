// Chart.js 설정 및 데이터 시각화 - 수정된 버전

// Chart.js 로딩 확인 및 차트 초기화
function initializeCharts() {
    // Chart.js 로딩 확인
    if (typeof Chart === 'undefined') {
        console.error('Chart.js가 로드되지 않았습니다.');
        setTimeout(initializeCharts, 100); // 100ms 후 재시도
        return;
    }

    console.log('Chart.js 초기화 시작', Chart.version);

    // Chart.js 기본 설정
    Chart.defaults.font.family = "'Noto Sans KR', sans-serif";
    Chart.defaults.color = '#374151';
    Chart.defaults.scale.grid.color = '#f3f4f6';

    // 1. 인구 감소 차트
    const populationCtx = document.getElementById('populationChart');
    if (populationCtx) {
        const populationChart = new Chart(populationCtx, {
            type: 'line',
            data: {
                labels: ['1960년', '1970년', '1980년', '1990년', '2000년', '2010년', '2020년', '2024년'],
                datasets: [{
                    label: '밀양시 인구 (만명)',
                    data: [25, 22, 18, 15, 12, 11, 10.5, 10.2],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ef4444',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '밀양시 인구 변화 추이',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 30,
                        ticks: {
                            callback: function(value) {
                                return value + '만명';
                            }
                        },
                        title: {
                            display: true,
                            text: '인구 (만명)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '연도'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
        console.log('인구 감소 차트 생성 완료');
    }

    // 2. 청년정책 트렌드 차트
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        const trendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['2022.01', '2022.06', '2022.12', '2023.06', '2023.12', '2024.06', '2024.12'],
                datasets: [
                    {
                        label: '청년정책 검색량',
                        data: [80, 75, 65, 55, 45, 35, 25],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: '모바일 검색 비중',
                        data: [70, 75, 80, 85, 90, 95, 100],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: '정주환경 관심도',
                        data: [30, 35, 40, 45, 60, 85, 100],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '네이버 데이터랩 검색 트렌드 (3년간)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '점';
                            }
                        },
                        title: {
                            display: true,
                            text: '검색량 지수'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '기간'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
        console.log('트렌드 차트 생성 완료');
    }

    // 3. 수익 모델 차트
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const revenueChart = new Chart(revenueCtx, {
            type: 'doughnut',
            data: {
                labels: ['타 지자체 라이선스', '플랫폼 중개 수수료', '지역 상권 광고', '프리미엄 서비스', '정부 지원금'],
                datasets: [{
                    data: [45, 20, 15, 10, 10],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6',
                        '#ef4444'
                    ],
                    borderWidth: 0,
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '연간 수익 구조 (총 53억원 목표)',
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map((label, i) => {
                                        const value = data.datasets[0].data[i];
                                        return {
                                            text: `${label}: ${value}억원`,
                                            fillStyle: data.datasets[0].backgroundColor[i],
                                            hidden: false,
                                            index: i
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value}억원 (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
        console.log('수익 모델 차트 생성 완료');
    }

    // 4. 트렌드 요약 차트
    const trendSummaryCtx = document.getElementById('trendSummaryChart');
    if (trendSummaryCtx) {
        const trendSummaryChart = new Chart(trendSummaryCtx, {
            type: 'bar',
            data: {
                labels: ['청년정책 관심도', '모바일 선호도', '정주환경 중요도', 'AR 기술 수용도'],
                datasets: [{
                    label: '2022년',
                    data: [80, 70, 40, 20],
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderColor: '#ef4444',
                    borderWidth: 1
                }, {
                    label: '2024년',
                    data: [25, 100, 100, 80],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: '#3b82f6',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '청년층 트렌드 변화 비교',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '점';
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
        console.log('트렌드 요약 차트 생성 완료');
    }

    // ROI 계산기 기능 초기화
    initializeROICalculator();
    
    console.log('모든 차트 초기화 완료');
}

// ROI 계산기 초기화
function initializeROICalculator() {
    const youthInfluxSlider = document.getElementById('youthInflux');
    const settlementRateSlider = document.getElementById('settlementRate');
    const taxContributionSlider = document.getElementById('taxContribution');

    const youthInfluxValue = document.getElementById('youthInfluxValue');
    const settlementRateValue = document.getElementById('settlementRateValue');
    const taxContributionValue = document.getElementById('taxContributionValue');

    const annualRevenue = document.getElementById('annualRevenue');
    const paybackPeriod = document.getElementById('paybackPeriod');
    const totalProfit = document.getElementById('totalProfit');

    if (!youthInfluxSlider || !settlementRateSlider || !taxContributionSlider) {
        console.log('ROI 계산기 요소들을 찾을 수 없습니다.');
        return;
    }

    function updateROI() {
        const influx = parseInt(youthInfluxSlider.value);
        const rate = parseInt(settlementRateSlider.value);
        const tax = parseInt(taxContributionSlider.value);

        // 값 표시 업데이트
        if (youthInfluxValue) youthInfluxValue.textContent = influx + '명';
        if (settlementRateValue) settlementRateValue.textContent = rate + '%';
        if (taxContributionValue) taxContributionValue.textContent = tax + '만원';

        // 계산
        const settledYouth = influx * (rate / 100);
        const annualTax = settledYouth * tax; // 만원
        const annualRevenueValue = annualTax / 10000; // 억원

        const initialInvestment = 1.1; // 억원
        const paybackMonths = (initialInvestment / annualRevenueValue) * 12;
        const threeYearProfit = (annualRevenueValue * 3) - initialInvestment;

        // 결과 표시
        if (annualRevenue) annualRevenue.textContent = annualRevenueValue.toFixed(1) + '억원';
        if (paybackPeriod) paybackPeriod.textContent = Math.ceil(paybackMonths) + '개월';
        if (totalProfit) totalProfit.textContent = threeYearProfit.toFixed(1) + '억원';
    }

    // 슬라이더 이벤트 리스너
    youthInfluxSlider.addEventListener('input', updateROI);
    settlementRateSlider.addEventListener('input', updateROI);
    taxContributionSlider.addEventListener('input', updateROI);

    // 초기 계산
    updateROI();
    console.log('ROI 계산기 초기화 완료');
}

// DOM 로딩 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로딩 완료, 차트 초기화 시작');
    
    // Chart.js 로딩을 기다린 후 초기화
    if (typeof Chart !== 'undefined') {
        initializeCharts();
    } else {
        // Chart.js가 아직 로드되지 않은 경우 대기
        let attempts = 0;
        const maxAttempts = 50; // 5초 대기
        
        const checkChartJs = setInterval(() => {
            attempts++;
            if (typeof Chart !== 'undefined') {
                clearInterval(checkChartJs);
                initializeCharts();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkChartJs);
                console.error('Chart.js 로딩 타임아웃');
                // 차트 없이 다른 기능들 초기화
                initializeROICalculator();
            }
        }, 100);
    }
});

// PDF 다운로드 기능
window.downloadProposal = function() {
    alert('📄 제안서 PDF가 다운로드됩니다.\n\n실제 구현에서는 완전한 제안서 PDF 파일이 제공됩니다.');
};

// 반응형 차트 리사이징
window.addEventListener('resize', function() {
    // Chart.js가 로드되었는지 확인
    if (typeof Chart !== 'undefined') {
        Object.values(Chart.instances).forEach(chart => {
            if (chart) {
                chart.resize();
            }
        });
    }
});

// 다크모드 토글 (향후 구현 예정)
window.toggleDarkMode = function() {
    document.body.classList.toggle('dark');
    
    if (typeof Chart !== 'undefined') {
        const isDark = document.body.classList.contains('dark');
        const textColor = isDark ? '#f3f4f6' : '#374151';
        const gridColor = isDark ? '#374151' : '#f3f4f6';
        
        Chart.defaults.color = textColor;
        Chart.defaults.scale.grid.color = gridColor;
        
        Object.values(Chart.instances).forEach(chart => {
            if (chart) {
                chart.update();
            }
        });
    }
};

// 에러 핸들링
window.addEventListener('error', function(e) {
    console.error('스크립트 에러:', e.error);
});

console.log('charts_fixed.js 로드 완료');
