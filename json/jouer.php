<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');// pour ne pas garder de cache
header('Content-type: application/json');

$var = 'bonjour';
// ouvrir le attente.json et verifier si il y a une partie en attente

$obj = new stdClass;
$obj ->id = 'mauvais nom d\'utilisateur ou mot de passe';
$obj ->nombreJoueurs = false;
$obj ->joueurs = 

echo(json_encode($var));
file_put_contents('nom.json', json_encode($obj));
?>
