const mainSection = document.querySelector('.main-section');

// Add a class on focus to trigger CSS transition (for smoother effect)
mainSection.addEventListener('focus', () => {
    mainSection.classList.add('active');
});

// Remove the class when focus is lost
mainSection.addEventListener('blur', () => {
    mainSection.classList.remove('active');
});


const slideshow = document.querySelector('.card-shuffle-slideshow');
const cards = Array.from(slideshow.querySelectorAll('.card'));
const totalCards = cards.length;

let states = Array.from({ length: totalCards }, (_, i) => `state-${i}`);

// Initialize cards with their states
function initializeCards() {
  cards.forEach((card, index) => {
    card.classList.add(states[index]);
  });
}

// Rotate states: remove current state class and add the next state class in a cyclical manner
function shuffleCards() {
  cards.forEach(card => {
    const currentState = states.find(state => card.classList.contains(state));
    if (!currentState) return;
    card.classList.remove(currentState);
    let currentIndex = states.indexOf(currentState);
    let nextIndex = (currentIndex + 1) % totalCards;
    card.classList.add(states[nextIndex]);
  });
}

// Start automatic shuffle every 5 seconds
let shuffleInterval = setInterval(shuffleCards, 5000);

// Optional: pause shuffle on focus to allow user to stop animation
slideshow.addEventListener('focus', () => {
  clearInterval(shuffleInterval);
});

slideshow.addEventListener('blur', () => {
  shuffleInterval = setInterval(shuffleCards, 5000);
});

// Initialize on page load
initializeCards();
