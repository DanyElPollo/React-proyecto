<?php

require_once ("conexion.php");

$database = new Database();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    $email = $_GET['correo'];
    $password  =$_GET['pass'];

    echo $database->getDatos("SELECT * FROM usuarios WHERE correo like '$email' AND contrasena='$password' ;");
    }

    // http://localhost/back-end/login.php?correo=dan15@hotmail&pass=password