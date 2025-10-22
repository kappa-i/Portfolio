const h1 = document.querySelector('h1');
const allLinks = document.querySelectorAll('a');

// Effet glitch PERMANENT sur h1
if (h1) {
  setInterval(() => {
    const offsetX1 = Math.random() * 4 - 2;
    const offsetY1 = Math.random() * 4 - 2;
    const offsetX2 = Math.random() * 4 - 2;
    const offsetY2 = Math.random() * 4 - 2;
    
    h1.style.textShadow = `${offsetX1}px ${offsetY1}px #ff00de, ${offsetX2}px ${offsetY2}px #00fff9`;
  }, 100);
}

// Effet glitch sur TOUS les liens (au survol uniquement)
allLinks.forEach(link => {
  let linkGlitchInterval;
  
  link.addEventListener('mouseenter', () => {
    linkGlitchInterval = setInterval(() => {
      const offsetX1 = Math.random() * 4 - 2;
      const offsetY1 = Math.random() * 4 - 2;
      const offsetX2 = Math.random() * 4 - 2;
      const offsetY2 = Math.random() * 4 - 2;
      
      link.style.textShadow = `${offsetX1}px ${offsetY1}px #ff00de, ${offsetX2}px ${offsetY2}px #00fff9`;
    }, 100);
  });
  
  link.addEventListener('mouseleave', () => {
    clearInterval(linkGlitchInterval);
    link.style.textShadow = 'none';
  });
});

//cube

const cube = document.querySelector('.cube');
const shape3d = document.querySelector('.shape-3d');

if (cube && shape3d) {
  let isDragging = false;
  let previousMouseX = 0;
  let previousMouseY = 0;
  let previousTouchX = 0;
  let previousTouchY = 0;
  let rotationX = 0;
  let rotationY = 0;
  let rotationZ = 0;
  let animationId;

  // Animation continue
  function animateCube() {
    if (!isDragging) {
      rotationX += 0.5;
      rotationY += 0.5;
      rotationZ += 0.5;
      cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`;
    }
    animationId = requestAnimationFrame(animateCube);
  }

  animateCube();

  // ÉVÉNEMENTS SOURIS (desktop)
  shape3d.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
    shape3d.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMouseX;
    const deltaY = e.clientY - previousMouseY;

    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;

    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`;

    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      shape3d.style.cursor = 'grab';
    }
  });

  // ÉVÉNEMENTS TACTILES (mobile/iPhone)
  shape3d.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    previousTouchX = touch.clientX;
    previousTouchY = touch.clientY;
    e.preventDefault(); // Empêche le scroll
  }, { passive: false });

  shape3d.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - previousTouchX;
    const deltaY = touch.clientY - previousTouchY;

    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;

    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`;

    previousTouchX = touch.clientX;
    previousTouchY = touch.clientY;
    
    e.preventDefault(); // Empêche le scroll
  }, { passive: false });

  shape3d.addEventListener('touchend', () => {
    isDragging = false;
  });

  shape3d.style.cursor = 'grab';
  shape3d.style.touchAction = 'none'; // Améliore le support tactile
}