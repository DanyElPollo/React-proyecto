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
    }

    public function getConexion() {
        $this->conn = new PDO("pgsql:host=$this->host; dbname=$this->db; port=$this->port; user=$this->user; password=$this->pass");
        if (!$this->conn) {
            echo "Error de conexión.";
            exit;
        }
        return $this->conn;
    }
}
