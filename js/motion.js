
document.addEventListener("DOMContentLoaded", function () {
  const heading = document.getElementById("typing-heading");
  const text = "Welcome to my portifolio!";
  let index = 0;

  function type() {
    if (index <= text.length) {
      heading.textContent = text.slice(0, index);
      index++;
      setTimeout(type, 100); // Adjust typing speed here (ms)
    }
  }

  type();
});


document.addEventListener("DOMContentLoaded", function () {
  const content = document.getElementById("typing-content");
  const text = "I am a software and web developer with a passion for creating innovative solutions to complex problems. I am a quick learner and I am always looking for new challenges. My expertise lies in building scalable and efficient software and web applications using modern technologies. I specialize in creating user-friendly interfaces and optimizing performance for seamless user experiences.";
  let index = 0;

  function type() {
    if (index <= text.length) {
      content.textContent = text.slice(0, index);
      index++;
      setTimeout(type, 100); // Adjust typing speed here (ms)
    }
  }

  type();
});


document.querySelectorAll('.nav-item a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    // Toggle active class
    if (link.classList.contains('active')) {
      link.classList.remove('active');
    } else {
      // Remove active from all
      document.querySelectorAll('.nav-item a.active').forEach(activeLink => activeLink.classList.remove('active'));
      link.classList.add('active');
    }
  });
});


document.querySelector('.container').addEventListener('mouseenter', () => {
  document.querySelector('.container').focus();
});

document.querySelector('.container').addEventListener('mouseleave', () => {
  document.querySelector('.container').blur();
});


const slideshow = document.querySelector('.card-shuffle-slideshow');
const cards = Array.from(slideshow.querySelectorAll('.card'));
const states = ['state-0', 'state-1', 'state-2'];

// Initialize cards with their states
function initializeCards() {
  cards.forEach((card, index) => {
    card.classList.add(states[index]);
  });
}

// Rotate the states for each card to simulate the shuffle
function shuffleCards() {
  cards.forEach(card => {
    // Find current state index
    let currentIndex = states.findIndex(state => card.classList.contains(state));
    // Remove current state class
    card.classList.remove(states[currentIndex]);
    // Add next state class cycling through states
    let nextIndex = (currentIndex + 1) % states.length;
    card.classList.add(states[nextIndex]);
  });
}

// Start automatic shuffle every 5 seconds
let shuffleInterval;

slideshow.addEventListener('focus', () => {
  if (!shuffleInterval) {
    shuffleInterval = setInterval(shuffleCards, 5000);
  }
});

slideshow.addEventListener('blur', () => {
  clearInterval(shuffleInterval);
  shuffleInterval = null;
});

// Also start shuffle automatically on page load
initializeCards();
shuffleInterval = setInterval(shuffleCards, 5000);
