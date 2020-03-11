class Tour {
    constructor(jardinJoueur, jardinAdversaire, numeroTour) {
        this.numeroTour = numeroTour;
        this.jardinJoueur = jardinJoueur;
        console.log(this.jardinJoueur);
        this.jardinAdversaire = jardinAdversaire;
        console.log(this.jardinAdversaire);
        this.tailleJardin = this.jardinJoueur.length;

        $('body').html('<p>' + this.numeroTour + '</p><div id="jardins"><div id="jardinJoueur"></div><div id="jardinAdversaire"></div></div>');


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

        // remplissage jardinJoueur
        for (let x = 0; x < this.tailleJardin; ++x) {
            for (let y = 0; y < this.tailleJardin; ++y) {
                let cssX = x + 1;
                let cssY = y + 1;
                if (this.jardinJoueur[x][y].substr(-1) == '+') {
                    $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css('background', 'blue');
                }
                else {
                    $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css('background', 'grey');
                }
            }
        }

        // remplissage jardinAdverse
        for (let x = 0; x < this.tailleJardin; ++x) {
            for (let y = 0; y < this.tailleJardin; ++y) {
                let cssX = x + 1;
                let cssY = y + 1;
                const regex = /^[A-Za-z]*$/;
                if (this.jardinAdversaire[x][y].substr(0, 1).match(regex)) {
                    $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css('background', 'red');
                }
                else if (this.jardinAdversaire[x][y] == '1') {
                    $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css('background', 'black');
                }
                else if (this.jardinAdversaire[x][y].substr(-1) == '+') {
                    $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css('background', 'blue');
                }
                else {
                    $('#jardinAdversaire .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')').css('background', 'grey');
                }
            }
        }

        $('#jardinAdversaire .case').click(function () {
            console.log('tir');
            Tour.tir($(this).data('x'), $(this).data('y'));
        });
    }

    set tour(numeroTour) {
        this.numeroTour = numeroTour;
        $('p').html(this.numeroTour);
    }

    static tir(x, y) {
        console.log('tir en ' + x + ' ' + y);
        $.ajax({
            url: './json/tir.php',
            method: 'POST',
            data: {
                "idPartie": idPartie,
                "idJoueur": idJoueur,
                "X": x,
                "Y": y
            }
        }).done(function (data) {
            console.log(data);

        }).fail(function () {
            $('body').html(pageErreur);
        });
    }
}