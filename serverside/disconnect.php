<?php
$data = file_get_contents("instance.csv");
$data = preg_replace("/^" . $_POST["id"] . ",(.*),(.*)\n/m", "", $data);
file_put_contents("instance.csv", $data);
?>
