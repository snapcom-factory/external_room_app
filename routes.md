# Routes de l'API

## GET ping

Sert à pinger l'application afin de déterminer si elle est accessible.

Exemple : `/api/ping`.

## GET rooms

Sert à récupérer la liste des salles enregistrées.

Exemple : `/api/rooms`.

## GET buildings

Sert à récupérer la liste des bâtiments enregistrés.

Exemple : `/api/buildings`.

## GET bdd

Sert à modifier la base de données avec des données factices.

Exemple : `/api/bdd`.

## GET infos

Sert à récupérer les informations liées à l'adresse des salles enregistrées.

Exemple : `/api/infos`.

## GET infos-room

Sert à récupérer les informations liées à l'adresse d'une salle.

Exemples : `/api/infos-room?id={ID}` ou `/api/infos-room?sn={SERIAL_NUMBER}` ou `/api/infos-room?ip={IP}`.

## GET empty

Sert à vérifier si la base de données est vide.

Exemple : `/api/empty`.

## GET delete-room

Sert à supprimer une salle de la base de données.

Exemple : `/api/delete-room/{ID}`.

## GET delete-building

Sert à supprimer un bâtiment de la base de données.

Exemple : `/api/delete-building/{ID}`.

## GET reset-bdd

Sert à vider la base de données.

Exemple : `/api/reset-bdd`.

## GET init

Sert à initialiser un terminal.

Exemples : `/api/init?id={ID}` ou `/api/init` pour tout initialiser.

## POST serial-number

Sert à envoyer le numéro de série d'un terminal.

Exemple : `/api/serial-number {"sn":"{SERIAL_NUMBER}", "type":"[cisco | pulse]"}`.

## GET get-meetings

Sert à récupérer la liste des réunions auquel un terminal est invité.

Exemple : `/api/get-meetings`.

## GET get-meetings-room

Sert à récupérer la liste des réunions auquel un terminal est invité en précisant l'IP de celui-ci.

Exemple : `/api/get-meetings-room/{IP}`.

## GET get-meeting-token

Sert à récupérer le token de connexion à une réunion pour un certain terminal.

Exemple : `/api/get-meeting-token?sn={SERIAL_NUMBER}&id={ID_MEETING}`.

## GET get-all-meetings

Sert à récupérer les réunions auxquelles les terminaux initialisés sont invités.

Exemple : `/api/get-all-meetings`.

## GET fake-meeting

Sert à créer une réunion configurée dans le fichier `external_rooms_app/base/api/script_meetings.py`.

Exemple : `/api/fake-meeting`.

## GET switch-mode

Sert à basculer entre mode push et mode pull.

Exemple : `/api/switch-mode/[push | pull]`.
