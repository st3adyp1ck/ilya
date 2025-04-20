// Preloader functionality
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');

    // Ensure body doesn't scroll during preload
    document.body.style.overflow = 'hidden';

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
            document.body.style.overflowX = 'hidden'; // Keep horizontal overflow hidden
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
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Show loading indicator
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> SENDING...';
        button.disabled = true;

        // Get form data
        const formData = new FormData(this);
        const formValues = {};
        for (let [key, value] of formData.entries()) {
            formValues[key] = value;
        }
        localStorage.setItem('lastFormSubmission', JSON.stringify(formValues));

        // Submit the form data to FormSubmit via fetch
        fetch('https://formsubmit.co/ib310us@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                // Redirect to thank-you page regardless of response
                window.location.href = 'thank-you.html';
            })
            .catch(error => {
                console.error('Error:', error);
                // Still redirect to thank-you page even if there's an error
                window.location.href = 'thank-you.html';
            });
    });
}
