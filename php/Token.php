<?php
session_start();

if (isset($_GET['token'])) {
    if (isset($_SESSION['token'])) {
        if ($_GET['token'] != $_SESSION['token']) {
            exit("Erreur de token : les tokens sont différents");
        } else {
            //tout va bien
        print('tout va bien');
        }
    } else {
        $_SESSION['token'] = $_GET['token'];
        print('création token');
    }
} else {
    exit("Erreur de token : pas de token envoyé");
}

// $_COOKIE["token"] = "foo bar";
// setCookie('token', $_GET['token'], 0);