<?php
require_once('conexion.php');
//se instancia la clase database.
$database = new Database();

// verificamos que metodo se va a recibir, y asi realizar el crud.
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Preparando la consulta
    if (isset($_GET['id'])) {
        $query = $database->getConexion()->prepare("SELECT * FROM usuarios WHERE id = :id;");
        $query->bindValue(':id', obtener($_GET['id']), PDO::PARAM_INT);
    } else if (isset($_GET['correo']) && isset($_GET['pass'])) {
        $query = $database->getConexion()->prepare("SELECT * FROM usuarios WHERE correo like :email AND contrasena=:pass;");
        foreach (obtener() as $llave => $valor) {
            $query->bindValue($llave, $valor, PDO::PARAM_STR);
        }
    } else {
        $query = $database->getConexion()->prepare("SELECT * FROM usuarios;");
    }
    //ejecutando
    $query->execute();
    $results = $query->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json');
    echo json_encode($results);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // agregamos en consulta la conexion y preparación del sql
    if ($_GET['id']) {
        $consulta = $database->getConexion()->prepare("UPDATE usuarios SET correo=:correo, contrasena=:cont, tipodoc=:tipoDoc, numdoc=:numDoc, ciudad=:ciudad, edad=:edad WHERE id=:id;");
    } else {
        $consulta = $database->getConexion()->prepare("INSERT INTO usuarios values(:nombre, :apellido, :correo, :cont, :tipoDoc, :numDoc, :ciudad, :edad)");
    }
    // creamos un foreach para realizar el la insercion
    foreach (validacion() as $llave => $valor) {
        $consulta->bindValue($llave, $valor, PDO::PARAM_STR);
    }

    //  enviamos la consulta
    $consulta->execute();
    $result = $consulta->fetchAll(PDO::FETCH_ASSOC);
    //  retornamos valores 
    header('Content-Type: application/json');
    echo json_encode($result);
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $query = $database->getConexion()->prepare("DELETE  FROM usuarios WHERE id=:id");
    $query->bindValue(':id', obtener($_GET['id']), PDO::PARAM_INT);
    //ejecutando
    $query->execute();
    header('Content-Type: application/json');
    // echo json_encode($results);
}

function validacion() {
    $nombre = isset($_POST["nombre"]) && preg_match("/[a-zA-Z]/", $_POST['nombre']) ? $_POST["nombre"] : false;
    $apellido = isset($_POST["apellido"]) && !is_numeric($_POST["apellido"]) ? $_POST["apellido"] : false;
    $correo = isset($_POST["correo"]) && filter_var($_POST['correo'], FILTER_VALIDATE_EMAIL) && preg_match("/[a-zA-Z0-9@_.-]/", $_POST['correo']) ? $_POST["correo"] : false;
    $contrasena = isset($_POST["cont"]) && preg_match("/[a-zA-Z0-9-]/", $_POST['cont']) ? $_POST["cont"] : false;
    $tipoDoc = isset($_POST["tipoDoc"]) && !is_numeric($_POST["tipoDoc"]) && !preg_match("/[0-9@_-]/", $_POST['tipoDoc']) ? $_POST["tipoDoc"] : false;
    $numDoc = isset($_POST["numDoc"]) &&  is_numeric($_POST["numDoc"]) && preg_match("/[0-9]/", $_POST['numDoc']) ? $_POST["numDoc"] : false;
    $ciudad = isset($_POST["ciudad"]) && !is_numeric($_POST["ciudad"]) && preg_match("/[a-zA-Z]/", $_POST['ciudad']) ? $_POST["ciudad"] : false;
    $edad = isset($_POST["edad"]) && is_numeric($_POST["edad"])  && preg_match("/[0-9]/", $_POST['edad']) ? $_POST["edad"] : false;
    if ($nombre && $apellido) {
        return $array = [
            ':nombre' => $nombre,
            ':apellido' => $apellido,
            ':correo' => $correo,
            ':cont' => $contrasena,
            ':tipoDoc' => $tipoDoc,
            ':numDoc' => $numDoc,
            ':ciudad' => $ciudad,
            ':edad' => $edad
        ];
    } else {
        return $array = [
            ':correo' => $correo,
            ':cont' => $contrasena,
            ':tipoDoc' => $tipoDoc,
            ':numDoc' => $numDoc,
            ':ciudad' => $ciudad,
            ':edad' => $edad,
            ':id' => obtener($_GET['id'])
        ];
    }
}


function obtener($valor = null) {
    $id = isset($valor) && is_numeric($valor) && preg_match("/[0-9]/", $valor) ? $valor : false;
    $email = isset($_GET['correo']) && filter_var($_GET['correo'], FILTER_VALIDATE_EMAIL) ?  $_GET['correo'] : false;
    $pass = isset($_GET['pass']) && preg_match("/[a-zA-Z0-9]/", $_GET['pass']) ?  $_GET['pass'] : false;

    if ($id) {
        return $id;
    } else if ($email && $pass) {
        return $array = [
            ':email' => $email,
            ':pass' => $pass
        ];
    }
}
