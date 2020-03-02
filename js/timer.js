$(document).ready(function(){
    var temps = $("[temps]");
    setInterval(function(){
        $.post("php/Timer.php", {type:"Timer"},function(data){
            temps.html("secondes" + data)
        });
    },1000);
});