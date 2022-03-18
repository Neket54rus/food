<?php
$_POST = json_decode(file_get_contents('php://input'), true); // //настройки для отправки в json формате
echo var_dump($_POST);