<?php

function creerToken(){
    $str = array();
    $i = 0;
    while ($i<10) {
        $str[$i] = rand(0,9);
        ++$i;
    }
    return implode($str);
}

function verifierToken(&$joueur,$token){
    $tokenjs = $joueur['token'];
    // echo $tokenjs;
    if($tokenjs == null){
        $joueur['token'] = $token;
        return true; // il peut jouer
    }
    if($tokenjs == $token) {
        return true; // il peut jouer
    }
    return false; // il peut pas jouer il triche !!!
}
