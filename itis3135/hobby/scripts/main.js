// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');

        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all nav links
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });

        // Show target section
        const targetEl = document.getElementById(targetSection);
        if (targetEl) {
            targetEl.classList.add('active');
            // Smooth scroll to the start of the section (accounts for sticky header via CSS scroll-margin-top)
            targetEl.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        }

        // Add active class to clicked link
        link.classList.add('active');
    });
});