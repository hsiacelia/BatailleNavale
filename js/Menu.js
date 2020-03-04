


//cree les element du menu : (bouton jouer, crédits ...)
class Menu {
    constructor() {
        $('body').append(
            $('<button />')
                .attr('id', 'bouton-jouer')
                .html('Jouer')
                .click(function () {
                    $.ajax({
                        url: './json/jouer.php',
                        method: 'POST'
                    })
                    .done(function (data) {
                        console.log(data);
                        // idPartie = data.idPartie;
                        // idJoueur = data.idJoueur;
                    })
                    .fail(function () {
                        $('body').html('Problème au niveau du serveur. <br> Le problème est de notre coté veuillez patienter.<br>Si le problème persiste veuillez nous contacter.');
                    })
                }),
            // div clickable pour les crédit, doit afficher les credits
            $('<div />')
                .attr('id', 'div-credits')
                .html('Credits')
                .click(function () {
                    $.ajax({
                        url: '',
                        method: ''
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
$(document).ready(function (){
    let menu = new Menu();
})


