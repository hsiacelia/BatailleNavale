<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();

// if (isset($_POST['idJoueur'], $_POST['idPartie'], $_POST['X'], $_POST['Y'])) {
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
                if ($joueur['id'] == $idJoueur) {
                    $joueurActuel = $joueur;
                } else {
                    $joueurAdversaire = $joueur;
                }
            }

            if (isset($joueurActuel)) {
                require_once('../php/token.php');
                $token = creerToken();
                // echo $token;
                if (verifierToken($joueurActuel, $token)) {
                    $changement = str_replace('-', '+', $joueurAdversaire['jardin'][$Y][$X]);
                    $joueurAdversaire['jardin'][$Y][$X] = $changement;
                    foreach ($partie['joueurs'] as $key => $joueur) {
                        if ($joueur['id'] == $idJoueur) {
                            $partie['joueurs'][$key] = $joueurActuel;
                            $partie['joueurs'][$key]['etat'] = str_replace('joue', 'attente', $partie['joueurs'][$key]['etat']);
                        }
                        else{
                            $partie['joueurs'][$key]['jardin'] = $joueurAdversaire['jardin'];
                        }
                    }
                    file_put_contents($fichierPartie, json_encode($partie));
                    $obj->success = true;
                } else {
                    $obj->success = false;
                    $obj->message = "Mauvais token";
                }
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
    
// } else {
//     $obj->success = false;
//     $obj->message = 'Pas assez de variables entrante';
// }

echo json_encode($obj);
