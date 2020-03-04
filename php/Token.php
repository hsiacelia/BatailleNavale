<?php

function create(){
    $str = array();
    $i = 0;
    while ($i<10) {
        $str = $str + rand(0,9);
        ++$i;
    }
    return implode($str);
}

function verifier($joueur,$token){
    if($token == null){
        $joueur['token'] = $token;
        return true; // il peut jouer
    }
    $tokenjs = $joueur['token'];
    if($tokenjs == $token) {
        return true; // il peut jouer
    }
    return false; // il peut pas jouer il triche !!!
}