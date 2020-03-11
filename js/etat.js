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
                    url: './json/etat.php',
                    method: 'GET',
                    data: {
                        "idPartie": idPartie,
                        "idJoueur": idJoueur
                    }
                }).done(function (data) {
                    console.log(data);
                    if (data.etat === 'erreur') {
                        $('body').html(pageErreur);
                    }
                    else {
                        let Class = data.etat.charAt(0).toUpperCase() + data.etat.substring(1).toLowerCase();
                        console.log('Class : ' + Class);
                        if (etatActuel != data.etat) {
                            switch (Class) {
                                case 'Menu':
                                    Etat = new Menu();
                                    break;
                                case 'AttentePartie':
                                    Etat = new AttentePartie();
                                    break;
                                case 'PlacementPions':
                                    Etat = new PlacementPions();
                                    break;
                                case 'Tour':
                                    Etat = new Tour(data.numeroTour);
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
                    }
                }).fail(function () {
                    $('body').html(pageErreur);
                });
            }
        }

        setInterval(etat, 500);
    });
})();