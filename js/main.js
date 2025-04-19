// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
    });
});

// Show/hide back to top button
window.addEventListener('scroll', () => {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
});

// Back to top functionality
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Create futuristic alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'fixed top-10 left-1/2 transform -translate-x-1/2 z-50';
        alertDiv.innerHTML = `
            <div class="bg-dark-bg border border-neon-green text-neon-green px-6 py-4 rounded-lg tech-font neon-box flex items-center">
                <i class="fas fa-check-circle mr-3"></i>
                <span>MESSAGE SENT SUCCESSFULLY - THANK YOU!</span>
            </div>
        `;
        document.body.appendChild(alertDiv);

        // Remove after some time
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);

        form.reset();
    });
}

// Add this to your existing JavaScript
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Here you would typically add your form submission logic
    // For now, we'll just show a success message
    const alertDiv = document.createElement('div');
    alertDiv.className = 'fixed top-10 left-1/2 transform -translate-x-1/2 z-50';
    alertDiv.innerHTML = `
        <div class="bg-dark-bg border border-neon-green text-neon-green px-6 py-4 rounded-lg tech-font neon-box flex items-center">
            <i class="fas fa-check-circle mr-3"></i>
            <span>MESSAGE SENT SUCCESSFULLY!</span>
        </div>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
    this.reset();
});
