// Content Category Shuffle on Scroll
document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        shuffleThreshold: 150, // pixels to scroll before triggering shuffle
        shuffleDelay: 300, // ms to wait after scroll stops
        animationDuration: 500, // ms for shuffle animation
        enableScrollShuffle: true, // enable/disable scroll-based shuffling
        enablePositionShuffle: false, // enable/disable position-based shuffling
        enableAutoShuffle: true, // enable/disable automatic shuffling
        autoShuffleInterval: 8000 // ms between auto shuffles
    };

    // Get all content containers that should be shuffled
    const contentContainers = document.querySelectorAll('.container');
    let lastScrollY = window.scrollY;
    let shuffleTimeout;
    let autoShuffleInterval;

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // Function to shuffle content within a container
    function shuffleContent(container) {
        const sides = container.querySelectorAll('.side');
        if (sides.length !== 2) return;

        const leftSide = sides[0];
        const rightSide = sides[1];

        // Get all content elements from both sides
        const leftContent = Array.from(leftSide.children);
        const rightContent = Array.from(rightSide.children);

        // Only shuffle if there's content to shuffle
        if (leftContent.length === 0 && rightContent.length === 0) return;

        // Shuffle the content arrays
        const shuffledLeft = shuffleArray(leftContent);
        const shuffledRight = shuffleArray(rightContent);

        // Clear and re-append shuffled content
        leftSide.innerHTML = '';
        rightSide.innerHTML = '';

        shuffledLeft.forEach(element => {
            leftSide.appendChild(element);
        });

        shuffledRight.forEach(element => {
            rightSide.appendChild(element);
        });

        // Add animation class
        container.classList.add('shuffling');
        setTimeout(() => {
            container.classList.remove('shuffling');
        }, config.animationDuration);
    }

    // Function to shuffle technology logos around the center
    function shuffleTechnologyLogos(container) {
        const projectsDiv = container.querySelector('.projects');
        if (!projectsDiv) return;

        const aroundImages = Array.from(projectsDiv.querySelectorAll('.around-img'));
        if (aroundImages.length === 0) return;

        // Shuffle the around images
        const shuffledImages = shuffleArray(aroundImages);

        // Clear and re-append shuffled images
        aroundImages.forEach(img => img.remove());
        shuffledImages.forEach(img => {
            projectsDiv.appendChild(img);
        });

        // Add animation class
        projectsDiv.classList.add('shuffling-logos');
        setTimeout(() => {
            projectsDiv.classList.remove('shuffling-logos');
        }, 300);
    }

    // Function to shuffle a specific container
    function shuffleContainer(container) {
        if (!container || !isInViewport(container)) return;
        
        shuffleContent(container);
        shuffleTechnologyLogos(container);
    }

    // Function to handle scroll-based shuffling
    function handleScrollShuffle() {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);

        if (scrollDelta > config.shuffleThreshold) {
            // Clear existing timeout
            if (shuffleTimeout) {
                clearTimeout(shuffleTimeout);
            }

            // Set a timeout to shuffle content after scroll stops
            shuffleTimeout = setTimeout(() => {
                contentContainers.forEach(container => {
                    if (isInViewport(container)) {
                        shuffleContainer(container);
                    }
                });
            }, config.shuffleDelay);

            lastScrollY = currentScrollY;
        }
    }

    // Function to handle position-based shuffling
    function handleScrollPositionShuffle() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
        
        // Shuffle at specific scroll percentages
        const shufflePoints = [25, 50, 75];
        shufflePoints.forEach((point, index) => {
            if (scrollPercentage > point && scrollPercentage < point + 5) {
                if (contentContainers[index]) {
                    shuffleContainer(contentContainers[index]);
                }
            }
        });
    }

    // Function to start auto shuffle
    function startAutoShuffle() {
        if (!config.enableAutoShuffle) return;
        
        autoShuffleInterval = setInterval(() => {
            contentContainers.forEach(container => {
                if (isInViewport(container)) {
                    shuffleTechnologyLogos(container);
                }
            });
        }, config.autoShuffleInterval);
    }

    // Function to stop auto shuffle
    function stopAutoShuffle() {
        if (autoShuffleInterval) {
            clearInterval(autoShuffleInterval);
            autoShuffleInterval = null;
        }
    }

    // Initialize scroll event listeners
    if (config.enableScrollShuffle) {
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(handleScrollShuffle);
                ticking = true;
            }
        }
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    if (config.enablePositionShuffle) {
        window.addEventListener('scroll', handleScrollPositionShuffle, { passive: true });
    }

    // Start auto shuffle
    startAutoShuffle();

    // Pause auto shuffle when user is interacting
    document.addEventListener('mouseenter', stopAutoShuffle);
    document.addEventListener('mouseleave', startAutoShuffle);

    // Initialize with a small shuffle on page load
    setTimeout(() => {
        contentContainers.forEach(container => {
            shuffleTechnologyLogos(container);
        });
    }, 1000);

    // Expose functions for manual control (optional)
    window.shuffleContent = shuffleContent;
    window.shuffleTechnologyLogos = shuffleTechnologyLogos;
    window.shuffleContainer = shuffleContainer;
}); 