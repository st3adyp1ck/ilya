// Create binary rain effect
function createBinaryRain() {
    const container = document.getElementById('binaryRain');
    const digits = ['0', '1'];

    // Create fewer columns to reduce load
    for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.className = 'binary-column absolute';
        column.style.left = `${Math.random() * 100}%`;

        // Create fewer digits per column
        for (let j = 0; j < 15; j++) {
            const digit = document.createElement('div');
            digit.className = 'binary-digit';
            digit.textContent = digits[Math.floor(Math.random() * digits.length)];
            // Randomize animation duration for more natural effect
            digit.style.animationDuration = `${3 + Math.random() * 5}s`;
            // Randomize animation delay for staggered start
            digit.style.animationDelay = `${Math.random() * 2}s`;
            // Set initial vertical position to be staggered
            digit.style.top = `${j * 5}%`;
            column.appendChild(digit);
        }

        container.appendChild(column);
    }

    // Run the cleanup function more frequently to ensure smooth looping
    setInterval(cleanupBinaryRain, 1000);
}

// Custom cursor effect
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .holographic-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-grow');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
        });
    });
}

// Progress bar update
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in document.documentElement;

    // Hide progress bar on mobile devices
    if (isMobile) {
        progressBar.style.display = 'none';
        return;
    }

    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    // Prevent division by zero and ensure progress is between 0-100%
    const progress = totalScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)) : 0;
    progressBar.style.width = `${progress}%`;
}

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

// Initialize all effects
function initEffects() {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in document.documentElement;

    // Only initialize binary rain on desktop
    if (!isMobile) {
        // Stop any existing binary rain animations
        const binaryRain = document.getElementById('binaryRain');
        if (binaryRain) {
            binaryRain.innerHTML = '';
        }
        createBinaryRain();
        initCustomCursor();
    }

    // Only add progress bar on desktop
    if (!isMobile) {
        // Add scroll event listener for progress bar with throttling
        const throttledProgressUpdate = throttle(updateProgressBar, 200); // Increased throttle time for better performance
        window.addEventListener('scroll', throttledProgressUpdate, { passive: true });

        // Initial progress bar update
        updateProgressBar();
    } else {
        // Hide progress bar on mobile
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.display = 'none';
        }
    }
}

// Manage binary rain animation
function cleanupBinaryRain() {
    const container = document.getElementById('binaryRain');
    if (!container) return;

    const digits = container.getElementsByClassName('binary-digit');
    if (digits.length === 0) return;

    // Check for digits that have moved out of view and reset their animation
    Array.from(digits).forEach(digit => {
        const rect = digit.getBoundingClientRect();
        // If the digit is below the viewport, reset its position to create a loop effect
        if (rect.top > window.innerHeight + 100) {
            // Reset the digit's position to above the viewport
            digit.style.transform = 'translateY(-100px)';
            // Randomize the digit value for more variety
            digit.textContent = Math.floor(Math.random() * 2);
            // Randomize animation duration for more natural effect
            digit.style.animationDuration = `${3 + Math.random() * 5}s`;
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initEffects);

// Reinitialize effects when needed (e.g., after navigation)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        initEffects();
    }
});

// Add hover effect to all holographic cards - only on desktop
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in document.documentElement;

    // Only apply holographic effects on desktop
    if (!isMobile) {
        document.querySelectorAll('.holographic-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const x = e.clientX - card.getBoundingClientRect().left;
                const y = e.clientY - card.getBoundingClientRect().top;

                const centerX = card.offsetWidth / 2;
                const centerY = card.offsetHeight / 2;

                const angleY = (x - centerX) / 20;
                const angleX = (centerY - y) / 20;

                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
});


