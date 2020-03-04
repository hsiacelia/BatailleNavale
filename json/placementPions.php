<?php
session_start();

$idPartie = 0;
$contentFileJson = file_get_contents($idPartie.".json");

//récupérer la matrice retournée en json
//vérifier que les points de la matrice existent vraiment
//l'ajoute dans le json
