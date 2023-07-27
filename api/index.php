<?php

exec('php artisan migrate');
require __DIR__ . '/../public/index.php';
