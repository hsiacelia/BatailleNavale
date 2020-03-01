# BatailleNavale
trello : https://trello.com/b/QAQU4JUv/bataille-denfant

## Les différents états
- Menu
- Attente d’une partie
- Placement des pions en cours
- Placement des pions fini 
- Tour 1 joue
- Tour 1 attente
- Tour 2 joue
- Tour 2 attente
- Tour n joue
- Tour n attente
- Gagne
- Perdu
- Erreur

## Caractéristiques
- Jardin de 12 cases par 12 cases
- Objets : TODO 
- Temps de placement : TODO
- Temps de tour : TODO
- Partie sauvegardé dans un .json
- Token pour chaque utilisateur

## Nomenclature
- Tout en français

## Nomenclature json
- **id** : id de la partie

- **nombreJoueurs** : le nombre de joueurs dans la partie

- **joueurs** : les joueurs avec leur id, état et matrice de jardin

    - **id** : id du joueur

    - **etat** : l'état dans lequel est le joueur
        
        - *menu* 

        - *attente partie* 

        - *placement en cours* 

        - *placement fini* 

        - *tour n joue* (où *n* est le numéro du tour)

        - *tour n attente* (où *n* est le numéro du tour)

        - *gagne* 

        - *perdu* 

        - *erreur* 

    - **jardin** : la représenation du jardin du joueur représenté par une matrice

        - **Un *"-"* représente une case non touché**

        - **Un *"+"* représente une case touché**

        - **Un *"0"* représente une case vide**

        - **Une lettre représente un objet**

        - **Exemples :**
            - *"0-"* représente une case vide non touché
            - *"0+"* représente une case vide touché
            - *"T-"* représente une case avec l'objet T non touché
            - *"T+"* représente une case avec l'objet T touché