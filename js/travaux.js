gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {

    const sections = document.querySelectorAll('.projet-section');

    sections.forEach((section, index) => {
        const overlay = section.querySelector('.projet-overlay');
        const info = section.querySelector('.projet-info');

        // Create timeline with ScrollTrigger pin
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=1000",  // Pin duration in pixels
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            }
        });

        // ANIMATION SEQUENCE:
        // 1. Darken the overlay
        tl.to(overlay, {
            background: "rgba(0, 0, 0, 0.6)",
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
