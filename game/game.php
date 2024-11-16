<?php
session_start();


if (!isset($_SESSION['username'])) {
    header("Location: ../authenticate/login.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Banana Game</title>
    <link rel="stylesheet" href="game.css" />
</head>
<body>
    <div class="container">
    <div class="scoreboard">
    <h3 id="player-name">Player: <?php echo htmlspecialchars($_SESSION['username']); ?></h3>
    <div class="score-item">
        <h3 class="score-title">Level:</h3>
        <div class="score-box" id="level">1</div>
    </div>
    <div class="score-item">
        <h3 class="score-title">Score:</h3>
        <div class="score-box" id="score">0</div>
    </div>
    <div class="score-item">
        <h3 class="score-title">Highest Score:</h3>
        <div class="score-box" id="highest-score"><?php echo $_SESSION['highest_score']; ?></div>
    </div>
    <div class="score-item">
        <h3 class="score-title">Time Remaining:</h3>
        <div class="score-box" id="timer">01:00</div>
    </div>
</div>
 <div class="game-container">
        <h2>Guess the Answer</h2>
        <div id="image-container">
             <img id="game-image" src="" alt="Game Image" />
        </div>
            <form id="answer-form">
                <label for="user-answer">Enter your answer:</label>
                <input type="number" id="user-answer" required />
                <button type="submit">Submit</button>
            </form>
            <p id="result-message"></p>
        </div>
    </div>
    <a href="../authenticate/logout.php" class="logout-btn">Logout</a>

    <script src="game.js"></script>
</body>
</html>
