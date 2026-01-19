gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('.projet-section');

    sections.forEach((section, index) => {
        const projetBg = section.querySelector('.projet-bg');
        const info = section.querySelector('.projet-info');

        // Créer un overlay dynamiquement
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 2.5%;
            left: 2.5%;
            width: 95%;
            height: 95%;
            background: rgba(0, 0, 0, 0.6);
            pointer-events: none;
            border-radius: 20px;
            opacity: 0;
        `;
        projetBg.appendChild(overlay);

        // Create timeline with ScrollTrigger pin
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=1000",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            }
        });

        // ANIMATION SEQUENCE:
        // 1. Fade in overlay from transparent to opaque
        tl.to(overlay, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut"
        }, 0)

        // 2. Slide info content up from bottom
        .to(info, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
        }, 0.2);
    });

});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});