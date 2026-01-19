// Project Detail Page - CSS animations only (pas de GSAP)
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ Page projet chargée');
    
    // ========================================
    // SMOOTH SCROLL SIMPLE
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // INTERSECTION OBSERVER POUR ANIMATIONS AU SCROLL
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    const animatedElements = document.querySelectorAll(
        '.overview-card, .gallery-item, .feature-card, .process-step, .tech-badge-large, .projet-cta'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    console.log('✅ Animations initialisées');
});