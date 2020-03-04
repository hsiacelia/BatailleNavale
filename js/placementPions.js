(function(){
    'use strict';
    $(()=>{
        $.ajax({
            url: '../json/placementPions.php',
            method: 'POST'
        }).done(function () {
            
        })
    })
})()