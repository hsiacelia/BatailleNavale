class Damier{
    constructor(dest, largeur, hauteur){
        //crée les lignes
        for(let x = 0; x < largeur; x++)
        {
            $('.damier').append($('<div class="line"></div>'));
        }

        //crée les cases par ligne
        for(let y = 0; y < hauteur; y++)
        {
            $('.line').append($('<div class="case"></div>'));
        }
    }
}

class PlacementPions {
    constructor() {

        const base = document.querySelector('.base');
        const box = document.querySelectorAll('.case');

        base.addEventListener('dragstart', dragStart);
        base.addEventListener('dragend', dragEnd);

        function dragStart() {
            $('.tenu');
            setTimeout(() => (this.className = 'invisible'), 0);
        }

        function dragEnd() {
            this.className = 'base';
        }

        for (const vide of box) {
            vide.addEventListener('dragover', over);
            vide.addEventListener('dragenter', enter);
            vide.addEventListener('dragleave', leave);
            vide.addEventListener('drop', drop);
        }

        function over(j) {
            j.preventDefault()
        }

        function enter(j) {
            j.preventDefault();
        }

        function leave() {
            $('.case');
        }

        function drop() {
            $('.case');
            this.append(base);
        }
    }
}

(function() {
    new Damier('.damier', 8, 8);
    $pp = new PlacementPions();
})()