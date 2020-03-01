class Timer{
    constructor(tempsRestant){
        var compteur = 0;
        var chrono = $('.chrono');
        chrono.html(conversion(tempsRestant));
        var interval = setInterval(compter, 1000);

        function conversion(s){
            var min = Math.floor(s / 60);
            var sec = s % 60;

            if (sec < 10){
                return min + ':0' + sec;
            }

            return min + ':' + sec;
        }

        function compter(){
            compteur++;
            chrono.html(conversion(tempsRestant - compteur));
            if(compteur == tempsRestant){
                chrono.html('0:00');
                clearInterval(interval);
                compteur = 0;
            }
        }
    }
}

(function () {
    'use strict';
    $(document).ready(function() {
        let t = new Timer(75);
    });
})();
