# [03/2021] BACKEND : NodeJS/ExpressJS API/backoffice

Ce répertoire à été réalisé dans le cadre d'une formation aux techniques spécifiques à la mise en place d'une API RestFull en NodeJS. Ce projet est connecté à une base de données MongoDB.

## Utilisation de ce répertoire
### Installation des modules

Le projet développé dans ce répertoire utilise différents modules que vous devez au préalable installer en tapant la commande suivante à la racine du répertoire :

```bash
npm i
```

> Cette commande téléchargera le dossier `node_modules` contenant les modules nécessaires.

Le fichier `package.json` à été modifier au niveau de la fonction `start` pour faire en sorte de relancer le serveur NodeJS à chaque modification. Pour ce faire, nous utilisons le module **Nodemone** que nous n'installons pas en tant que dépendance du projet mais globalement dans notre environnement :

```bash
sudo npm i -g nodemon
```

> L'option `sudo` est nécessaire sous Linux pour s'identifier.

### Définition des variable d'environnement

Une des notions importantes à aborder dans la gestion d'une application serveur est la protection des information qui y transite. Certaine de ces informations, comme le port serveur par exemple, ne doivent par être directement inscrites dans les fichiers, il faut les protéger en les écrivant dans une fichier `.env` qui sera charger dans l'application NodeJS grâce au module Dotenv. Le fichier `.env` ne doit jamais être "#commit#" sur un répertoire distant, vous devez donc le créer dans votre répertoire en suivant le modèle défini sans le fichier `.env.dist` :

```bash
# Serveur
PORT=
MONGO_URL=
BCRYPT=

# COOKIE
COOKIE_SECRET=
COOKIE_NAME=

# JWT
JWT_SECRET=
```

# Alice Mouchard - Projet de spécialisation M2DEV