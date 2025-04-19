// Create binary rain effect
function createBinaryRain() {
    const container = document.getElementById('binaryRain');
    const digits = ['0', '1', '0', '1', '0', '1', '0', '1'];

    // Create multiple columns of binary digits
    for (let i = 0; i < 30; i++) {
        const column = document.createElement('div');
        column.className = 'binary-column absolute';
        column.style.left = `${Math.random() * 100}%`;

        // Create multiple digits in each column
        for (let j = 0; j < 20; j++) {
            const digit = document.createElement('div');
            digit.className = 'binary-digit';
            digit.textContent = digits[Math.floor(Math.random() * digits.length)];
            digit.style.left = '0';
            digit.style.top = `${-Math.random() * 100}px`;
            digit.style.opacity = Math.random();
            digit.style.animationDuration = `${5 + Math.random() * 10}s`;
            digit.style.animationDelay = `${Math.random() * 5}s`;
            column.appendChild(digit);
        }

        container.appendChild(column);
    }
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createBinaryRain();

    // Add hover effect to all holographic cards
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
});
