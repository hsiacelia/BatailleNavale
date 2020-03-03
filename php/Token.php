<?php

class Token {
    private $joueur;
    //lorsqu'on passe au tour suivant faut reinitialiser le token et pas quand on tire
    public function __construct($j)
    {
        //le json file à partir de joueur
        $this->joueur = $j;
    }

    function create(){
        $str = array();
        $i = 0;
        while ($i<5) {
            $str = $str + rand(0,9);
            ++$i;
        }
        return implode($str);
    }

    function verifier(){
        //il faut une variable temporaire dans le json pour pas ecraser le token et pouvoir comparer
        $token = $this->joueur['token'];
        $tmp = $this->joueur['tmp'];
        if($token == null){
            $this->joueur['token'] = $this->create();
            return true; // il peut jouer
        }
        elseif($token != null){
            if($token == $tmp) {
                return true; // il peut jouer
            }
            else return false; // il ne peut pas jouer il triche !!!
        }
    }

    function ajouter(){
        $this->joueur['tmp'] = $this->create();
    }
}