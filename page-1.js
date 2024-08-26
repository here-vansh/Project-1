const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg-image');
const nameElement = document.querySelector('.name');

let load = 0;
let int = setInterval(blurring, 30);
let typingStarted = false;
let isBackspacing = false;
let nameText = 'Vansh';
let developerText = 'a Developer';
let currentText = '';
let textIndex = 0;
let typingDelay = 100;

function blurring() {
  load++;
  if (load > 99) {
    clearInterval(int);
    startTyping();
  }
  loadText.textContent = `${load}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 20, 0)}px)`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function startTyping() {
  if (!typingStarted) {
    typingStarted = true;
    typeWriter();
  }
}

function typeWriter() {
  if (!isBackspacing) {
    if (textIndex < nameText.length) {
      currentText += nameText[textIndex];
      nameElement.textContent = currentText;
      textIndex++;
      setTimeout(typeWriter, typingDelay);
    } else {
      isBackspacing = true;
      setTimeout(typeWriter, 1000); // Pause before starting to backspace
    }
  } else {
    if (textIndex > 0) {
      currentText = currentText.slice(0, --textIndex);
      nameElement.textContent = currentText;
      setTimeout(typeWriter, 50); // Faster backspacing
    } else {
      isBackspacing = false;
      nameText = developerText; // Switch to the new text
      textIndex = 0;
      setTimeout(typeWriter, 500); // Pause before typing the new text
    }
  }
}