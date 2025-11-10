// Initialize navigation (menu toggle and active links)
function initializeNavigation() {
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
}

// Function to load components (header and footer)
function loadComponent(componentName, targetId) {
    fetch(`components/${componentName}.html`)
        .then((response) => response.text())
        .then((data) => {
            const element = document.getElementById(targetId);
            if (element) {
                element.innerHTML = data;
                // Re-initialize menu toggle and active links after loading header
                if (componentName === 'header') {
                    initializeNavigation();
                }
            }
        })
        .catch((error) => console.error(`Error loading ${componentName}:`, error));
}

// Wait for page to load
document.addEventListener('DOMContentLoaded', function () {
    // Load header and footer components
    loadComponent('header', 'header-placeholder');
    loadComponent('footer', 'footer-placeholder');

    // Simple form validation
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Welcome! Your message has been received.');
            this.reset();
        });
    });
});