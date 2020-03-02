<?php
class Timer {
    private $Date;

    function commencer($param){
        date_default_timezone_set('Europe/Paris');

        if($param == true) { // timer pour les tours
            $this->Date = strtotime("+20");
        }
        elseif($param == false) { // timer pour le placement des pions
            $this->Date = strtotime("+60");
        }
    }

    function tour(){
        $fin = $this->Date;
        $mtn = strtotime('now');
        $reste =  $fin - $mtn;
        return $reste;
    }

    function affiche($nbTour,$param){
        if (isset($_POST['type']) == true && $_POST['type'] == 'Timer'){
            $var = $this->tour();
            echo $var;
            if($param == true){ // pour les tours
                if($var > 0){
                    $arr = array('tour'+$nbTour=>'encours');
                    json_encode($arr);
                }
                else{
                    $arr = array('tour'+$nbTour=>'kick');
                    json_encode($arr);
                    echo 'kick';
                }
            }
            else{ // pour le positionnement des pions
                if($var > 0){
                    $arr = array('choix'=>'encours');
                    json_encode($arr);
                }
                else{
                    $arr = array('choix'=>'kick');
                    json_encode($arr);
                    echo 'kick';
                }
            }
        }
    }



}
