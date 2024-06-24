<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$report = __DIR__ . '/storage/report.json';

$contents = json_decode(file_get_contents($report), true);

unset($contents['ID']);
unset($contents['PASSWORD']);

$contents['last_modified'] = date('Y-m-d H:i:s', filemtime($report));

echo json_encode($contents);