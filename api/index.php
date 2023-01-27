<?php
header("Access-Control-Allow-Origin: http://localhost:3000/");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once('conexion.php');
//se instancia la clase database.
$database = new Database();



// verificamos que metodo se va a recibir, y asi realizar el crud.
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Preparando la consulta
    try {
        if (!isset($_GET['id'])) {
            $query = $database->getConexion()->prepare("SELECT nombre, apellido, correo, tipodoc, numdoc, ciudad, edad, id
            FROM usuarios;");
        } else {
            $query = $database->getConexion()->prepare("SELECT nombre, apellido, correo, tipodoc, numdoc, ciudad, edad, id FROM usuarios WHERE id = :id;");
            $query->bindValue(':id', obtener($_GET['id']), PDO::PARAM_INT);
        }
        //ejecutando
        $query->execute();
        $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($resultado);
    } catch (PDOException $e) {
        echo $e->getMessage();
        echo "Quizas las contraseñas no son correctas";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);
    if ($json !== null) {
        try {
            if (isset($_GET['login'])) {
                $consulta = $database->getConexion()->prepare("SELECT * FROM usuarios WHERE correo like :correo");
                $consulta->bindValue(':correo', $json['correo'], PDO::PARAM_STR);
                $consulta->execute();
                $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
                if (password_verify($json['cont'], $resultado[0]['contrasena'])) {
                    header('Content-Type: application/json');
                    echo json_encode(array("status" => "permitido", 'data' => $resultado));
                } else {
                    echo json_encode(array("status" => "error", "message" => "La contraseña es incorrecta."));
                }
            } else {
                $consulta = $database->getConexion()->prepare("INSERT INTO usuarios values(:nombre, :apellido, :correo, :cont, :tipoDoc, :numDoc, :ciudad, :edad)");
                foreach (validacion($json) as $key => $value) {
                    $consulta->bindValue($key, $value, PDO::PARAM_STR);
                }
                //  enviamos la consulta
                $consulta->execute();
                $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
                //  retornamos valores 
                header('Content-Type: application/json');
                echo json_encode($resultado);
            }
        } catch (PDOException $e) {
            echo ($e->getMessage());
        }
    } else {
        echo "Datos erroneos para el json";
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $query = $database->getConexion()->prepare("DELETE  FROM usuarios WHERE id=:id");
    $query->bindValue(':id', obtener($_GET['id']), PDO::PARAM_INT);
    //ejecutando
    $query->execute();
    // echo json_encode($results);
}

function validacion($valor = null) {
    $nombre = isset($valor["nombre"]) && preg_match("/[a-zA-Z]/", $valor['nombre']) ? $valor["nombre"] : false;
    $apellido = isset($valor["apellido"]) && !is_numeric($valor["apellido"]) ? $valor["apellido"] : false;
    $correo = isset($valor["correo"]) && filter_var($valor['correo'], FILTER_VALIDATE_EMAIL) && preg_match("/[a-zA-Z0-9@_.-]/", $valor['correo']) ? $valor["correo"] : false;
    $contrasena = isset($valor["cont"]) && preg_match("/[a-zA-Z0-9-]/", $valor['cont']) ? $valor["cont"] : false;
    $tipoDoc = isset($valor["tipoDoc"]) && !is_numeric($valor["tipoDoc"]) && !preg_match("/[0-9@_-]/", $valor['tipoDoc']) ? $valor["tipoDoc"] : false;
    $numDoc = isset($valor["numDoc"]) &&  is_numeric($valor["numDoc"]) && preg_match("/[0-9]/", $valor['numDoc']) ? $valor["numDoc"] : false;
    $ciudad = isset($valor["ciudad"]) && !is_numeric($valor["ciudad"]) && preg_match("/[a-zA-Z]/", $valor['ciudad']) ? $valor["ciudad"] : false;
    $edad = isset($valor["edad"]) && is_numeric($valor["edad"])  && preg_match("/[0-9]/", $valor['edad']) ? $valor["edad"] : false;
    if ($valor) {
        return $array = [
            ':nombre' => $nombre,
            ':apellido' => $apellido,
            ':correo' => $correo,
            ':cont' => password_hash($contrasena, PASSWORD_BCRYPT, ["cost" => 12]),
            ':tipoDoc' => $tipoDoc,
            ':numDoc' => $numDoc,
            ':ciudad' => $ciudad,
            ':edad' => $edad
        ];
    }
}


function obtener($valor = null) {
    $id = isset($valor) && is_numeric($valor) && preg_match("/[0-9]/", $valor) ? $valor : false;
    $correo = isset($_GET['correo']) && filter_var($_GET['correo'], FILTER_VALIDATE_EMAIL) ?  $_GET['correo'] : false;
    $pass = isset($_GET['pass']) && preg_match("/[a-zA-Z0-9]/", $_GET['pass']) ?  $_GET['pass'] : false;

    if ($id) {
        return $id;
    } else if ($correo && $pass) {
        return $array = [
            ':correo' => $correo
        ];
    }
}
