<?php

function coordonee (&$joueur) {
    if(isset($_POST['x']) === true && isset($_POST['y']) === true){
        $plateau = $joueur['jardin'];
        $plateauX = $plateau[$_POST['x']];
        $plateauX[$_POST['y']] = '1-';
    }
}
