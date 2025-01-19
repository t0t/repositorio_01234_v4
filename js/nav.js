document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    
    function updateNav() {
        if (window.scrollY > 100) {
            nav.classList.add('fixed');
        } else {
            nav.classList.remove('fixed');
        }
        lastScrollY = window.scrollY;
    }

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateNav();
                ticking = false;
            });
            ticking = true;
        }
    });
});
