<?php
$inst = fopen("instance.csv", "r");
if ($inst && flock($inst, LOCK_SH)) {
    $players = [];
    while (!feof($inst)) {
        $row = fgetcsv($inst);
        if ($row) {
            $players[$row[0]] = $row[1];
        }
    }
    flock($inst, LOCK_UN);
    fclose($inst);
}
echo json_encode($players);
?>
