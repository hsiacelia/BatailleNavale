<?php

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$obj = new stdClass();

if (isset($_GET['idJoueur'], $_GET['idPartie'])) {
    $fichierPartie =  "parties/" . $_GET['idPartie'] . ".json";
    if (file_exists($fichierPartie)) {

        $json = file_get_contents($fichierPartie);

        $partie = json_decode($json, true);

        $joueurActuel;
        $joueurAdversaire;
        $idJoueurActuel;
        $idJoueurAdversaire;

        foreach ($partie['joueurs'] as $key => $joueur) {
            if ($joueur['id'] == $_GET['idJoueur']) {
                $joueurActuel = $joueur;
                $idJoueurActuel = $key;
            } else {
                $joueurAdversaire = $joueur;
                $idJoueurAdversaire = $key;
            }
        }


        if (isset($joueurActuel)) {
            $obj->etat = $joueurActuel['etat'];
            if ($joueurActuel['etat'] == "placement en cours") {
                $obj->jardin = $joueurActuel['jardin'];

                //vérification temps écoulé
                require_once './../php/Timer.php';
                $temps = new Timer();
                $obj->prout = $joueurActuel['debutTour'];
                if ($temps->resultat($joueurActuel['debutTour'], false)) {
                    $obj->dev = 'pas fini !';
                } else {
                    $obj->dev = 'fini !';
                    $partie['joueurs'][0]['etat'] = "tour 1 joue";
                    $partie['joueurs'][1]['etat'] = "tour 1 joue";
                    $partie['joueurs'][0]['debutTour'] = strtotime('now');
                    $partie['joueurs'][1]['debutTour'] = strtotime('now');

                    file_put_contents($fichierPartie,  json_encode($partie));
                }
            } else if ($joueurActuel['etat'] == "placement fini") {
                $obj->jardin = $joueurActuel['jardin'];
                if ($joueurAdversaire['etat'] == "placement fini") {
                    $partie['joueurs'][0]['etat'] = "tour 1 joue";
                    $partie['joueurs'][0]['debutTour'] = strtotime('now');
                    $partie['joueurs'][1]['etat'] = "tour 1 joue";
                    $partie['joueurs'][1]['debutTour'] = strtotime('now');

                    file_put_contents($fichierPartie,  json_encode($partie));
                }
            } else if (preg_match('#^tour ([0-9]{1,3}) (joue|attente)$#', $joueurActuel['etat'], $match)) {
                $numeroTour = $match[1];
                $etatTour = $match[2];

                $obj->etat = "tour";
                $obj->numeroTour = $numeroTour;
                $obj->etatTour = $etatTour;
                $obj->jardinJoueur = $joueurActuel['jardin'];

                // modifier le jardin adverse pour le joueur actuel
                $toutesLesCasesAdverses = [];
                foreach ($joueurAdversaire['jardin'] as $ligne) {
                    $toutesLesCasesAdverses = array_merge($toutesLesCasesAdverses, $ligne);
                }
                $toutesLesCasesAdverses = array_unique($toutesLesCasesAdverses);
                foreach ($toutesLesCasesAdverses as $numCase => $case) {
                    $toutesLesCasesAdverses[$numCase] = rtrim($case, "+-");
                }
                $nombreiteration = array_count_values($toutesLesCasesAdverses);
                unset($nombreiteration['0']);
                $jardinAdversaire;
                foreach ($joueurAdversaire['jardin'] as $numLigne => $ligne) {
                    foreach ($ligne as $numCase => $case) {
                        if (strpos($case, "+") !== false) {
                            if (rtrim($case, "+") != "0" && $nombreiteration[rtrim($case, "+")] == 1) {
                                $jardinAdversaire[$numLigne][$numCase] = rtrim($case, "+");
                            } else {
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
                //vérifier l'etat du joueur adverse (meme tour) si les deux joueurs sont en attente passer au tour suivant
                if (preg_match('#^tour ([0-9]{1,3}) (joue|attente)$#', $joueurAdversaire['etat'], $match2)) {
                    $numeroTourAdversaire = $match2[1];
                    $etatTourAdversaire = $match2[2];

                    if ($numeroTourAdversaire == $numeroTour) {
                        if ($etatTourAdversaire == "attente" && $etatTour == "attente") {
                            $prochainTour = $numeroTour + 1;
                            $partie['joueurs'][0]['etat'] = "tour " . $prochainTour . " joue";
                            $partie['joueurs'][1]['etat'] = "tour " . $prochainTour . " joue";
                            $partie['joueurs'][0]['debutTour'] = strtotime('now');
                            $partie['joueurs'][1]['debutTour'] = strtotime('now');

                            file_put_contents($fichierPartie,  json_encode($partie));
                        } else {
                            //vérification temps écoulé
                            require_once './../php/Timer.php';
                            $temps = new Timer();
                            if ($temps->resultat($joueurActuel['debutTour'], true)) {
                                // echo 'pas fini !';
                            } else {
                                // echo 'fini';
                                $partie['joueurs'][$idJoueurActuel]['etat'] = "tour " . $numeroTour . " attente";
                                $partie['joueurs'][$idJoueurAdversaire]['etat'] = "tour " . $numeroTour . " attente";

                                file_put_contents($fichierPartie,  json_encode($partie));
                            }
                        }

                        //vérification victoire
                        $toutesLesCasesAdverses = [];
                        foreach ($joueurAdversaire['jardin'] as $ligne) {
                            $toutesLesCasesAdverses = array_merge($toutesLesCasesAdverses, $ligne);
                        }
                        $toutesLesCasesAdverses = array_unique($toutesLesCasesAdverses);
                        $nombreiteration = array_count_values($toutesLesCasesAdverses);
                        foreach ($nombreiteration as $key => $iteration) {
                            if (strpos($key, '+') !== FALSE) {
                                unset($nombreiteration[$key]);
                            }
                        }

                        if (count($nombreiteration) == 1) {
                            echo 'gagne lustucru';

                            $partie['joueurs'][$idJoueurActuel]['etat'] = "gagne";
                            $partie['joueurs'][$idJoueurAdversaire]['etat'] = "perdu";

                            //TODO pas de gestion des égalités

                            file_put_contents($fichierPartie,  json_encode($partie));
                            $obj->etat = 'gagne';
                        }
                    } else {
                        $obj->etat = "erreur";
                    }
                } else {
                    $obj->etat = "erreur";
                }

                if ($obj->etat != "erreur") {
                    $obj->jardinAdversaire = $jardinAdversaire;
                }
            } else if ($joueurActuel['etat'] == "gagne") {
                $obj->jardin = $joueurActuel['jardin'];
                // $obj->jardin = $joueurAdversaire['jardin'];
            } else if ($joueurActuel['etat'] == "perdu") {
                $obj->jardin = $joueurActuel['jardin'];
                // $obj->jardin = $joueurAdversaire['jardin'];
            }
        } else {
            $obj->etat = "erreur";
            $obj->message = "Joueur inconnu";
        }
    } else {
        $obj->etat = "erreur";
        $obj->message = "Partie inconnue";
    }
} else {
    $obj->etat = "menu";
}

echo json_encode($obj);
