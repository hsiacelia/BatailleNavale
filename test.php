<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset = "UTF-8">
    <title>test</title>
    <script type = "application/javascript" src="http://code.jquery.com/jquery-3.3.1.js"></script>
    <script type = "application/javascript" src="js/timer.js"></script>
</head>
<body>
    <?php include ('pho/Timer.php');?>
    <p temps>
        <?php
            $timer = new Timer();
            echo($timer->tour());
        ?>
    </p>
</body>
</html>
