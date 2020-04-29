<?php
$inst = fopen("instance.csv", "a+");
if ($inst && flock($inst, LOCK_EX)) {
    $ids = explode(PHP_EOL, fread($inst, 2048));
    do {
        $id = rand();
    } while (in_array($id, $ids));
    fputcsv($inst, [$id, $_POST["character"]]);
    flock($inst, LOCK_UN);
    fclose($inst);
}
echo $id;
?>
