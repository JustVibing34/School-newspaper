const textElement = document.getElementById('typewriter-text');
const cards = document.querySelectorAll('.story-card');
const tabs = document.querySelectorAll('.tab');
const phrase = 'carpe alius diem';
let index = 0;
let deleting = false;

function tick() {
  if (!textElement) return;

  if (!deleting) {
    textElement.textContent = phrase.slice(0, index + 1);
    index += 1;

    if (index === phrase.length) {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    }
  } else {
    textElement.textContent = phrase.slice(0, index - 1);
    index -= 1;

    if (index === 0) {
      deleting = false;
    }
  }

  const delay = deleting ? 70 : 180;
  setTimeout(tick, delay);
}

function toggleStory(card) {
  cards.forEach((storyCard) => {
    const isSelected = storyCard === card;
    storyCard.classList.toggle('active', isSelected);
    storyCard.setAttribute('aria-expanded', String(isSelected));
  });
}

function toggleTab(tab) {
  tabs.forEach((button) => {
    button.classList.toggle('active', button === tab);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  tick();

  cards.forEach((card) => {
    card.addEventListener('click', () => toggleStory(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleStory(card);
      }
    });
  });

  tabs.forEach((tabButton) => {
    tabButton.addEventListener('click', () => toggleTab(tabButton));
  });
});
