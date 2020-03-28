(function () {
    'use strict';

    $(() => {

        function etat() {
            if (idPartie == null || idJoueur == null) {
                if (etatActuel != 'menu') {
                    Etat = new Menu();
                    etatActuel = 'menu';
                    console.log('changement etat : ' + etatActuel);
                }
            } else {
                console.log('Appel ajax etat');
                $.ajax({
                    url: urlAjax+'json/etat.php',
                    method: 'GET',
                    data: {
                        "idPartie": idPartie,
                        "idJoueur": idJoueur
                    },
                    dataType: 'json',
                    contentType: 'application/json'
                }).done(function (data) {
                    console.log(data);
                    if (data.etat === 'erreur') {
                        $('body').html(pageErreur);
                    }
                    else {
                        let Class = data.etat.charAt(0).toUpperCase() + data.etat.substring(1).toLowerCase();
                        // console.log('Class : ' + Class);
                        if (etatActuel != data.etat) {
                            switch (Class) {
                                case 'Menu':
                                    Etat = new Menu();
                                    break;
                                case 'Attente partie':
                                    Etat = new AttentePartie();
                                    break;
                                case 'Placement en cours':
                                    Etat = new PlacementPions();
                                    break;
                                case 'Tour':
                                    Etat = new Tour(data.jardinJoueur, data.jardinAdversaire, data.numeroTour, data.etatTour);
                                    break;
                                case 'Perdu':
                                    Etat = new Perdu();
                                    break;
                                case 'Gagne':
                                    Etat = new Gagne();
                                    break;
                                case 'Erreur':
                                    Etat = new Erreur();
                                    break;
                                default:
                                    Etat = new Menu();
                            }
                            etatActuel = data.etat;
                            console.log('changement etat : ' + etatActuel);
                        }
                        else if (data.etat == 'tour') {
                            if (data.numeroTour != Etat.numeroTour) {
                                Etat.tour = data.numeroTour;
                                Etat.etat = data.etatTour;
                                Etat.jardinJoueur = data.jardinJoueur;
                                Etat.jardinAdversaire = data.jardinAdversaire;
                                Etat.updateJardin();
                            }

                            if (data.etatTour != Etat.etatTour) {
                                Etat.etat = data.etatTour;
                            }
                        }
                        else {

                        }
                    }
                }).fail(function (data) {
                    console.log(data);
                    $('body').html(pageErreur);
                });
            }
        }

        setInterval(etat, 500);
    });
})();