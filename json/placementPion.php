<?php
// session_start();

// $idPartie = 0;
// $contentFileJson = file_get_contents($idPartie.".json");

//récupérer la matrice retournée en json
//vérifier que les points de la matrice existent vraiment
//l'ajoute dans le json





header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();

if (isset($_POST['idJoueur'], $_POST['idPartie'], $_POST['X'], $_POST['Y'], $_POST['objet'])) {
    $idJoueur = $_POST['idJoueur'];
    $idPartie = $_POST['idPartie'];
    $X = $_POST['X'];
    $Y = $_POST['Y'];
    $objet = $_POST['objet'];
    if ($X < 12 && $X >= 0 && $Y < 12 && $Y >= 0) {
        $fichierPartie =  "parties/" . $idPartie . ".json";
        if (file_exists($fichierPartie)) {

            $json = file_get_contents($fichierPartie);

            $partie = json_decode($json, true);

            $joueurActuel;

            foreach ($partie['joueurs'] as $joueur) {
                if ($joueur['id'] == $idJoueur) {
                    $joueurActuel = $joueur;
                }
            }

            if (isset($joueurActuel)) {
                $lesObjets = file_get_contents('objets.json');
                $lesObjets = json_decode($lesObjets, true);
                $obj->objet = $objet;
                $modele = $lesObjets[$objet]['modele'];

                $obj->jardin = $joueurActuel['jardin'];
                foreach ($modele as $Ymodele => $ligne) {
                    foreach ($ligne as $Xmodele => $case) {
                        if ($case != 0) {
                            $joueurActuel['jardin'][$Y + $Ymodele][$X + $Xmodele] = $lesObjets[$objet]['diminutif'] . $case . 'H';
                            $obj->jardin[$Y + $Ymodele][$X + $Xmodele] = $lesObjets[$objet]['diminutif'] . $case . 'H';
                        } else {
                            $obj->jardin[$Y + $Ymodele][$X + $Xmodele] = '0';
                        }
                    }
                }

                //écriture dans fichier
                foreach ($partie['joueurs'] as $key => $joueur) {
                    if ($joueur['id'] == $idJoueur) {
                        $partie['joueurs'][$key]['jardin'] = $joueurActuel['jardin'];
                    }
                }
                file_put_contents($fichierPartie, json_encode($partie));
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
