# OBTP plug-in

## Équipe
- Louis BOUTHILLON
- Tom LABIAUSSE
- Quentin MACE
- Alexis ROBARDET

## Description
L'**OBTP plug-in (One Button To Push)** est une app Django servant d'intermédiaire entre Magnify et des terminaux de vision de type Cisco ou Pulse. L'application permet aux terminaux d'être à jour sur les meetings qu'ils sont invités à rejoindre. Il existe deux modes de transmission des meetings aux terminaux :
- **Mode PULL** : Les terminaux demandent à intervalles réguliers (1 minute) à l'OBTP plug-in d'actualiser leurs meetings. L'OBTP plug-in transmet la demande à Magnify puis retransmet les meetings obtenus au terminal concerné.
- **Mode PUSH** : L'OBTP plug-in demande à intervalles réguliers (5 secondes) à Magnify s'il existe de nouveaux meetings. Si c'est le cas, l'OBTP plug-in transmet ces meetings aux terminaux concernés.

L'OBTP plug-in stocke également des métadonnées concernant les terminaux et la salle de réunion associée (adresse physique, capacité, étage de la salle...). Ces métadonnées sont stockées dans une BDD PostgreSQL.

## Installation

- clone le repository : `git clone https://github.com/QuentinJGMace/external_rooms_app.git`
- se mettre à la racine du repo : `cd external_rooms_app`
- Build l'image docker du projet : `docker build -t obtp-image:1.0 .`
- Éxécuter le docker compose : `docker-compose up -d`
- Faire les migrations de la base de données et créer un compte administrateur :
    - `docker exec -it external_rooms_app_external_rooms_app_1 /bin/bash`
    - `cd external_rooms_app/`
    - `python manage.py migrate` : Cela print généralement une erreur dû au au thread qui tourne pour le mode push qui semble s'éxécuter lors du migrate (ce qu'il n'est pas censé faire). Pour l'instant cela est fix avec un try-except dans le fichier external_rooms_app/base/scheduler.py
    - `python manage.py createsuperuser`

Les conteneurs docker (app Django + BDD PostgreSQL) sont désormais installés et actifs.

## Utilisation
Toute modifification des variables d'environnements se fait dans le fichier .env situé à la racine du projet.

Exécuter les commandes suivantes afin de lancer l'OBTP plug-in :
- `docker exec -it ID_CONTAINER /bin/bash`
- `cd external_rooms_app/`
- `python manage.py runserver 0.0.0.0:8000 --noreload`

On peut ensuite accéder au front de l'OBTP plug-in sur `localhost:8000`

### Routes de l'API

Pour une liste des routes de l'API, voir le fichier de [documentation](routes.md).

## Exemple de CSV des salles
Un fichier csv exemple (rooms_data_example.csv) est fourni à la racine du projet et regroupe quelques méta-données sur des salles. Il est important que tout csv utilisé dans le cas réel ait le même format que celui ci afin d'être chargé dans la BDD PostgreSQL via le frontend Django.

## Planifier un meeting depuis l'OBTP plug-in
Il est possible de planifier un meeting directement depuis l'OBTP plug-in en invitant uniquement des salles initialisées au préalable (compte Keycloak créé).
