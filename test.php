<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset = "UTF-8">
    <title>test</title>
    <script type = "application/javascript" src="http://code.jquery.com/jquery-3.3.1.js"></script>
    <script type = "application/javascript" src="js/timer.js"></script>
</head>
<body>
    <p temps>
        <?php
            include('php/Timer.php');
            $timer = new Timer();
            $timer->commencer(true);
            $timer->affiche(1,true);
            //echo $timer->tour();
            //$timer->affiche();
        ?>
    </p>
</body>
</html>
