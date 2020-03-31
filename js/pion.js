(function(){
    $(()=>{
        let dropper = document.getElementById('dropper');
        dropper.addEventListener('dragover', function(e){
            if(!e.preventDefault()){ // si la case n'est pas vide
                let coordX = e.data('x');
                let coordY = e.data('y');
                $.ajax({
                    type : 'POST',
                    url : './php/pion.php',
                    data : {x : coordX, y : coordY}
                })
            }
        })
    })
})();
