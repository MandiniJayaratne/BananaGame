document.addEventListener("DOMContentLoaded", () => {
  const scoreDisplay = document.getElementById("score");
  const highestScoreDisplay = document.getElementById("highest-score");
  const resultMessage = document.getElementById("result-message");
  const answerForm = document.getElementById("answer-form");
  const userAnswerInput = document.getElementById("user-answer");
  const gameImage = document.getElementById("game-image");
  const gameContainer = document.querySelector(".game-container");
  const timerDisplay = document.getElementById("timer");
  const container = document.querySelector(".container");
  const logoutButton = document.querySelector(".logout-btn");

  const apiUrl = "https://marcconrad.com/uob/banana/api.php?out=json";

  let currentScore = 0;
  let highestScore = parseInt(highestScoreDisplay.textContent);
  let correctSolution = null;
  let timeRemaining = 60;
  let timerInterval;
  let level = 1;

  logoutButton.addEventListener("click", () => {
    fetch("update_high_score.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ highest_score: highestScore }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error updating high score:", error);
      });
  });

  function startTimer() {
    clearInterval(timerInterval);

    let intervalTime = level === 2 ? 40 : 60;
    timeRemaining = intervalTime;
    updateTimerDisplay();

    const timesUpMessage = document.getElementById("times-up-message");
    timesUpMessage.classList.add("hidden");

    timerInterval = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);

        timesUpMessage.textContent = "Time's up! Game Over!";
        timesUpMessage.classList.remove("hidden");

        fetch("update_high_score.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ highest_score: highestScore }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
          })
          .catch((error) => {
            console.error("Error updating high score:", error);
          });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        timeRemaining--;
        updateTimerDisplay();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
    const seconds = String(timeRemaining % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
  }

  async function fetchGameData() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      gameImage.src = data.question;
      gameImage.style.display = "block";
      return data.solution;
    } catch (error) {
      console.error("Error fetching data:", error);
      resultMessage.textContent = "ERROR LOADING GAME DATA.";
    }
  }

  fetchGameData().then((solution) => {
    correctSolution = solution;
    startTimer();
  });

  answerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userAnswer = parseInt(userAnswerInput.value, 10);

    if (userAnswer === correctSolution) {
      resultMessage.textContent = "CORRECT ANSWER!";
      resultMessage.style.color = "green";
      gameContainer.classList.add("correct-answer");
      answerForm.style.display = "none";
      currentScore++;
      scoreDisplay.textContent = currentScore;

      if (currentScore > 3 && level === 1) {
        level = 2;
        document.getElementById("level").textContent = level;
        console.log("Level updated to:", level);
        startTimer();
      }

      if (currentScore > highestScore) {
        highestScore = currentScore;
        highestScoreDisplay.textContent = highestScore;
        updateHighScore(highestScore);
      }

      clearInterval(timerInterval);
      setTimeout(() => {
        gameContainer.classList.remove("correct-answer");
        answerForm.style.display = "block";
        resultMessage.textContent = "";
        fetchGameData().then((solution) => {
          correctSolution = solution;
          startTimer();
        });
      }, 3000);
    } else {
      resultMessage.textContent = "OOPS WRONG ANSWER!";
      resultMessage.style.color = "red";
    }

    userAnswerInput.value = "";
  });

  console.log("Current Score:", currentScore);
  console.log("Level:", level);

  function updateHighScore(newHighScore) {
    fetch("update_high_score.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ highest_score: newHighScore }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error updating high score:", error);
      });
  }
});
