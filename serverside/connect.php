<?php
$inst = fopen("instance.txt", "a+");
if ($inst && flock($inst, LOCK_EX)) {
    $ids = explode(PHP_EOL, fread($inst, 2048));
    do {
        $id = rand();
    } while (in_array($id, $ids));
    fwrite($inst, $id . PHP_EOL);
    flock($inst, LOCK_UN);
    fclose($inst);
}
echo $id;
?>
