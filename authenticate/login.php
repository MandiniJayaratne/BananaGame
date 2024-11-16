<?php

session_start();
include_once '../db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Fetch the user and verify the password
    $stmt = $conn->prepare("SELECT id, password, highest_score FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($id, $hashed_password, $highest_score);

    if ($stmt->fetch() && password_verify($password, $hashed_password)) {
        // Set session variables
        $_SESSION['user_id'] = $id;
        $_SESSION['username'] = $username;
        $_SESSION['highest_score'] = $highest_score;

        // Redirect to game.html
        header("Location: ../interfaces/getStarted.html");
        exit();
    } else {
        echo "Invalid username or password.";
    }
    $stmt->close();
    $conn->close();
}
?>
