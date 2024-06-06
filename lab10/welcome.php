<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $city = htmlspecialchars($_POST['city']);
    echo "<h1>Welcome to " . $city . "!</h1>";
}
?>
