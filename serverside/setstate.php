<?php
$id = $_POST["id"];
$data = file_get_contents("instance.csv");
$data = preg_replace(
    "/^" . $id . ",(.*),(.*)$/m",
    $id . "," . $_POST["character"] . "," . $_POST["pushing"], $data
);
file_put_contents("instance.csv", $data);
?>
