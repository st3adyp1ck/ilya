// Preloader functionality
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');

    // Simulate loading time (you can remove this setTimeout in production)
    setTimeout(() => {
        // Hide preloader
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';

        // Show main content with a fade-in effect
        mainContent.classList.remove('invisible');
        mainContent.classList.add('transition-opacity', 'duration-1000');
        setTimeout(() => {
            mainContent.classList.remove('opacity-0');
            // Enable scrolling on body after preloader is hidden
            document.body.style.overflow = 'auto';
        }, 100);
    }, 2500); // Adjust time as needed
});

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

// Throttle function to limit how often a function can be called
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Show/hide back to top button
const handleScroll = () => {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
};

// Use throttled version of scroll handler
window.addEventListener('scroll', throttle(handleScroll, 100));

// Back to top functionality
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // For the first submission, we'll use JavaScript to submit the form
    // This helps with the initial FormSubmit activation
    contactForm.addEventListener('submit', function (e) {
        // Don't prevent default - let the form submit naturally to FormSubmit
        // But show a loading indicator
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> SENDING...';
        button.disabled = true;

        // Store form data in localStorage in case we need to debug
        const formData = new FormData(this);
        const formValues = {};
        for (let [key, value] of formData.entries()) {
            formValues[key] = value;
        }
        localStorage.setItem('lastFormSubmission', JSON.stringify(formValues));

        // Let the form submit naturally to FormSubmit
        // The page will redirect to thank-you.html after submission
    });
}
