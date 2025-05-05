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

// Use throttled version of scroll handler with increased throttle time for better performance
window.addEventListener('scroll', throttle(handleScroll, 200), { passive: true });

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

// Update copyright year
document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Add structured data for breadcrumbs
function addBreadcrumbsStructuredData() {
    const breadcrumbsData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ilyabelous.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://ilyabelous.com/#about"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Experience",
                "item": "https://ilyabelous.com/#experience"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Skills",
                "item": "https://ilyabelous.com/#skills"
            },
            {
                "@type": "ListItem",
                "position": 5,
                "name": "Contact",
                "item": "https://ilyabelous.com/#contact"
            }
        ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbsData);
    document.head.appendChild(script);
}

// Call the function to add breadcrumbs structured data
document.addEventListener('DOMContentLoaded', addBreadcrumbsStructuredData);

// Enhanced marketplace link interaction
document.addEventListener('DOMContentLoaded', () => {
    const marketplaceLink = document.querySelector('.marketplace-cta');
    if (marketplaceLink) {
        // Add attention-grabbing effect when user scrolls to the featured projects section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a brief pulse animation when the link comes into view
                    marketplaceLink.classList.add('animate-pulse');
                    setTimeout(() => {
                        marketplaceLink.classList.remove('animate-pulse');
                    }, 2000);
                }
            });
        }, { threshold: 0.5 });

        // Observe the parent section
        const featuredSection = document.getElementById('skills');
        if (featuredSection) {
            observer.observe(featuredSection);
        }

        // Add special hover effect for the icon
        const marketplaceIcon = marketplaceLink.querySelector('.marketplace-icon');
        if (marketplaceIcon) {
            marketplaceLink.addEventListener('mouseenter', () => {
                marketplaceIcon.classList.add('animate-bounce');
            });

            marketplaceLink.addEventListener('mouseleave', () => {
                marketplaceIcon.classList.remove('animate-bounce');
            });
        }
    }
});
