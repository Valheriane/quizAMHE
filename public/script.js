let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let shuffled = [];

async function loadQuestions() {
  const res = await fetch('/questions');
  const data = await res.json();
  shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 10);
  showQuestion();
}

function showQuestion() {
  const q = shuffled[currentQuestionIndex];

  document.getElementById("question").innerText = `Q${currentQuestionIndex + 1}. ${q.question}`;
  document.getElementById("difficulty").innerText = `Difficulté : ${q.difficulty}`;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.classList.add("choice", "btn-choice");

    btn.onclick = () => {
      const isCorrect = choice === q.answer;
      handleAnswer(isCorrect); // met à jour le score si bon

      // Affiche la couleur
      btn.classList.add(isCorrect ? 'correct' : 'incorrect');
      document.querySelectorAll(".choice").forEach(b => b.disabled = true);

      // Après un délai, on passe à la question suivante
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffled.length) {
          showQuestion();
        } else {
          showResult();
        }
      }, 1000); // délai de 1 seconde pour montrer la couleur
    };

    choicesDiv.appendChild(btn);
  });

  // plus besoin du bouton "Suivant", on peut le cacher
  //document.getElementById("next-btn").classList.add("hidden");
  document.getElementById("next-btn").classList.remove("hidden");
  document.getElementById("next-btn").disabled = true;
}

function handleAnswer(correct) {
  if (correct) score++;
}

document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffled.length) {
    showQuestion();
  } else {
    showResult();
  }
});


function showResult() {
  document.getElementById("question-container").classList.add("hidden");
  document.getElementById("next-btn").classList.add("hidden");

  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");

  document.getElementById("score").innerText = `Tu as eu ${score}/10`;
  const bar = document.getElementById("gauge-bar");
  const percent = score * 10;
  bar.style.width = percent + "%";

  let message = "";
  if (score <= 4) message = "😅 Peut mieux faire...";
  else if (score <= 7) message = "🙂 Pas mal !";
  else message = "🏆 Tu es un expert !";

  document.getElementById("message").innerText = message;
}

document.getElementById("restart-btn").addEventListener("click", () => {
  // Réinitialise l'état du quiz
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("result").classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
  loadQuestions();
});


// Lancer le quiz
loadQuestions();
