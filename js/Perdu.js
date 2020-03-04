function perdu(){
    "use strict";

    $(() => {
        //récupération de l'objet état
        $obj[''] = $.ajax({
            url: 'json/etat',
            dataType: 'json',
            data:{
                text : 'etat',
            }
        })
            .done(function () {
                // Vérification de la session
                if (token === session){
                    //si le joueur a gagné
                    if ($obj.data['etat'] === "perdu") {
                        // on ajoute au body un div de classe 'gagne'affichant que l'on a gagné
                        $("body").append(
                            $("<div class='perdu'>"),
                        )
                        $("#perdu").append("Dommage vous avez perdu.. " +
                            "\n " +
                            "Cliquez sur le bouton pour revenir au menu"),
                            //IL FAUT CHANGER LE HREF BOUTON QUI RENVOIE AU MENU
                            $('<button><a href="blabla.html">Retour au menu</a></button>\n ');
                    }
                }
            })
            .fail(function () {

            })
    })
};