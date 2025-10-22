const text = document.querySelector('.text'); // Sélectionner votre élément texte

text.addEventListener('mousemove', (e) => {
  const rect = text.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const letters = text.querySelectorAll('span');
  
  letters.forEach(letter => {
    const letterRect = letter.getBoundingClientRect();
    const letterX = letterRect.left + letterRect.width / 2 - rect.left;
    const letterY = letterRect.top + letterRect.height / 2 - rect.top;
    
    const distance = Math.sqrt(Math.pow(x - letterX, 2) + Math.pow(y - letterY, 2));
    const maxDistance = 100; // Rayon de la zone d'effet
    
    if (distance < maxDistance) {
      const scale = 1 + (1 - distance / maxDistance) * 1.5; // Zoom jusqu'à 2.5x
      letter.style.transform = `scale(${scale})`;
      letter.style.zIndex = '10';
    } else {
      letter.style.transform = 'scale(1)';
      letter.style.zIndex = '1';
    }
  });
});

text.addEventListener('mouseleave', () => {
  const letters = text.querySelectorAll('span');
  letters.forEach(letter => {
    letter.style.transform = 'scale(1)';
  });
});