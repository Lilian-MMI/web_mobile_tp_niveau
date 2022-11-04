## LES COMPTES 

user --> 
    username: user
    password: mdp

admin -->
    username: admin
    password: mdp

superadmin -->
    username: superadmin
    password: mdp

## LANCER LE PROJET LOCALEMENT

Si vous utilisez pnpm vous pouvez lancer la commande suivante pour lancer le projet

```bash
pnpm -r install
pnpm run -r dev
```

Sinon vous devez installer les dépendances de chaque projet avec la commande suivante

```bash
cd back
npm install
npm run dev
cd ../front
npm install
npm run dev
```

## WORKSHOP 1 PARTIE 1

L'interface de visualisation des données est uniquement accessible aux administrateurs.
Pour vous y rendre il vous suffit donc de vous connecter avec le compte admin suivant :

```bash
username: admin
password: mdp
```

Vous seriez alors redirigé vers la page d'accueil de l'application et il vous suffit de cliquer sur le bouton en haut à gauche pour ouvrir la sidebar et de cliquer sur les différents liens.

### Gestion des utilisateurs

Vous pouvez voir la liste des utilisateurs et les supprimer.
De plus, il est possible de modifier les droits d'un utilisateur en passant de "EDIT" (par défaut) à "READ ONLY". Ce changement signifie que l'utilisateur ne pourra plus modifier les données mais pourra toujours les visualiser. Il ne pourra donc plus ajouter, modifier ou supprimer les marqueurs sur la carte.

### Données météo (API)

Liste de widgets qui affichent les données météo de la ville de San Francisco (données internet).
Les données sont stockées dans une base de données Supabase (alternatif à Firebase).
Ces widgets sont déplaçables et les changements sont sauvegardés dans le localStorage du navigateur.

Les widgets seront réutilisés dans la partie 3 du workshop.

## WORKSHOP 1 PARTIE 2

### Présentation

Pour consulter cette application il suffit de se rendre dans le dossier "pwa-workshop1-partie2".
Si vous souhaitez avoir un aperçu de l'application vous pouvez vous rendre sur le lien suivant : https://shimmering-ganache-21d6c5.netlify.app/

Il suffit ensuite de renseigner dans l'input la ville de votre choix et de cliquer sur le bouton "Rechercher".
Cela vous affichera les données météo de la ville que vous avez renseigné.

Les données sont récupérées depuis l'API visualcrossing [https://www.visualcrossing.com/](https://www.visualcrossing.com/).

Vous pouvez installer cette PWA sur votre téléphone en cliquant sur l'icône en haut à droite de votre navigateur.

## WORKSHOP 1 PARTIE 3

### Présentation

Pour consulter cette application il suffit de se rendre dans le dossier "pwa-workshop1-partie3".
Si vous souhaitez avoir un aperçu de l'application vous pouvez vous rendre sur le lien suivant : https://friendly-tapioca-087e3e.netlify.app/

Une liste de quizz est affichée. Il suffit de cliquer sur un quizz pour le lancer.
Vous avez la possibilité de filtrer les quizz par catégorie et par difficulté.

Les difficultés sont les suivantes :
- facile
- moyen
- difficile

Les catégories sont les suivantes :
- animals
- brain-teasers
- celebrities
- entertainment
- for-kids
- general
- geography
- history
- hobbies
- humanities
- literature
- movies
- music
- newest
- people
- rated
- religion-faith
- science-technology
- sports
- television
- video-games
- world

Pour information, les données ont été récupérées par catégorie depuis une source internet. Les données ont été mutualisées dans deux fichiers JSON (un pour les questions et un pour les quizz).
Le script de fusion des données est disponible à l'adresse suivante : https://github.com/Lilian-MMI/quizz_data

Au total c'est 2494 quizz qui sont disponibles et 49716 questions !
Les données et les réponses des utilisateurs sont stockées à nouveau dans une base de données Supabase.

Une fois le quizz effectué, vous pouvez voir votre score.

Vous pouvez installer cette PWA sur votre téléphone en cliquant sur l'icône en haut à droite de votre navigateur.

### Fonctionnalités

- En plus de pouvoir filtrer les quizz par catégorie et par difficulté, le chargement des quizz se fait automatiquement lorsque l'utilisateur arrive en bas de la page.
Il est évident que lorsque l'on arrive sur la page, nous ne pouvons pas nous permettre de charger tous les quizz d'un coup. Cela prendrait trop de temps et cela pourrait ralentir l'application. Donc, arrivé sur la page, nous chargeons les 50 premiers quizz et lorsque l'utilisateur arrive en bas de la page, nous chargeons les 50 suivants.

- La barre de recherche pour les catégories est en débounce. Cela signifie que lorsque l'utilisateur tape dans l'input, nous attendons 500ms avant de lancer la recherche automatiquement. Cela permet d'éviter de lancer une requête à chaque caractère tapé.

### Collection de données

Les données sont vis=ualisables sur la page d'accueil du dashboard en tant qu'administrateur.
Pour vous y rendre il vous suffit donc de vous connecter avec le compte admin suivant :

```bash
username: admin
password: mdp
```

Une fois la sidebar ouverte il vous suffit de cliquer sur "Données QCM - W1P3" pour être redirigé vers la page de visualisation des données des quizz.

On peut y voir les bonnes réponses et les mauvaises réponses des joueurs dans des graphiques et aussi la moyenne de tous les scores.

### Lancement local

Pour lancer l'application en local il vous suffit de vous rendre dans le dossier "pwa-workshop1-partie3" et de lancer la commande suivante :

```bash
npm i
npm run serve
```


