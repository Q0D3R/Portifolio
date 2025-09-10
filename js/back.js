const list = document.querySelectorAll('.list');

function activeLink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) => item.addEventListener('click', activeLink));

// Optionally animate progress bars on scroll
document.addEventListener('DOMContentLoaded', function () {
    const bars = document.querySelectorAll('.skill-progress');
    bars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
});

// Reveal on scroll animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 80) {
            el.classList.add('is-visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Contact form (demo only)
document.querySelector('.contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out! I will get back to you soon.');
    this.reset();
});