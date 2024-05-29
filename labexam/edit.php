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

$id = "";
$title = "";
$author = "";
$genre = "";
$publication_date = "";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET["id"])) {
        $id = $_GET["id"];

        $sql = "SELECT * FROM books WHERE id=$id";
        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $title = $row['title'];
            $author = $row['author'];
            $genre = $row['genre'];
            $publication_date = $row['publication_date'];
        }
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $title = $_POST['title'];
    $author = $_POST['author'];
    $genre = $_POST['genre'];
    $publication_date = $_POST['publication_date'];

    $sql = "UPDATE books SET title='$title', author='$author', genre='$genre', publication_date='$publication_date' WHERE id=$id";

    if ($connection->query($sql) === TRUE) {
        header("Location: index.php");
        exit();
    } else {
        echo "Error updating record: " . $connection->error;
    }
}

$connection->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Book</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container my-5">
        <h2>Edit Book</h2>
        <form method="post" action="edit.php">
            <input type="hidden" name="id" value="<?php echo $id; ?>">
            <div class="mb-3">
                <label class="form-label">Title</label>
                <input type="text" class="form-control" name="title" value="<?php echo $title; ?>" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Author</label>
                <input type="text" class="form-control" name="author" value="<?php echo $author; ?>" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Genre</label>
                <input type="text" class="form-control" name="genre" value="<?php echo $genre; ?>" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Publication Date</label>
                <input type="date" class="form-control" name="publication_date" value="<?php echo $publication_date; ?>" required>
            </div>
            <button type="submit" class="btn btn-success">Update</button>
        </form>
    </div>
</body>
</html>
