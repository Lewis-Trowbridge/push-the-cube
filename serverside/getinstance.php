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
    $data["speed"] = $num_pushing ** 2;
    flock($inst, LOCK_UN);
    fclose($inst);
}
echo json_encode($data);
?>
