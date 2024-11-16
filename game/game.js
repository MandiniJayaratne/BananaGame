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

  //highet score update
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

  //  start the timer
  function startTimer() {
    clearInterval(timerInterval);
    timeRemaining = 60;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        // Update the highest score when time is up
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
            alert("Time's up! Game over!");
            window.location.reload(); // Reload the page or reset the game
          })
          .catch((error) => {
            console.error("Error updating high score:", error);
          });
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

  // Fetch a new question and display it
  async function fetchGameData() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      gameImage.src = data.question;
      gameImage.style.display = "block";
      return data.solution;
    } catch (error) {
      console.error("Error fetching data:", error);
      resultMessage.textContent = "Error loading game data.";
    }
  }

  // Load the first question
  fetchGameData().then((solution) => {
    correctSolution = solution;
    startTimer(); // Start the timer immediately after loading the first question
  });

  // Update the answer form event listener
  answerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userAnswer = parseInt(userAnswerInput.value, 10);

    if (userAnswer === correctSolution) {
      resultMessage.textContent = "Correct Answer!";
      resultMessage.style.color = "green";
      gameContainer.classList.add("correct-answer");
      answerForm.style.display = "none";
      currentScore++;
      scoreDisplay.textContent = currentScore;

      if (currentScore > 5) {
        updateLevel(2); // Update the level to 2
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
          startTimer(); // Restart the timer for the next question
        });
      }, 3000); // Wait for 3 seconds before loading the next question
    } else {
      resultMessage.textContent = "Incorrect. Try again!";
      resultMessage.style.color = "red";
    }

    userAnswerInput.value = "";
  });

  // Function to update the high score in the backend
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
