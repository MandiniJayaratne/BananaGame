<?php
session_start();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['highest_score'])) {
        $highest_score = $data['highest_score'];

       
        $_SESSION['highest_score'] = $highest_score;

       

       
        try {
            $pdo = new PDO('mysql:host=localhost;dbname=banana_game_db', 'root', '');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $pdo->prepare("UPDATE users SET highest_score = :highest_score WHERE username = :username");
            $stmt->execute([
                'highest_score' => $highest_score,
                'username' => $_SESSION['username'] 
            ]);
            echo json_encode(['message' => 'High score updated successfully']);
        } catch (PDOException $e) {
            echo json_encode(['message' => 'Error updating high score: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['message' => 'No score data received']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method']);
}
?>
