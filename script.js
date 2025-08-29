const startScreen = document.getElementById("start-screen");
const quizArea = document.getElementById("quiz-area");
const resultArea = document.getElementById("result-area");

const questionEl = document.getElementById("question");
const answerCodeInput = document.getElementById("answer-code-input");
const submitBtn = document.getElementById("submit-btn");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progress");

const scoreText = document.getElementById("score-text");
const timeText = document.getElementById("time-text");
const retryBtn = document.getElementById("retry-btn");

const unlockedLink = document.getElementById("unlocked-link");

const secretCodes = {
  factr1: "games/alpha_r1/index.html",
  factr2: "games/alpha_r2/index.html",
  delta1: "games/hellcore/index.html",
  delta2: "games/hellcore_ex/index.html",
  thetaq: "games/theta_pkg/index.html",
  thetaq2: "games/theta_pkg2/index.html",
  hl_theorem: "games/hl_mod/index.html",
  piegraph: "games/pie_glyph/index.html",
  base_rule: "games/br_logic/index.html",
  tail_x: "games/tx_core/index.html",
  kinderfx: "games/kfx_alpha/index.html",
  deltarunefx: "games/dfx_system/index.html",
  w3matrix: "games/fortwolf/index.html",
  lg_area: "games/lg_module/index.html",
  sail_var: "games/sv_graph/index.html",
  earthfx: "games/efx_code/index.html"
};

const questions = [
  { question: "Find the derivative of f(x) = 3x^4 - 5x^2 + 7.", answer: "12x^3 - 10x" },
  { question: "Evaluate the integral ∫ (2x^3 - 4x) dx.", answer: "1/4x^4 - 2x^2 + C" },
  { question: "Simplify the expression: (2x^2)(3x^3).", answer: "6x^5" },
  { question: "Solve for x: 2x + 3 = 7.", answer: "2" },
  { question: "Find d/dx sin(x^2).", answer: "2x cos(x^2)" },
  { question: "Evaluate ∫ e^(2x) dx.", answer: "1/2 e^(2x) + C" },
  { question: "Simplify (x^3 y^2) / (x y).", answer: "x^2 y" },
  { question: "Find derivative of ln(3x).", answer: "1/x" },
  { question: "Solve for x: x^2 - 5x + 6 = 0.", answer: "2 or 3" },
  { question: "Find d/dx (x^2 sin x).", answer: "2x sin x + x^2 cos x" }
];

let currentQuestion = 0;
let correctCount = 0;
let startTime, endTime;

const startBtn = document.getElementById("start-btn");
const retryBtnElem = document.getElementById("retry-btn");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizArea.classList.remove("hidden");
  resultArea.classList.add("hidden");
  startTime = Date.now();
  currentQuestion = 0;
  correctCount = 0;
  feedbackEl.textContent = "";
  unlockedLink.textContent = "";
  answerCodeInput.value = "";
  showQuestion();
  answerCodeInput.focus();
});

retryBtnElem.addEventListener("click", () => {
  currentQuestion = 0;
  correctCount = 0;
  feedbackEl.textContent = "";
  scoreText.textContent = "";
  timeText.textContent = "";
  resultArea.classList.add("hidden");
  quizArea.classList.remove("hidden");
  answerCodeInput.value = "";
  answerCodeInput.focus();
  startTime = Date.now();
  showQuestion();
});

submitBtn.addEventListener("click", () => {
  const userInput = answerCodeInput.value.trim().toLowerCase();

  // Check if input matches a game code first
  if (secretCodes[userInput]) {
    unlockedLink.innerHTML = `Unlocked: <a href="${secretCodes[userInput]}" target="_blank">${userInput}</a>`;
    answerCodeInput.value = "";
    feedbackEl.textContent = ""; // no feedback on game code entry
    return;
  }

  // Otherwise treat as answer to current question
  const correctAnswer = questions[currentQuestion].answer.toLowerCase();

  if (userInput === correctAnswer) {
    feedbackEl.textContent = "Correct";
    correctCount++;
    currentQuestion++;
    answerCodeInput.value = "";
    if (currentQuestion >= questions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  } else {
    feedbackEl.textContent = "Wrong, try again";
  }
});

function showQuestion() {
  feedbackEl.textContent = "";
  questionEl.textContent = questions[currentQuestion].question;
  progressEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function endQuiz() {
  endTime = Date.now();
  quizArea.classList.add("hidden");
  resultArea.classList.remove("hidden");

  const timeTaken = (endTime - startTime) / 1000;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = (timeTaken % 60).toFixed(1);

  scoreText.textContent = `Score: ${((correctCount / questions.length) * 100).toFixed(1)}%`;
  timeText.textContent = `Time: ${minutes}m ${seconds}s`;
}
