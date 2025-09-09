<script>
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
  const startBtn = document.getElementById("start-btn");

  // Secret game codes (retro removed)
  const secretCodes = {
    factr1: "games/fnaf1/index.html",
    factr2: "games/fnaf2/index.html",
    hl_theorem: "games/half-life/index.html",
    piegraph: "games/pizzatower/index.html",
    base_rule: "games/baldis-basics/index.html",
    tail_x: "games/undertale/index.html",
    kinderfx: "games/kindergarten/index.html",
    deltarunefx: "games/deltarune/index.html",
    lg_area: "games/luigi/index.html",
    sail_var: "games/windwaker/index.html"
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

  // ✅ FIXED start button event
  startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    quizArea.classList.remove("hidden");
    resultArea.classList.add("hidden");
    startTime = Date.now();
    currentQuestion = 0;
    correctCount = 0;
    feedbackEl.textContent = "";
    answerCodeInput.value = "";
    showQuestion();
    answerCodeInput.focus();
  });

  retryBtn.addEventListener("click", () => {
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

    // Check for secret code
    if (secretCodes[userInput]) {
      document.body.style.transition = "opacity 0.5s";
      document.body.style.opacity = 0;

      setTimeout(() => {
        document.body.innerHTML = "";
        document.head.innerHTML = "";
        window.location.href = secretCodes[userInput];
      }, 500);
      return;
    }

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

  answerCodeInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") submitBtn.click();
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
</script>
