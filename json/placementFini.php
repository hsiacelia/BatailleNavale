<?php
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();

if (isset($_POST['idJoueur'], $_POST['idPartie'])) {
    $idJoueur = $_POST['idJoueur'];
    $idPartie = $_POST['idPartie'];
    
        $fichierPartie =  "parties/" . $idPartie . ".json";
        if (file_exists($fichierPartie)) {

            $json = file_get_contents($fichierPartie);

            $partie = json_decode($json, true);

            $joueurActuel;
            $keyJoueurActuel;

            foreach ($partie['joueurs'] as $key => $joueur) {
                if ($joueur['id'] == $idJoueur) {
                    $joueurActuel = $joueur;
                    $keyJoueurActuel = $key;
                }
            }

            if (isset($joueurActuel)) {
                // modifier l'état du joueur
                $partie['joueurs'][$keyJoueurActuel]['etat'] = 'placement fini';
                file_put_contents($fichierPartie, json_encode($partie));

                $obj->success = true;
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
    $obj->message = 'Pas assez de variables entrante';
}

echo json_encode($obj);
