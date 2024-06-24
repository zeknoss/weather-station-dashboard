<?php
require ('_inc/helpers.php');
$config = getConfig();

echo json_encode(['lat' => $config['lat'], 'lng' => $config['lng'], 'timezone' => $config['timezone']]);
