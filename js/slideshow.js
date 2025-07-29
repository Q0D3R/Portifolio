// Slideshow data
const slideshowData = [
    {
        image: 'img/pic/javascript.jpg',
        title: 'JavaScript Development',
        description: 'Modern JavaScript frameworks and libraries for dynamic web applications'
    },
    {
        image: 'img/pic/coding.jpg',
        title: 'Coding & Programming',
        description: 'Professional software development and coding solutions'
    },
    {
        image: 'img/pic/harddisk.jpg',
        title: 'Hardware Solutions',
        description: 'Computer hardware maintenance and optimization services'
    },
    {
        image: 'img/pic/desktop.jpg',
        title: 'Desktop Applications',
        description: 'Cross-platform desktop application development'
    },
    {
        image: 'img/pic/typescript.jpg',
        title: 'TypeScript Development',
        description: 'Type-safe JavaScript development with modern tooling'
    },
    {
        image: 'img/pic/pc-repairs.jpg',
        title: 'PC Repairs & Maintenance',
        description: 'Professional computer repair and maintenance services'
    },
    {
        image: 'img/pic/mobile.jpg',
        title: 'Mobile Development',
        description: 'iOS and Android mobile application development'
    },
    {
        image: 'img/pic/ict.jpg',
        title: 'ICT Solutions',
        description: 'Information and Communication Technology services'
    }
];

// Slideshow state
let currentSlide = 0;
let isAutoPlaying = true;
let autoPlayInterval;
let progressInterval;

// DOM elements
const mainImage = document.getElementById('main-image');
const imageTitle = document.getElementById('image-title');
const imageDescription = document.getElementById('image-description');
const thumbnails = document.querySelectorAll('.thumbnail');
const progressFill = document.getElementById('progress-fill');

// Initialize slideshow
function initSlideshow() {
    updateSlide();
    startAutoPlay();
    startProgressBar();
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add touch/swipe support for mobile
    addTouchSupport();
}

// Update slide display
function updateSlide() {
    const slide = slideshowData[currentSlide];
    
    // Update main image with fade effect
    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.src = slide.image;
        mainImage.style.opacity = '1';
    }, 150);
    
    // Update text content
    imageTitle.textContent = slide.title;
    imageDescription.textContent = slide.description;
    
    // Update thumbnails
    updateThumbnails();
    
    // Update progress bar
    updateProgressBar();
}

// Update thumbnail states
function updateThumbnails() {
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.remove('active');
        if (index === currentSlide) {
            thumbnail.classList.add('active');
        }
    });
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentSlide + 1) / slideshowData.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// Start progress bar animation
function startProgressBar() {
    progressInterval = setInterval(() => {
        if (isAutoPlaying) {
            const currentProgress = parseFloat(progressFill.style.width) || 0;
            const increment = 100 / (slideshowData.length * 50); // 50 seconds per slide
            
            if (currentProgress >= 100) {
                nextSlide();
            } else {
                progressFill.style.width = `${currentProgress + increment}%`;
            }
        }
    }, 100);
}

// Navigate to specific slide
function goToSlide(index) {
    if (index >= 0 && index < slideshowData.length) {
        currentSlide = index;
        updateSlide();
        resetAutoPlay();
    }
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slideshowData.length;
    updateSlide();
    resetAutoPlay();
}

// Previous slide
function previousSlide() {
    currentSlide = currentSlide === 0 ? slideshowData.length - 1 : currentSlide - 1;
    updateSlide();
    resetAutoPlay();
}

// Start auto-play
function startAutoPlay() {
    if (isAutoPlaying) {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000); // 5 seconds per slide
    }
}

// Stop auto-play
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Reset auto-play timer
function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Toggle auto-play
function toggleAutoPlay() {
    isAutoPlaying = !isAutoPlaying;
    if (isAutoPlaying) {
        startAutoPlay();
    } else {
        stopAutoPlay();
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
    switch(event.key) {
        case 'ArrowLeft':
            previousSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
        case ' ':
            event.preventDefault();
            toggleAutoPlay();
            break;
        case 'Escape':
            stopAutoPlay();
            break;
    }
}

// Add touch/swipe support
function addTouchSupport() {
    const mainPreview = document.querySelector('.main-preview');
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    mainPreview.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    mainPreview.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Check if it's a horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                previousSlide();
            }
        }
    });
}

// Add hover effects for thumbnails
function addThumbnailEffects() {
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseenter', () => {
            if (!thumbnail.classList.contains('active')) {
                thumbnail.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        thumbnail.addEventListener('mouseleave', () => {
            if (!thumbnail.classList.contains('active')) {
                thumbnail.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Add smooth transitions
function addSmoothTransitions() {
    // Add fade-in animation to main image
    mainImage.addEventListener('load', () => {
        mainImage.classList.add('fade-in');
        setTimeout(() => {
            mainImage.classList.remove('fade-in');
        }, 500);
    });
    
    // Add slide-in animation to text
    const textElements = [imageTitle, imageDescription];
    textElements.forEach(element => {
        element.classList.add('slide-in');
        setTimeout(() => {
            element.classList.remove('slide-in');
        }, 500);
    });
}

// Add click outside to pause functionality
function addClickOutsidePause() {
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.slideshow-container')) {
            stopAutoPlay();
        }
    });
}

// Add fullscreen support
function addFullscreenSupport() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    
    // Double-click to toggle fullscreen
    slideshowContainer.addEventListener('dblclick', () => {
        if (!document.fullscreenElement) {
            slideshowContainer.requestFullscreen().catch(err => {
                console.log('Fullscreen request failed:', err);
            });
        } else {
            document.exitFullscreen();
        }
    });
}

// Add accessibility features
function addAccessibilityFeatures() {
    // Add ARIA labels
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons[0].setAttribute('aria-label', 'Previous slide');
    controlButtons[1].setAttribute('aria-label', 'Next slide');
    
    // Add focus management
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.setAttribute('tabindex', '0');
        thumbnail.setAttribute('role', 'button');
        thumbnail.setAttribute('aria-label', `Go to slide ${index + 1}`);
        
        thumbnail.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    addThumbnailEffects();
    addSmoothTransitions();
    addClickOutsidePause();
    addFullscreenSupport();
    addAccessibilityFeatures();
    
    // Add CSS transitions
    mainImage.style.transition = 'opacity 0.3s ease';
    imageTitle.style.transition = 'all 0.3s ease';
    imageDescription.style.transition = 'all 0.3s ease';
});

// Export functions for global access
window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.toggleAutoPlay = toggleAutoPlay; 