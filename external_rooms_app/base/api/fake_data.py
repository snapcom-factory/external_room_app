# pylint: disable=unhashable-member

FAKE_DATA = {
    "rooms":
        [
            {
                "name": "roomA",
                "number": 10,
                "building_name": "Cool&Workers",
                "floor": 1,
                "capacity": 5,
                "has_windows": True,
                "direction": "Direction des renseignements",
            },
            {
                "name": "roomB",
                "number": 20,
                "building_name": "Cool&Workers",
                "floor": 3,
                "capacity": 40,
                "has_windows": True,
                "direction": "Direction des autres",
            },
            {
                "name": "roomC",
                "number": 1,
                "building_name": "Eiffel",
                "floor": 2,
                "capacity": 8,
                "has_windows": False,
                "direction": "Direction de la direction",
            },
            {
                "name": "roomD",
                "number": 40,
                "building_name": "Eiffel",
                "floor": 2,
                "capacity": 9,
                "has_windows": False,
                "direction": "Direction de la DTY",
            },
        ],
    "buildings":
        [
            {
                "name": "Cool&Workers",
                "address": "118 Avenue Charles De Gaulle",
                "city": "Neuilly-sur-Seine",
                "postal_code": "92200",
                "country": "FRANCE"
            },
            {
                "name": "Eiffel",
                "address": "1 rue Joliot-Curie",
                "city": "Gif-sur-Yvette",
                "postal_code": "91190",
                "country": "FRANCE"
            },
        ],
    "terminals":
        [
            {
                "room_name": "roomA",
                "serial_number": "1OOE901A17",
                "ip_terminal": "10.194.18.16",
                "terminal_type": "CISCO",
                "is_init": False,
            },
            {
                "room_name": "roomB",
                "serial_number": "13726EBA35",
                "ip_terminal": "12.40.50.90",
                "terminal_type": "PULSE",
                "is_init": False,
            },
            {
                "room_name": "roomC",
                "serial_number": "EJSHDJH3874610",
                "ip_terminal": "196.54.12.30",
                "terminal_type": "CISCO",
                "is_init": True,
                "password_keycloak": "23768920983efejhfdbz",
            },
            {
                "room_name": "roomD",
                "serial_number": "99029874EGGFS",
                "ip_terminal": "82.54.30.12",
                "terminal_type": "CISCO",
                "is_init": True,
                "password_keycloak": "2376ezezdbq232438dqkjdqkzjkqef",
            },
        ],
}
