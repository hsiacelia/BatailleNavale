(function(){
    $(()=>{
        let dropper = document.getElementById('dropper');
        dropper.addEventListener('dragover', function(e){
            if(!e.preventDefault()){ // si la case n'est pas vide
                var requete = new XMLHttpRequest();
                requete.open('GET', '/PHP/Pion.php?x='+e.data('x')+'?y='+e.data('y'), true);
                requete.send();
            }
        })
    })
})();

