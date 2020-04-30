<?php
$inst = fopen("instance.csv", "r");
if ($inst && flock($inst, LOCK_SH)) {
    $num_pushing = 0;
    $data = [];
    while (!feof($inst)) {
        $row = fgetcsv($inst);
        if ($row) {
            $data[$row[0]] = array_slice($row, 1);
            if ($row[2] === "true") {
                $num_pushing++;
            }
        }
    }
    $speed = $num_pushing;
    $data["speed"] = $speed;
    $progress = file_get_contents("progress.txt");
    $progress += $speed;
    file_put_contents("progress.txt", $progress);
    $data["progress"] = $progress;
    flock($inst, LOCK_UN);
    fclose($inst);
}
echo json_encode($data);
?>
