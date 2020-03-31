class Perdu {
    constructor() {
        $('body').html('<div class="finPartie">' +
            '<div></div>' +
            '<div id="bulle"><p>J\'ai perdu ...</p></div>' +
            '<div></div>' +
            '</div>' +
            '<div class="finPartie">' +
            '<div><img src="img/garcon 1 - triste.png" alt=""></div>' +
            '<div id="rejouer"><button>Rejouez</button></div>' +
            '<div><img src="img/garcon 1 - heureux.png" alt=""></div>' +
            '</div>')
            .css('background-image', 'none');
    }
}