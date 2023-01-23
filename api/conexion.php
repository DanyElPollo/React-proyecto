<?php

class Database {
    private $host;
    private $db;
    private $port;
    private $user;
    private $pass;
    private $conn;

    public function __construct() {
        $this->host = "localhost";
        $this->db = "Proyecto";
        $this->port = "5433";
        $this->user = "postgres";
        $this->pass = "admin";

        $this->conn = pg_connect("host=$this->host dbname=$this->db port=$this->port user=$this->user password=$this->pass");
        if (!$this->conn) {
            echo "Error de conexión.";
            exit;
        }
    }

    public function getDatos($consulta) {
        $result = pg_query($this->conn, $consulta);
        $data = pg_fetch_all($result);
        return json_encode($data);
    }
}


