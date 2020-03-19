<?php

function coordonee ($joueur) {
    if(isset($_GET['x']) === true && isset($_GET['y']) === true){
        $plateau = $joueur['jardin'];
        $plateauX = $plateau[$_GET['x']];
        $plateauX[$_GET['y']] = '1 -';
    }
}

