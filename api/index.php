<?php
require_once('conexion.php');
//se instancia la clase database.
$database = new Database();
// verificamos que metodo se va a recibir, y asi realizar el crud.
if ($_SERVER['REQUEST_METHOD'] === 'GET') {


    $email = isset($_GET['correo']) && filter_var($_GET['correo'], FILTER_VALIDATE_EMAIL) ?  $_GET['correo'] : false;

    $pass = isset($_GET['pass']) && !preg_match("/[^a-zA-Z0-9@._-]/", $_GET['pass']) ?  $_GET['pass'] : false;

    if ($email && $pass) {
        // Preparando la consulta
        $query = $database->getConexion()->prepare("SELECT * FROM usuarios WHERE correo like :email AND contrasena=:password");
        // Asignar valores a los placeholders
        $query->bindValue(':email', $email, PDO::PARAM_STR);
        $query->bindValue(':password', $pass, PDO::PARAM_STR);
        // Ejecutar la consulta
        $query->execute();
        $results = $query->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($results);
    } else {
        echo "datos incorrectos $email  y  $pass";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
}
