// Location data
const locationData = {
  questionOne: [
    { id: 'italy', name: 'Italy', x: 180, y: 210 },
    { id: 'spain', name: 'Spain', x: 140, y: 220 },
    { id: 'uk', name: 'United Kingdom', x: 155, y: 150 },
    { id: 'australia', name: 'Australia', x: 250, y: 400 }
  ],
  questionTwo: [
    { id: 'france', name: 'France', x: 160, y: 180 },
    { id: 'germany', name: 'Germany', x: 180, y: 160 },
    { id: 'egypt', name: 'Egypt', x: 220, y: 250 },
    { id: 'japan', name: 'Japan', x: 260, y: 200 }
  ]
};

// State management
let currentStep = 1;
let feedbackTimeout;

// DOM Elements
const questionOne = document.getElementById('question-one');
const questionTwo = document.getElementById('question-two');
const videoScreen = document.getElementById('video-screen');
const pinsQ1 = document.getElementById('pins-q1');
const pinsQ2 = document.getElementById('pins-q2');
const feedbackQ1 = document.getElementById('feedback-q1');
const feedbackQ2 = document.getElementById('feedback-q2');
const video = document.getElementById('reward-video');
const muteToggle = document.getElementById('mute-toggle');

// Initialize pins
function createPin(location, container, questionNumber) {
  const pin = document.createElement('div');
  pin.className = 'pin';
  pin.style.left = `${location.x}px`;
  pin.style.top = `${location.y}px`;
  
  pin.innerHTML = `
    <svg class="pin-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
    <span class="pin-label">${location.name}</span>
  `;

  pin.addEventListener('click', () => handleAnswer(location.id, questionNumber));
  container.appendChild(pin);
}

// Initialize both questions
locationData.questionOne.forEach(location => createPin(location, pinsQ1, 1));
locationData.questionTwo.forEach(location => createPin(location, pinsQ2, 2));

// Handle answers
function handleAnswer(country, questionNumber) {
  const correctAnswer = questionNumber === 1 ? 'italy' : 'france';
  const isCorrect = country.toLowerCase() === correctAnswer;
  const feedback = questionNumber === 1 ? feedbackQ1 : feedbackQ2;
  
  clearTimeout(feedbackTimeout);
  
  feedback.className = `feedback-message ${isCorrect ? 'correct' : 'incorrect'}`;
  feedback.innerHTML = isCorrect
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span>Correct! Well done!</span>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><span>Incorrect. Try again!</span>';
  
  feedback.classList.remove('hidden');

  if (isCorrect) {
    feedbackTimeout = setTimeout(() => {
      currentStep++;
      updateScreen();
    }, 1500);
  } else {
    feedbackTimeout = setTimeout(() => {
      feedback.classList.add('hidden');
    }, 2000);
  }
}

// Screen management
function updateScreen() {
  switch(currentStep) {
    case 1:
      questionOne.classList.remove('hidden');
      questionTwo.classList.add('hidden');
      videoScreen.classList.add('hidden');
      break;
    case 2:
      questionOne.classList.add('hidden');
      questionTwo.classList.remove('hidden');
      videoScreen.classList.add('hidden');
      break;
    case 3:
      questionOne.classList.add('hidden');
      questionTwo.classList.add('hidden');
      videoScreen.classList.remove('hidden');
      break;
  }
}

// Video controls
muteToggle.addEventListener('click', () => {
  video.muted = !video.muted;
  muteToggle.querySelector('.volume-x').classList.toggle('hidden');
  muteToggle.querySelector('.volume-2').classList.toggle('hidden');
});