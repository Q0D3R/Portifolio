document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const pageSections = document.querySelectorAll('.page-section');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');

      // Get target section id
      const targetId = this.getAttribute('data-target');
      if (targetId) {
        // Hide all sections
        pageSections.forEach(section => {
          section.style.display = 'none';
        });

        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.style.display = 'block';

          // Trigger scroll reveal animations for newly visible elements
          if (typeof revealOnScroll === 'function') {
            // Small timeout to allow DOM display update
            setTimeout(revealOnScroll, 50);
          }
        }
      }
    });
  });
});

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
  const reveals = document.querySelectorAll('.reveal-on-scroll, .reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add('is-visible', 'active');
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



// JavaScript for tab switching and AJAX auth
document.addEventListener('DOMContentLoaded', function () {
  // Tab switching
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const forgotForm = document.getElementById('forgot-form');
  const showForgot = document.getElementById('show-forgot');
  const backToLogin = document.getElementById('back-to-login');
  const showSignUp = document.getElementById('show-register');

  function showForm(form) {
    [loginForm, registerForm, forgotForm].forEach(f => f.classList.remove('active'));
    form.classList.add('active');
  }

  function setActiveTab(tab) {
    [loginTab, registerTab].forEach(t => t.classList.remove('active'));
    if (tab) tab.classList.add('active');
  }

  loginTab.onclick = () => { showForm(loginForm); setActiveTab(loginTab); };
  registerTab.onclick = () => { showForm(registerForm); setActiveTab(registerTab); };
  showForgot.onclick = (e) => { e.preventDefault(); showForm(forgotForm); setActiveTab(null); };
  backToLogin.onclick = (e) => { e.preventDefault(); showForm(loginForm); setActiveTab(loginTab); };
  showSignUp.onclick = (e) => { e.preventDefault(); showForm(registerForm); setActiveTab(registerTab); };

  // AJAX helpers
  function postForm(form, action, messageDivId) {
    const formData = new FormData(form);
    formData.append('action', action);
    fetch(window.location.href, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(r => r.json())
      .then(data => {
        const msgDiv = document.getElementById(messageDivId);
        msgDiv.innerHTML = `<div class="${data.success ? 'auth-success' : 'auth-error'}">${data.message}</div>`;
        if (data.success && action === 'register') {
          setTimeout(() => { showForm(loginForm); setActiveTab(loginTab); }, 1200);
        }
        if (data.success && action === 'login') {
          setTimeout(() => { window.location.href = 'index.html'; }, 1200);
        }
        if (data.success && action === 'forgot') {
          setTimeout(() => { showForm(loginForm); setActiveTab(loginTab); }, 1500);
        }
      })
      .catch(() => {
        const msgDiv = document.getElementById(messageDivId);
        msgDiv.innerHTML = `<div class="auth-error">Server error. Please try again.</div>`;
      });
  }

  loginForm.onsubmit = function (e) {
    e.preventDefault();
    postForm(loginForm, 'login', 'login-message');
  };
  registerForm.onsubmit = function (e) {
    e.preventDefault();
    postForm(registerForm, 'register', 'register-message');
  };
  forgotForm.onsubmit = function (e) {
    e.preventDefault();
    postForm(forgotForm, 'forgot', 'forgot-message');
  };
});

// Theme switch logic
document.addEventListener('DOMContentLoaded', function () {
  const themeSwitch = document.getElementById('themeSwitch');
  if (themeSwitch) {
    // Check local storage for preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeSwitch.checked = true;
    } else if (savedTheme === 'light') {
      document.body.classList.remove('dark-theme');
      themeSwitch.checked = false;
    } else {
      // Default based on current body class or prefers-color-scheme
      if (document.body.classList.contains('dark-theme')) {
        themeSwitch.checked = true;
      }
    }

    themeSwitch.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  }
});
