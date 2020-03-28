class Gagne {
    constructor() {
        $('body').html('<div class="finPartie">' +
            '<div></div>' +
            '<div id="bulle"><p>J\'ai gagné !</p></div>' +
            '<div></div>' +
            '</div>' +
            '<div class="finPartie">' +
            '<div><img src="img/garcon 1 - heureux.png" alt=""></div>' +
            '<div id="rejouer"><button id="rejoue">Rejouez</button></div>' +
            '<div><img src="img/garcon 1 - triste.png" alt=""></div>' +
            '</div>');

        $('#rejoue').click(function () {
            //appel du fichier jouer.php
            console.log('click jouer ajax lancé');
            $.ajax({
                url: urlAjax+'json/jouer.php',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            })
                .done(function (data) {
                    idPartie = data.idPartie;
                    idJoueur = data.idJoueur;
                })
                .fail(function () {
                    $('body').html(pageErreur);
                })
        })
    }
}