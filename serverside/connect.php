<?php
$inst = fopen("instance.csv", "a+");
if ($inst && flock($inst, LOCK_EX)) {
    $id = rand();
    fputcsv($inst, [$id, $_POST["character"]]);
    flock($inst, LOCK_UN);
    fclose($inst);
}
echo $id;
?>
