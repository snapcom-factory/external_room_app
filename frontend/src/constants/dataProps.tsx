import { BUILDINGS, ROOMS, } from '.';

export const buildingProps = {
    urlName: BUILDINGS,
    tableName: 'Emplacements',
    queryKey: 'buildingsQKey',
    addBtnName: 'un emplacement',
    columns: [
        {
            header: "ID",
            accessorKey: "id",
        }, {
            header: "Nom",
            accessorKey: "name",
        }, {
            accessorKey: "adress",
            header: "Adresse"
        }, {
            header: "Ville",
            accessorKey: "city",
        }, {
            header: "Code postal",
            accessorKey: "postal_code",
        }, {
            header: "Pays",
            accessorKey: "country",
        },
    ]
}

export const roomProps = {
    urlName: ROOMS,
    tableName: 'Salles',
    queryKey: 'roomsQKey',
    addBtnName: 'une salle',
    columns: [
        {
            header: "ID",
            accessorKey: "id",
        }, {
            header: "Nom",
            accessorKey: "name",
        }, {
            header: "N°",
            accessorKey: "number",
        }, {
            header: "Emplacement",
            accessorKey: "building_id",
        }, {
            header: "Étage",
            accessorKey: "floor",
        }, {
            header: "Direction",
            accessorKey: "direction",
        }, {
            header: "Capacité",
            accessorKey: "capacity",
        }
    ]
}

export const periphProps = {
    // urlName: PERIPHERALS,
    urlName: ROOMS,
    tableName: 'Périphériques',
    queryKey: 'periphsQKey',
    addBtnName: 'un périphérique',
    columns: [
        {
            header: "ID",
            accessorKey: "id",
        }, {
            accessorKey: "ip_terminal",
            header: "IP",
        }, {
            accessorKey: "serial_number",
            header: "Numéro de série"
        }, {
            accessorKey: "terminal_type",
            header: "Model",
        }, {
            accessorKey: "is_Init",
            header: "État",
        }
    ]
}