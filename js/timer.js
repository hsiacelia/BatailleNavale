class Timer {
    constructor(tempsRestant, div, affichageMinutes) {
        let compteur = 0;
        // let chrono = $('.chrono');
        let chrono = div;
        chrono.html(conversion(tempsRestant));
        let interval = setInterval(compter, 1000);

        function conversion(s) {
            if (affichageMinutes) {
                let min = Math.floor(s / 60);
                let sec = s % 60;

                if (sec < 10) {
                    return min + ':0' + sec;
                }

                return min + ':' + sec;
            }
            else {
                return s;
            }
        }

        function compter() {
            compteur++;
            chrono.html(conversion(tempsRestant - compteur));
            if (compteur == tempsRestant) {
                if (affichageMinutes) {
                    chrono.html('0:00');
                }
                else {
                    chrono.html('0');
                }
                clearInterval(interval);
                compteur = 0;
            }

            if(tempsRestant - compteur == 3){
                div.removeClass('plusQue1');
                div.removeClass('plusQue2');
                div.addClass('plusQue3');
            }
            else if(tempsRestant - compteur == 2){
                div.removeClass('plusQue1');
                div.removeClass('plusQue3');
                div.addClass('plusQue2');
            }
            else if(tempsRestant - compteur <= 1){
                div.removeClass('plusQue2');
                div.removeClass('plusQue3');
                div.addClass('plusQue1');
            }
            else{
                div.removeClass('plusQue1');
                div.removeClass('plusQue2');
                div.removeClass('plusQue3');
            }

        }
    }
}