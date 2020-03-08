<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();

//TODO GET vers POST

if (isset($_GET['idJoueur'], $_GET['idPartie'], $_GET['X'], $_GET['Y'])) {
    $idJoueur = $_GET['idJoueur'];
    $idPartie = $_GET['idPartie'];
    $X = $_GET['X'];
    $Y = $_GET['Y'];
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
                require_once('./../php/token.php');
                $token = creerToken();
                // echo $token;
                if (verifierToken($joueurActuel, $token)) {
                    $changement = str_replace('-', '+', $joueurActuel['jardin'][$X][$Y]);
                    $joueurActuel['jardin'][$X][$Y] = $changement;
                    foreach ($partie['joueurs'] as $key => $joueur) {
                        if ($joueur['id'] == $idJoueur) {
                            $partie['joueurs'][$key] = $joueurActuel;
                            $partie['joueurs'][$key]['jardin'] = $joueurActuel['jardin'];
                            $partie['joueurs'][$key]['etat'] = str_replace('joue', 'attente', $partie['joueurs'][$key]['etat']);
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
} else {
    $obj->success = false;
    $obj->message = 'Pas assez de variables entrante';
}

echo json_encode($obj);
