// ==============================================
// 밀양 청년 Re-Turn 브릿지 제안서 - 공통 스크립트 (모바일 최적화)
// ==============================================

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    initializeCommonFeatures();
});

// 공통 기능 초기화
function initializeCommonFeatures() {
    initMobileNavigation();
    initSmoothScrolling();
    initIntersectionObserver();
    initNavigationHighlight();
    setupFormValidation();
    initScrollIndicator();
    initTouchOptimization();
}

// 모바일 네비게이션 초기화
function initMobileNavigation() {
    // 모바일 메뉴 토글 버튼과 오버레이 생성
    createMobileMenuElements();
    
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileToggle || !navMenu) return;
    
    // 토글 버튼 클릭 이벤트
    mobileToggle.addEventListener('click', function() {
        toggleMobileMenu();
    });
    
    // 오버레이 클릭으로 메뉴 닫기
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    // 네비게이션 링크 클릭 시 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
    
    // 윈도우 리사이즈 시 메뉴 상태 리셋
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // ESC 키로 모바일 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// 모바일 메뉴 요소 생성
function createMobileMenuElements() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;
    
    // 모바일 토글 버튼이 없으면 생성
    if (!document.querySelector('.mobile-menu-toggle')) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.setAttribute('aria-label', '메뉴 열기');
        mobileToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        navContainer.appendChild(mobileToggle);
    }
    
    // 모바일 오버레이가 없으면 생성
    if (!document.querySelector('.mobile-overlay')) {
        const mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        document.body.appendChild(mobileOverlay);
    }
}

// 모바일 메뉴 토글
function toggleMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// 모바일 메뉴 열기
function openMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-label', '메뉴 닫기');
    navMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 모바일 메뉴 닫기
function closeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    
    if (mobileToggle) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-label', '메뉴 열기');
    }
    if (navMenu) navMenu.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 스크롤 인디케이터 초기화
function initScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// 터치 최적화
function initTouchOptimization() {
    // 터치 디바이스에서 hover 효과 제거
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // iOS 300ms 딜레이 제거
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        // 터치 피드백 개선
        const touchableElements = document.querySelectorAll('.btn, .nav-link, .card, .floating-btn');
        touchableElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
        });
    }
}

// 부드러운 스크롤링 설정
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // 모바일 메뉴가 열려있으면 닫기
                closeMobileMenu();
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer 설정 (스크롤 애니메이션)
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 카운터 애니메이션 트리거
                if (entry.target.hasAttribute('data-target')) {
                    animateCounter(entry.target);
                }
                
                // 프로그레스 바 애니메이션 트리거
                const progressBars = entry.target.querySelectorAll('[data-progress]');
                progressBars.forEach(bar => {
                    animateProgressBar(bar);
                });
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들 관찰
    const animateElements = document.querySelectorAll('.animate-fadeInUp, .animate-fadeInLeft, .animate-fadeInRight, .card, .kpi-card, .problem-stat, .solution-step');
    animateElements.forEach(el => observer.observe(el));
}

// 네비게이션 하이라이트
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        
        // 헤더 스크롤 효과
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

// 카운터 애니메이션
function animateCounter(element) {
    if (element.classList.contains('counted')) return;
    
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2초
    const startTime = Date.now();
    const startValue = 0;
    const isDecimal = target % 1 !== 0;
    
    function updateCounter() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutCubic 함수
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (target - startValue) * easeProgress;
        
        if (isDecimal) {
            element.textContent = currentValue.toFixed(1);
        } else {
            element.textContent = Math.floor(currentValue).toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
            element.classList.add('counted');
        }
    }
    
    updateCounter();
}

// 프로그레스 바 애니메이션
function animateProgressBar(progressBar) {
    if (progressBar.classList.contains('animated')) return;
    
    const targetWidth = parseInt(progressBar.getAttribute('data-progress'));
    
    setTimeout(() => {
        progressBar.style.width = targetWidth + '%';
        progressBar.classList.add('animated');
    }, 300);
}

// 숫자 포맷팅
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}

// 로딩 상태 표시
function showLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>로딩 중...</p>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // CSS 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .loading-spinner {
            text-align: center;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .touch-device .touch-active {
            transform: scale(0.95);
            opacity: 0.8;
        }
    `;
    
    document.head.appendChild(style);
}

// 로딩 상태 숨기기
function hideLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// 모달 창 열기
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', closeModalOnEsc);
    }
}

// 모달 창 닫기
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        document.removeEventListener('keydown', closeModalOnEsc);
    }
}

// ESC 키로 모달 닫기
function closeModalOnEsc(e) {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="flex"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', closeModalOnEsc);
    }
}

// 툴팁 표시
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    
    // 툴팁 스타일
    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '14px';
    tooltip.style.zIndex = '1000';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s ease';
    tooltip.style.pointerEvents = 'none';
    
    // 화면 경계 체크
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.left < 10) {
        tooltip.style.left = '10px';
    } else if (tooltipRect.right > window.innerWidth - 10) {
        tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px';
    }
    
    // 애니메이션
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.remove();
        }
    }, 3000);
}

// 클립보드에 복사
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('클립보드에 복사되었습니다.', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// 구식 브라우저 클립보드 복사
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('클립보드에 복사되었습니다.', 'success');
    } catch (err) {
        showNotification('복사에 실패했습니다.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// 알림 메시지 표시
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 스타일 설정
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '6px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    notification.style.maxWidth = '300px';
    notification.style.wordWrap = 'break-word';
    
    // 타입별 색상
    switch (type) {
        case 'success':
            notification.style.background = '#4CAF50';
            break;
        case 'error':
            notification.style.background = '#f44336';
            break;
        case 'warning':
            notification.style.background = '#FF6B35';
            break;
        default:
            notification.style.background = '#2E5BBA';
    }
    
    // 모바일에서 위치 조정
    if (window.innerWidth <= 768) {
        notification.style.right = '10px';
        notification.style.left = '10px';
        notification.style.maxWidth = 'none';
        notification.style.transform = 'translateY(-100%)';
    }
    
    document.body.appendChild(notification);
    
    // 애니메이션
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            notification.style.transform = 'translateY(0)';
        } else {
            notification.style.transform = 'translateX(0)';
        }
    }, 10);
    
    // 3초 후 제거
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            notification.style.transform = 'translateY(-100%)';
        } else {
            notification.style.transform = 'translateX(100%)';
        }
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// 폼 유효성 검사 설정
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // 실시간 유효성 검사
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
        });
    });
}

// 폼 유효성 검사
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// 필드 유효성 검사
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // 필수 필드 검사
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        message = '이 필드는 필수입니다.';
    }
    
    // 이메일 검사
    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = '올바른 이메일 주소를 입력하세요.';
        }
    }
    
    // 전화번호 검사
    if (field.type === 'tel' && value !== '') {
        const phoneRegex = /^[0-9-]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            message = '올바른 전화번호를 입력하세요.';
        }
    }
    
    // 에러 메시지 표시/제거
    showFieldError(field, isValid ? '' : message);
    
    return isValid;
}

// 필드 에러 메시지 표시
function showFieldError(field, message) {
    // 기존 에러 메시지 제거
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // 필드 상태 업데이트
    if (message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#f44336';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '4px';
        
        field.parentNode.appendChild(errorElement);
    } else {
        field.classList.remove('error');
    }
}

// 디바이스 감지
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1200;
}

function isDesktop() {
    return window.innerWidth > 1200;
}

// 브라우저 감지
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    return {
        name: browser,
        userAgent: userAgent,
        isMobile: /Mobile|Android|iPhone|iPad/.test(userAgent)
    };
}

// 성능 모니터링
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const navigation = performance.getEntriesByType('navigation')[0];
            
            console.log('페이지 로드 성능:', {
                'DNS 조회': navigation.domainLookupEnd - navigation.domainLookupStart,
                '연결 시간': navigation.connectEnd - navigation.connectStart,
                '페이지 로드': navigation.loadEventEnd - navigation.navigationStart,
                'DOM 준비': navigation.domContentLoadedEventEnd - navigation.navigationStart
            });
        });
    }
}

// 스크롤 최적화
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollElements);
        ticking = true;
    }
}

function updateScrollElements() {
    // 스크롤 관련 업데이트를 여기서 일괄 처리
    ticking = false;
}

// 이미지 지연 로딩
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 에러 처리
window.addEventListener('error', function(e) {
    console.error('JavaScript 에러:', e.error);
    // 프로덕션에서는 에러 로깅 서비스로 전송
});

// 전역 유틸리티 함수들을 window 객체에 추가
window.AppUtils = {
    showLoading,
    hideLoading,
    openModal,
    closeModal,
    showTooltip,
    copyToClipboard,
    showNotification,
    isMobile,
    isTablet,
    isDesktop,
    getBrowserInfo,
    formatNumber,
    closeMobileMenu,
    openMobileMenu
};

// 개발 모드에서만 성능 모니터링 실행
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    trackPerformance();
}