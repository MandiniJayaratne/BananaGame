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
    <h3 id="player-name">PLAYER: <?php echo htmlspecialchars($_SESSION['username']); ?></h3>
    <div class="score-item">
        <h3 class="score-title">LEVEL:</h3>
        <div class="score-box" id="level">1</div>
    </div>
    <div class="score-item">
        <h3 class="score-title">SCORE:</h3>
        <div class="score-box" id="score">0</div>
    </div>
    <div class="score-item">
        <h3 class="score-title">HIGHEST SCORE:</h3>
        <div class="score-box" id="highest-score"><?php echo $_SESSION['highest_score']; ?></div>
    </div>
    <div class="score-item">
        <h3 class="score-title">TIME REMAINING:</h3>
        <div class="score-box" id="timer">01:00</div>
        <p id="times-up-message" class="hidden">Time's up! Game over</p>
    </div>
</div>
<div class="game-container">
            <h2>TAKE A GUESS</h2>
            <div id="image-container">
                <img id="game-image" src="" alt="Game Image" />
            </div>
            <form id="answer-form">
                <label for="user-answer">ENTER YOUR ANSWER HERE:</label>
                <input type="number" id="user-answer" required />
                <button type="submit">SUBMIT</button>
            </form>
            <p id="result-message"></p>
        </div>
    </div>

    <div class="bananas">
        <span class="banana">🍌</span>
        <span class="banana">🍌</span>
        <span class="banana">🍌</span>
        <span class="banana">🍌</span>
        <span class="banana">🍌</span>
        <span class="banana">🍌</span>
        <span class="banana">🍌</span>
    </div>

    <a href="../authenticate/logout.php" class="logout-btn">Logout</a>

    <script src="game.js"></script>
</body>
</html>