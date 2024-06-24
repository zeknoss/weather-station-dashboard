<?php
function getConfig ()
{
    $configPath = dirname(__DIR__) . '/.env';
    $config = file_exists($configPath) ? parse_ini_file($configPath) : [
        'protected' => false,
        'user' => null,
        'pass' => null,
        'lng' => null,
        'lat' => null,
    ];
    return array_change_key_case($config, CASE_LOWER);
}
