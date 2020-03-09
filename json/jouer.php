<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');// pour ne pas garder de cache
header('Content-type: application/json');

function nbAleatoire ($taille){
    $nombreAleatoire = '';
    for ($i=0; $i < $taille; $i++) { 
        $nombreAleatoire = $nombreAleatoire . (mt_rand(0,9));
    }
    return $nombreAleatoire;
}

$obj = new stdClass;

$trouvePartie = FALSE;

// ouvrir le attente.json et verifier si il y a une partie en attente

$fichierAttente = "attente.json";
if (file_exists($fichierAttente)) {

    $json = file_get_contents($fichierAttente);
    $attente = json_decode($json, true);
    unset($json); // plus necessaire

    $partieEnAttente = $attente['parties'];

    // si une partie est en attente
    for ($i=0; $i < count($partieEnAttente); ++$i) { 
        if ($partieEnAttente[$i]['nombreJoueurs'] < 2) {
            $trouvePartie = TRUE;

            $nomFichier = $partieEnAttente[$i]['id'] . ".json";
            if (file_exists($nomFichier)) break; // a verifier

            $contenuFichier = $partieEnAttente[$i];
            

            $joueur2 = new stdClass;
            do {
                $joueur2 ->id = nbAleatoire(4);
            } while ($joueur2 ->id == $contenuFichier ->joueurs[0] ->id);
            $joueur2 ->etat = 'attente partie';

            $contenuFichier['nombreJoueurs'] = 2;
            array_push($contenuFichier['joueurs'], $joueur2);
            
            file_put_contents($nomFichier, json_encode($contenuFichier));

            // on enleve la partie selectionne au tableau
            unset($attente['parties'][$i]); 

            // remettre le tableau dans attente.json
            file_put_contents($fichierAttente, json_encode($attente));
            break; //on quitte la boucle si on trouve un partie en attente
        }
    }
    // si il n y a pas de partie en attente
    if (!$trouvePartie) {
        // genere un nom aleatoir et verifie si en utilisation

        do {
            $nomFichier = nbAleatoire(4);
        } while (file_exists($nomFichier . ".json"));
        
        // nouvelle partie a ajoutter dans attente.json
        $nouvellePartie = new stdClass;
        $nouvellePartie ->id = $nomFichier;
        $nouvellePartie ->nombreJoueurs = 1;

        $joueur1 = new stdClass;
        $joueur1 ->id = nbAleatoire(4);
        $joueur1 ->etat = 'attente partie';


        $nouvellePartie ->joueurs = [$joueur1];
        // $nouvellePartie ->joueurs = ;
        array_push($attente['parties'], $nouvellePartie);
        file_put_contents($fichierAttente, json_encode($attente));
    }
}


echo(json_encode($obj));



file_put_contents('nom.json', json_encode($nouvellePartie));
?>
