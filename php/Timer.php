<?php
class Timer
{
    private $Date;

    function commencer($debut, $param) // debut c'est le timestamp
    {
        date_default_timezone_set('Europe/Paris');

        if ($param == true) { // timer pour les tours
            $this->Date = $debut + 20; // 20 secondes
        } elseif ($param == false) { // timer pour le placement des pions
            $this->Date = $debut + 60; // 60 secondes
        }
    }

    function reste()
    {
        $fin = $this->Date;
        $mtn = strtotime('now');
        $reste = $fin - $mtn;
        return $reste;
    }

    function resultat($debut, $param){
        $this->commencer($debut, $param);
        $var = $this->reste();
        if($var > 0){ // il reste du temps
            return true;
        }
        else{ // il ne reste plus de temps
            return false;
        }
    }

}
