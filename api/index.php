<?php
$output=null;
$retval=null;
exec('php artisan migrate', $output, $retval);
require __DIR__ . '/../public/index.php';
