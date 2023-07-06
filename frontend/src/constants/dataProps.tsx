import { Button } from "@openfun/cunningham-react"
import { BUILDINGS, ROOMS, PERIPHERALS } from './';

export const buildingProps = {
    urlName: BUILDINGS,
    tableName: 'Emplacements',
    queryKey: 'buildingsQKey',
    addBtnName: 'un emplacement',
    columns: [
        {
            field: "name",
            headerName: "Nom",
            highlight: true
        }, {
            field: "adress",
            headerName: "Adresse"
        }, {
            field: "city",
            headerName: "Ville",
        }, {
            field: "postal_code",
            headerName: "Code postal",
        }, {
            field: "country",
            headerName: "Pays",
        }, {
            field: "id",
            headerName: "ID",
        }
    ]
}

export const roomProps = {
    urlName: ROOMS,
    tableName: 'Salles',
    queryKey: 'roomsQKey',
    addBtnName: 'une salle',
    columns: [
        {
            field: "name",
            headerName: "Nom",
            highlight: true
        }, {
            field: "number",
            headerName: "Numéro",
        }, {
            field: "building_id",
            headerName: "Emplacement",
        }, {
            field: "floor",
            headerName: "Étage",
        }, {
            field: "direction",
            headerName: "Direction"
        }, {
            field: "capacity",
            headerName: "Capacité",
        }
    ]

}

export const periphProps = {
    // urlName: PERIPHERALS,
    urlName: BUILDINGS,
    tableName: 'Périphériques',
    queryKey: 'periphsQKey',
    addBtnName: 'un périphérique',
    columns: [
        {
            field: "ip_terminal",
            headerName: "IP",
            highlight: true
        }, {
            field: "serial_number",
            headerName: "Numéro de série"
        }, {
            field: "terminal_type",
            headerName: "Model",
            highlight: false
        }, {
            field: "is_Init",
            headerName: "État",
            enableSorting: false
        }
    ]
}