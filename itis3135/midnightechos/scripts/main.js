// Wait for page to load
document.addEventListener('DOMContentLoaded', function () {

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
        });
    }

    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach((link) => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Simple form validation
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('ደሓን መፃእኩም - Welcome! Your message has been received.');
            this.reset();
        });
    });
});

