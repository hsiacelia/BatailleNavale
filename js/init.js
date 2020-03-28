// let idPartie = '0000';
// let idJoueur = '1111';
let idPartie = null;
let idJoueur = null;
let urlAjax = 'https://hugolevet.fr/git/BatailleNavale/';
let Etat = new Menu();
let etatActuel;
let pageErreur = 'Problème au niveau du serveur.<br>Le problème est de notre coté veuillez patienter.<br>Si le problème perciste veuillez nous contacter.';
let tempsPlacement = 60; //secondes
let tempsTour = 20; //secondes