 document.addEventListener("DOMContentLoaded", function () {
  loadQuiz(); // make sure the DOM is ready before running
});
 
 
const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Computer Style Sheets",
    correct: "b",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "1997",
    correct: "b",
  },
  {
    question: "Which of the following is a JavaScript framework?",
    a: "Laravel",
    b: "Django",
    c: "React",
    d: "Flask",
    correct: "c",
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    a: "<script>",
    b: "<style>",
    c: "<css>",
    d: "<link>",
    correct: "b",
  },
  {
    question: "What does API stand for?",
    a: "Application Programming Interface",
    b: "Application Process Interface",
    c: "Applied Programming Instruction",
    d: "Advanced Programming Interface",
    correct: "a",
  },
  {
    question: "Which CSS property controls the text size?",
    a: "font-style",
    b: "text-size",
    c: "font-size",
    d: "text-style",
    correct: "c",
  },
  {
    question: "How do you create a function in JavaScript?",
    a: "function = myFunction()",
    b: "function:myFunction()",
    c: "function myFunction()",
    d: "create myFunction()",
    correct: "c",
  },
  {
    question: "Which HTML element do we use to put JavaScript code?",
    a: "<js>",
    b: "<javascript>",
    c: "<code>",
    d: "<script>",
    correct: "d",
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    a: "/* comment */",
    b: "// comment",
    c: "# comment",
    d: "<!-- comment -->",
    correct: "b",
  }
];


const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const timeDisplay = document.getElementById("time");

let currentQuiz = 0;
let score = 0;
let timeLeft = 10;
let timer;
let totalTime = 0;

function loadQuiz() {
  deselectAnswers();
  resetTimer();

  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;

  startTimer();
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

function startTimer() {
  timeLeft = 10;
  timeDisplay.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    totalTime++;
    timeDisplay.innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      autoSubmit(); // automatically move to next
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeDisplay.innerText = "10";
}

function autoSubmit() {
  const answer = getSelected();
  if (answer && answer === quizData[currentQuiz].correct) {
    score++;
  }
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
}

submitBtn.addEventListener("click", () => {
  clearInterval(timer);
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
  }
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz").innerHTML = `
    <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
    <p>Total Time Taken: ${totalTime} seconds</p>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}
