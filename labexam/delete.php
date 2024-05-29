<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "labexam";

// Create connection
$connection = new mysqli($servername, $username, $password, $database);

// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "DELETE FROM books WHERE id=$id";

    if ($connection->query($sql) === TRUE) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error deleting record: " . $connection->error;
    }
}

$connection->close();
?>
