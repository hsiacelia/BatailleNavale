$(function(){
    var temps = $("[timer]");
    setInterval(function(){
        $.post("php/Timer.php", function(data){
            temps.html(data)
        })
    },1000);
});