<?php
// Backend estricto - Manejo JSON limpio
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
    exit;
}

$mensaje = isset($_POST['mensaje_secreto']) ? trim($_POST['mensaje_secreto']) : '';

if (empty($mensaje)) {
    echo json_encode(["status" => "error", "message" => "El mensaje no puede ir vacío."]);
    exit;
}

// Sanitización profesional
$mensajeSanitizado = htmlspecialchars(strip_tags($mensaje), ENT_QUOTES, 'UTF-8');
$timestamp = date('Y-m-d H:i:s');

$bloqueTexto = "=========================================\n";
$bloqueTexto .= "FECHA: $timestamp\n";
$bloqueTexto .= "MONSE ESCRIBIÓ:\n\"$mensajeSanitizado\"\n";
$bloqueTexto .= "=========================================\n\n";

// Escribe en archivo local con bloqueo exclusivo para evitar colisiones
$archivo = 'mensajes_secretos.txt';
if (file_put_contents($archivo, $bloqueTexto, FILE_APPEND | LOCK_EX)) {
    echo json_encode(["status" => "success", "message" => "Guardado correctamente."]);
} else {
    echo json_encode(["status" => "error", "message" => "No se pudo escribir el archivo físico."]);
}
exit;