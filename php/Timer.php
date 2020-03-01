<?php
class Timer {
    private $Date;

    function tour(){
        date_default_timezone_set("France");
        $debut = strtotime("-20 second");
        $fin = strtotime('now');
        $reste = $fin - $debut;
        return $reste;
    }

}