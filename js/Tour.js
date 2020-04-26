class Tour {
    #cssCaseVide = {
        "background": 'var(--couleur-principale-claire)'
    };
    #cssCaseToucheVide = {
        "background": 'grey'
    };
    #cssCaseToucheRemplit = {
        "background": 'red'
    };
    constructor(jardinJoueur, jardinAdversaire, numeroTour, etatTour) {
        this.numeroTour = numeroTour;
        this.etatTour = etatTour;
        this.jardinJoueur = jardinJoueur;
        console.log(this.jardinJoueur);
        this.jardinAdversaire = jardinAdversaire;
        console.log(this.jardinAdversaire);
        this.tailleJardin = this.jardinJoueur.length;

        $('body').html('<p class="numeroTour">' + this.numeroTour + '</p><p class="minuterie"></p><p id="attenteTirAdversaire">En attente du tir adverse...</p><div id="jardins"><div id="jardinJoueur"></div><div id="jardinAdversaire"></div></div>')
        .css('background-image', 'none');

        //affichage ou non de la zone d'attente
        if (this.etatTour == 'joue') {
            $('#attenteTirAdversaire').css('display', 'none');
        }
        else {
            $('#attenteTirAdversaire').css('display', 'flex');
        }

        // creation des jardins
        for (let y = 0; y < this.tailleJardin; ++y) {
            $('#jardinJoueur').append($('<div class="ligne">'));
            $('#jardinAdversaire').append($('<div class="ligne">'));
        }
        for (let y = 0; y < this.tailleJardin; ++y) {
            $('.ligne').append($('<div class="case">'));
        }

        // ajout des coordonnées
        for (let x = 0; x < this.tailleJardin; ++x) {
            for (let y = 0; y < this.tailleJardin; ++y) {
                let cssX = x + 1;
                let cssY = y + 1;
                $('.ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').data('x', x);
                $('.ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').data('y', y);
            }
        }

        this.updateJardin();

        $('#jardinAdversaire .case').click(function () {
            console.log('tir');
            Tour.tir($(this).data('x'), $(this).data('y'));
        });
    }

    updateJardin() {
        // remplissage jardinJoueur
        for (let x = 0; x < this.tailleJardin; ++x) {
            for (let y = 0; y < this.tailleJardin; ++y) {
                let cssX = x + 1;
                let cssY = y + 1;

                const regex = /^[A-Za-z]*$/;
                if (this.jardinJoueur[y][x].substr(0, 1).match(regex)) {
                    let img = this.jardinJoueur[y][x].substr(0, 2) + '.png';
                    if (this.jardinJoueur[y][x].substr(-1) == '+') {
                        $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css({
                            "background-image": 'url("img/caillou.png"), url(img/' + img + ')',
                            "background-size": '90% 90%, cover',
                            "background-repeat": 'no-repeat, no-repeat',
                            "background-color": 'transparent',
                            "transform": 'rotate(0deg)'
                        }).addClass('coule');
                    }
                    else {
                        $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css({
                            "background-image": 'url(img/' + img + ')',
                            "background-size": 'cover',
                            "background-repeat": 'no-repeat',
                            "background-color": 'transparent',
                            "transform": 'rotate(0deg)'
                        }).addClass('coule');
                    }

                    let rotation = this.jardinJoueur[y][x].substr(2, 1);
                    switch (rotation) {
                        case "H":
                            break;
                        case "D":
                            $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css({
                                "transform": 'rotate(90deg)'
                            });
                            break;
                        case "G":
                            $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css({
                                "transform": 'rotate(-90deg)'
                            });
                            break;
                        case "B":
                            $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css({
                                "transform": 'rotate(180deg)'
                            });
                            break;

                        default:
                            break;
                    }
                }
                else {
                    // $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css(this.#cssCaseVide);
                }



                if (this.jardinJoueur[y][x].substr(-1) == '+') {
                    $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').addClass('touche');
                    // .css('background', 'blue');
                }
                else {
                    // $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css(this.#cssCaseVide);
                }
            }
        }

        // remplissage jardinAdverse
        for (let x = 0; x < this.tailleJardin; ++x) {
            for (let y = 0; y < this.tailleJardin; ++y) {
                let cssX = x + 1;
                let cssY = y + 1;
                const regex = /^[A-Za-z]*$/;
                if (this.jardinAdversaire[y][x].substr(0, 1).match(regex)) {
                    let img = this.jardinAdversaire[y][x].substr(0, 2) + '.png';
                    $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css({
                        "background": 'url(img/' + img + ') no-repeat',
                        "background-size": 'cover',
                        "transform": 'rotate(0deg)'
                    }).addClass('coule').removeClass('toucheRemplit');
                    let rotation = this.jardinAdversaire[y][x].substr(2, 1);
                    switch (rotation) {
                        case "H":
                            break;
                        case "D":
                            $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css({
                                "transform": 'rotate(90deg)'
                            });
                            break;
                        case "G":
                            $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css({
                                "transform": 'rotate(-90deg)'
                            });
                            break;
                        case "B":
                            $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css({
                                "transform": 'rotate(180deg)'
                            });
                            break;

                        default:
                            break;
                    }
                }
                else if (this.jardinAdversaire[y][x] == '1') {
                    $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').addClass('toucheVide');
                }
                else if (this.jardinAdversaire[y][x].substr(-1) == '+') {
                    $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').addClass('toucheRemplit');
                }
                else {
                    // $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css(this.#cssCaseVide);
                }
            }
        }
    }

    set tour(numeroTour) {
        this.numeroTour = numeroTour;
        $('.numeroTour').html(this.numeroTour);
        new Timer(tempsTour, $('.minuterie'));
    }

    set etat(etatTour) {
        this.etatTour = etatTour;
        console.log('changement d\'etat');
        
        //affichage ou non de la zone d'attente
        if (this.etatTour == 'joue') {
            $('#attenteTirAdversaire').css('display', 'none');
        }
        else {
            $('#attenteTirAdversaire').css('display', 'flex');
        }
    }

    static tir(x, y) {
        console.log('tir en ' + x + ' ' + y);
        console.log('idPartie ' + idPartie);
        console.log('idJoueur ' + idJoueur);
        $.ajax({
            url: urlAjax+'json/tir.php',
            method: 'POST',
            data: {
                "idPartie": idPartie,
                "idJoueur": idJoueur,
                "X": x,
                "Y": y
            },
            dataType: 'json'/*,
            contentType: 'application/json'*/
        }).done(function (data) {
            console.log('reponse tir :');
            console.log(data);

        }).fail(function (data) {
            console.log('reponse tir raté :');
            console.log(data);
            $('body').html(pageErreur);
        });
    }
}