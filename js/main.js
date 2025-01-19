// Main JavaScript for Brutalist Tropical Website

// Glitch Effect
const glitchTexts = document.querySelectorAll('.glitch');
glitchTexts.forEach(text => {
    text.setAttribute('data-text', text.textContent);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Random Glitch Animation
function randomGlitch() {
    const elements = document.querySelectorAll('.brutal-box');
    elements.forEach(element => {
        if (Math.random() > 0.99) {
            element.style.transform = `rotate(${Math.random() * 2 - 1}deg) translateX(${Math.random() * 2 - 1}px)`;
            setTimeout(() => {
                element.style.transform = '';
            }, 100);
        }
    });
}

setInterval(randomGlitch, 100);

// Tropical Background Animation
const tropicalElements = document.querySelectorAll('.tropical-gradient');
tropicalElements.forEach(element => {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        element.style.filter = `hue-rotate(${hue}deg)`;
    }, 100);
});

// Intersection Observer for Fade-in Animation
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.article-card');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const angleX = (cardCenterY - e.clientY) * 0.01;
        const angleY = (e.clientX - cardCenterX) * 0.01;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
});

// Reset card transform on mouse leave
document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Fondo dinámico
const images = [
    'images/imagen-0007.webp',
    'images/imagen-0174.webp',
    'images/imagen-0180.webp',
    'images/imagen-0194.webp',
    'images/imagen-0209.webp'
];

// Crear celdas del fondo
const background = document.querySelector('.dynamic-background');
if (background) {
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'bg-cell';
        background.appendChild(cell);
    }

    // Función para cambiar imagen aleatoria
    function changeRandomImage() {
        const cells = document.querySelectorAll('.bg-cell');
        const randomCell = cells[Math.floor(Math.random() * cells.length)];
        const randomImage = images[Math.floor(Math.random() * images.length)];
        
        // Transición suave
        randomCell.style.opacity = '0';
        setTimeout(() => {
            randomCell.style.backgroundImage = `url(${randomImage})`;
            randomCell.style.opacity = '1';
        }, 500);
    }

    // Inicializar todas las celdas
    const cells = document.querySelectorAll('.bg-cell');
    cells.forEach(cell => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        cell.style.backgroundImage = `url(${randomImage})`;
    });

    // Cambiar imágenes periódicamente
    setInterval(changeRandomImage, 2000);
}
