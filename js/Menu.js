//cree les element du menu : (bouton jouer, crédits ...)
class Menu {
    constructor() {
        $('body').html("")
            .css('background-image', 'url(./img/accueil.png)');
        $('body').append(
            $('<h1 class="titre">Va jouer dehors !</h1>'),

            $('<button />')
                .attr('id', 'bouton-jouer')
                .html('Jouer')
                .click(function () {
                    //appel du fichier jouer.php
                    console.log('click jouer ajax lancé');
                    $.ajax({
                        url: urlAjax + 'json/jouer.php',
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
                }),

            // div clickable pour les crédit, doit afficher les credits
            $('<div />')
                .attr('id', 'div-credits')
                .html('Credits')
                .click(function () {
                    $.ajax({
                        url: urlAjax + '',
                        method: '',
                        dataType: 'json',
                        contentType: 'application/json'
                    })
                        .done(function () {
                        })
                        .fail(function () {
                            $('body').html('Problème au niveau du serveur. <br> Le problème est de notre coté veuillez patienter.<br>Si le problème persiste veuillez nous contacter.');
                        })
                })
        );
    }
}