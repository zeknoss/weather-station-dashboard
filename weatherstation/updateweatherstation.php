<?php
include ('../_inc/helpers.php');

$config = getConfig();

if ($config['protected'] === true && $_GET['ID'] !== $config['user'] && $_GET['PASSWORD'] !== $config['pass'])
    die('nope');

file_put_contents('../storage/report.json', json_encode(array_merge($_GET, $_POST)));
