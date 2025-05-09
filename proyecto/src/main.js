// Definir la lista de palabras posibles al principio
const GUESSABLE_WORDS = [
  "audio", "banco", "cajas", "dulce", "error",
  "fuego", "gente", "huevo", "islas", "jugar",
  "luzca", "manos", "naran", "negro", "oroja",
  "perro", "queso", "rojo", "silla", "tigre"
];

// Constantes globales
const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
let currentRow = 0;
let secretWord = pickRandomWord();

// Función para elegir una palabra aleatoria
function pickRandomWord() {
  return GUESSABLE_WORDS[Math.floor(Math.random() * GUESSABLE_WORDS.length)];
}

function createBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";

  for (let i = 0; i < MAX_GUESSES; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < WORD_LENGTH; j++) {
      const box = document.createElement("div");
      box.classList.add("letter-box");
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

function submitGuess() {
  const input = document.getElementById("guess-input");
  const message = document.getElementById("message");
  const guess = input.value.toLowerCase().trim();

  if (guess.length !== WORD_LENGTH) {
    message.textContent = "⚠️ La palabra debe tener 5 letras.";
    return;
  }

  if (!GUESSABLE_WORDS.includes(guess)) {
    message.textContent = "❌ Esta palabra no está en la lista.";
    return;
  }

  message.textContent = "";

  const row = document.querySelector(`.row:nth-child(${currentRow + 1})`);
  const letters = row.querySelectorAll(".letter-box");

  const secretLetters = secretWord.split("");
  const guessLetters = guess.split("");

  // Limpiar el contenido previo de la fila
  letters.forEach((box) => {
    box.textContent = "";
    box.className = "letter-box";
  });

  // Marcar las correctas primero
  guessLetters.forEach((letter, index) => {
    const box = letters[index];
    box.textContent = letter;

    if (letter === secretLetters[index]) {
      box.classList.add("correct");
      secretLetters[index] = null;
      guessLetters[index] = null;
    }
  });

  // Marcar las presentes pero en otra posición
  guessLetters.forEach((letter, index) => {
    const box = letters[index];
    if (!letter) return;

    const pos = secretLetters.indexOf(letter);
    if (pos > -1) {
      box.classList.add("present");
      secretLetters[pos] = null;
    } else {
      box.classList.add("absent");
    }
  });

  if (guess === secretWord) {
    message.textContent = `🎉 ¡Felicidades! Adivinaste la palabra: ${secretWord}`;
    disableInput();
    return;
  }

  currentRow++;
  currentGuess = "";

  if (currentRow >= MAX_GUESSES) {
    message.textContent = `💀 Perdiste. La palabra era: ${secretWord}`;
    disableInput();
  }
}

function disableInput() {
  document.getElementById("guess-input").disabled = true;
  document.querySelector("button").disabled = true;
}

function restartGame() {
  currentRow = 0;
  secretWord = pickRandomWord();
  createBoard(); // Genera un nuevo tablero vacío
  document.getElementById("guess-input").disabled = false;
  document.querySelector("button").disabled = false;
  document.getElementById("message").textContent = "";
  document.getElementById("guess-input").value = "";
}

// Iniciar juego al cargar
createBoard();
