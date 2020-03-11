<?php
include_once 'php/Timer.php';

$temps = new Timer();
if ($temps->resultat(strtotime("-21 seconds"), true)) {
    echo 'pas fini !';
} else {
    echo 'fini';
}
