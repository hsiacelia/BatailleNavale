class PlacementPions {
    constructor(tailleJardin, objets) {
        this.tailleJardin = tailleJardin;

        $('body').html('<div id="objets"></div><div id="jardinJoueur"></div><button id="reset">Remettre à zéro</button>')
            .css('background-image', 'none');

        // lier action au éléments
        $('#objets').on({
            'dragenter': entrerDrag,
            'dragover': survoleDrag,
            'dragleave': finSurvoleDrag,
            'drop': poseDrag
        })

        // créer le jardin
        for (let y = 0; y < this.tailleJardin; ++y) {
            $('#jardinJoueur').append($('<div class="ligne">'));
        }
        for (let y = 0; y < this.tailleJardin; ++y) {
            $('.ligne').append(
                $('<div class="case">')
                    .on({
                        'dragenter': entrerDrag,
                        'dragover': survoleDrag,
                        'dragleave': finSurvoleDrag,
                        'drop': poseDrag
                    })
            );
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

        // créer les objets
        jQuery.each(objets, function (i, val) {
            let srcImg = './img/objets/' + val.diminutif + '.png';
            let hauteur = val.hauteur * tailleCase;
            let largeur = val.largeur * tailleCase;
            $('#objets').append(
                $('<img />')
                    .attr({
                        'src': srcImg,
                        'draggable': 'true'
                    })
                    .data('id', i)
                    .addClass('pionPlacement')
                    .css(
                        {
                            'width': largeur,
                            'height': hauteur,
                            // 'background-image': 'url(' + srcImg + ')',
                            'background-size': 'content'
                        })
                    .on('dragstart', debutDrag)
                // .append(
                //     $('<img />')
                //         .attr('src', srcImg)
                //         .css('width', '100%')
                //         .on('dragstart', debutDrag)
                // )
                // $('<div />')
                // // .attr('src', srcImg)
                // .attr('draggable', 'true')
                // .addClass('pionPlacement')
                // .css(
                //     {
                //         'width': largeur,
                //         'height': hauteur,
                //         // 'background-image': 'url(' + srcImg + ')',
                //         'background-size': 'content'
                //     })
                // .append(
                //     $('<img />')
                //         .attr('src', srcImg)
                //         .css('width', '100%')
                //         .on('dragstart', debutDrag)
                // )
            );
        });

        function debutDrag() {
            console.log('début du déplacement');
            $('body').css('cursor', 'pointer !important');
            $(this).addClass('enMouvement');
        }

        function entrerDrag(j) {
            // console.log('entrerDrag');
            j.preventDefault()
        }

        function survoleDrag(j) {
            // console.log('survoleDrag');
            j.preventDefault()
        }

        function finSurvoleDrag() {
            // console.log('survoleDrag');
        }

        function poseDrag() {
            console.log('poseDrag');
            let enMouvement = $('.enMouvement');
            $(this).append(
                enMouvement
            );
            enMouvement.removeClass('enMouvement');
            let x = $(this).data('x');
            let y = $(this).data('y');
            let idObjet = enMouvement.data('id')
            console.log('Envoie à ajax : "idPartie": ' + idPartie + ', "idJoueur": ' + idJoueur + ',"X": ' + x + ',"Y": ' + y + ',"objet": ' + idObjet)
            $.ajax({
                url: urlAjax + 'json/placementPion.php',
                method: 'POST',
                data: {
                    "idPartie": idPartie,
                    "idJoueur": idJoueur,
                    "X": x,
                    "Y": y,
                    "objet": idObjet
                },
                dataType: 'json'/*,
                contentType: 'application/json'*/
            }).done(function (data) {
                console.log('reponse placementPion :');
                console.log(data);
                console.log(data.jardin[y].length);

                jQuery.each(data.jardin, function (y, ligne) {
                    jQuery.each(ligne, function (x, caseJson) {
                        let cssX = x + 1;
                        let cssY = y + 1;
                        // console.log('cssY ' + cssY + ' cssX ' + cssX);
                        if (caseJson != '0') {
                            let srcImg = 'img/objets/' + caseJson.substring(0,caseJson.length-1)+'.png';
                            $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')')
                                .html('')
                                .css({
                                    "background-image": "url(" + srcImg + ")",
                                    "background-size": "cover",
                                    "background-repeat": "no-repeat",
                                    "background-color": "transparent",
                                    "transform": "rotate(0deg)",
                                    "width": "39px",
                                    "height": "39px",
                                    "margin": "0px"
                                })
                            // .append(
                            //     $('<img />')
                            //         .attr('src', srcImg)
                            // );
                        }
                    });
                });

                // for (let y = 0; y < data.jardin[y].length; ++y) {
                //     for (let x = 0; x < data.jardin[y][x].length; ++x) {
                //         let cssX = x + 1;
                //         let cssY = y + 1;
                //         console.log('cssY ' + cssY + ' cssX ' + cssX);
                //         if (data.jardin[y][x] != '0-') {
                //             let srcImg = 'img/objets/' + data.jardin[y][x]
                //             $('#jardinJoueur .ligne:nth-child(' + cssY + ') .case:nth-child(' + cssX + ')')
                //                 .html('')
                //                 .append(
                //                     $('<img />')
                //                         .attr('src', srcImg)
                //                 );
                //         }
                //     }
                // }

                if ($('#objets').children().length == 0) {
                    // alert('votre placement vous convient ?');
                    $('body').append(
                        $('<button />')
                            .html('Placement terminé ?')
                            .addClass('placementTermine')
                            .on('click', placementTermine)
                    );
                }
            }).fail(function (data) {
                console.log('reponse placementPion raté :');
                console.log(data);
                $('body').html(pageErreur);
            });
        }

        function placementTermine() {
            console.log('placement terminé');
            $.ajax({
                url: urlAjax + 'json/placementFini.php',
                method: 'POST',
                data: {
                    "idPartie": idPartie,
                    "idJoueur": idJoueur
                },
                dataType: 'json'/*,
                contentType: 'application/json'*/
            }).done(function (data) {
                console.log(data)
            }).fail(function (data) {
                console.log('reponse placementPion raté :');
                console.log(data);
                $('body').html(pageErreur);
            });
        }
    }
}