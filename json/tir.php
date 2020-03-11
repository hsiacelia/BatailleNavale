<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();

//TODO GET vers POST

if (isset($_POST['idJoueur'], $_POST['idPartie'], $_POST['X'], $_POST['Y'])) {
    $idJoueur = $_POST['idJoueur'];
    $idPartie = $_POST['idPartie'];
    $X = $_POST['X'];
    $Y = $_POST['Y'];
    if ($X < 12 && $X >= 0 && $Y < 12 && $Y >= 0) {
        $fichierPartie =  "parties/" . $idPartie . ".json";
        if (file_exists($fichierPartie)) {

            $json = file_get_contents($fichierPartie);

            $partie = json_decode($json, true);

            $joueurActuel;
            $joueurAdversaire;

            foreach ($partie['joueurs'] as $joueur) {
                if ($joueur['id'] == $_POST['idJoueur']) {
                    $joueurActuel = $joueur;
                } else {
                    $joueurAdversaire = $joueur;
                }
            }
            
        if (isset($joueurActuel)) {
            require_once('./../php/Token.php');
            
            /*$obj->etat = $joueurActuel['etat'];
            if ($joueurActuel['etat'] == "placement en cours") {
                $obj->jardin = $joueurActuel['jardin'];
                //le truc de celia
                // if(estCeQueCestFini($date, $temps)) { }
            } else if ($joueurActuel['etat'] == "placement fini") {
                $obj->jardin = $joueurActuel['jardin'];
            } else if (preg_match('#^tour ([0-9]{1,3}) (joue|attente)$#', $joueurActuel['etat'], $match)) {
                $numeroTour = $match[1];
                $etatTour = $match[2];

                $obj->etat = "tour";
                $obj->numeroTour = $numeroTour;
                $obj->etatTour = $etatTour;
                $obj->jardinJoueur = $joueurActuel['jardin'];

                $toutesLesCasesAdverses = [];
                foreach ($joueurAdversaire['jardin'] as $ligne) {
                    $toutesLesCasesAdverses = array_merge($toutesLesCasesAdverses, $ligne);
                }
                $toutesLesCasesAdverses = array_unique($toutesLesCasesAdverses);
                foreach ($toutesLesCasesAdverses as $numCase => $case) {
                    $toutesLesCasesAdverses[$numCase] = rtrim($case, "+-");
                }
                $nombreIterration = array_count_values($toutesLesCasesAdverses);
                unset($nombreIterration['0']);
                $jardinAdversaire;
                foreach ($joueurAdversaire['jardin'] as $numLigne => $ligne) {
                    foreach ($ligne as $numCase => $case) {
                        if (strpos($case, "+") !== false) {
                            if (rtrim($case, "+") != "0" && $nombreIterration[rtrim($case, "+")] == 1) {
                                $jardinAdversaire[$numLigne][$numCase] = rtrim($case, "+");
                            }
                            else{
                                $jardinAdversaire[$numLigne][$numCase] = "+";
                            }
                        } else if (strpos($case, "-") !== false) {
                            $jardinAdversaire[$numLigne][$numCase] = "-";
                        } else {
                            unset($obj->numeroTour, $obj->etatTour, $obj->jardinJoueur);
                            $obj->etat = "erreur";
                            $obj->message = "Convention jardin adverse";
                            break 2;
                        }
                    }
                }

                if ($obj->etat != "erreur") {
                    $obj->jardinAdversaire = $jardinAdversaire;
                }
            } else if ($joueurActuel['etat'] == "gagne") {
                $obj->jardin = $joueurActuel['jardin'];
            } else if ($joueurActuel['etat'] == "perdu") {
                $obj->jardin = $joueurActuel['jardin'];
            }*/
        } else {
            $obj->success = false;
            $obj->message = "Joueur inconnu";
        }
        } else {
            $obj->success = false;
            $obj->message = "Partie inconnue";
        }
    } else {
        $obj->success = false;
        $obj->message = 'Mauvais placement.';
    }
} else {
    $obj->success = false;
    $obj->message = 'Pas assez de variables entrante.';
}

echo json_encode($obj);
