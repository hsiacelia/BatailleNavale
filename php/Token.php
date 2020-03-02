<?php

class Token {

    function create(){
        $str = array();
        for ($i = 0, $î<5, ++$i){
            $str = $str + random_int(0,9);
        }
        return implode($str);
    }

    function ajoute($nbTour){
        json_encode('token'+$nbTour => $this->create());
    }

    function verif($nbTour,$json){
        if(json_decode($json) != null){
            return false; // ne contient pas de token pour ce tour
        }
        else{
            $this->ajoute($nbTour);
            return true; // contient un token pour ce tour
        }
    }
}