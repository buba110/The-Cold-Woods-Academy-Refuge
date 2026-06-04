<?php
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit;
}
$mensaje = trim($_POST['mensaje_secreto'] ?? '');
if (empty($mensaje)) {
    echo json_encode(['status' => 'error', 'message' => 'El mensaje no puede estar vacío']);
    exit;
}
$mensajeLimpio = htmlspecialchars(strip_tags($mensaje), ENT_QUOTES, 'UTF-8');
$fecha = date('Y-m-d H:i:s');
$contenido = "\n\n[$fecha]\nMensaje de Monse:\n$mensajeLimpio\n---------\n";
$archivo = 'mensajes_secretos.txt';
if (file_put_contents($archivo, $contenido, FILE_APPEND | LOCK_EX)) {
    echo json_encode(['status' => 'success', 'message' => 'Mensaje guardado en el corazón del servidor']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No se pudo guardar el mensaje']);
}
?>
