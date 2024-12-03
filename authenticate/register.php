<?php

session_start();
include_once '../db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Username already taken. Please choose another.";
    } else {
        
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $highest_score = 0;

        
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
