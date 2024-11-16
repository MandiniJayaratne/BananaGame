<?php

session_start();
include_once '../db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if the username already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Username already taken. Please choose another.";
    } else {
        // Hash the password and set the initial highest score to 0
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $highest_score = 0;

        // Insert new user into the database
        $stmt = $conn->prepare("INSERT INTO users (username, password, highest_score) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $username, $hashed_password, $highest_score);

        if ($stmt->execute()) {
            header("Location: ../interfaces/getStarted.html");
        exit();
        } else {
            echo "Error: " . $stmt->error;
        }
    }
    $stmt->close();
    $conn->close();
}
?>
