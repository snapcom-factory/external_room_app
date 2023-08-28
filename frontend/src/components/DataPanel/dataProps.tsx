import * as URL from '../../constants'
import DeleteBtn from '../Buttons/DeleteBtn'
import InitBtn from '../Buttons/InitBtn';

type DataProps = {
    dataType: string;
    tableName: string;
    emptyDataMessage: string;
    addBtnName: string;
    columns: Array<object>;
}

const actionCol = (queryKey: string, url: string, isTermial?: unknown | boolean) => {
    return {
        header: () => isTermial && <InitBtn />,
        accessorKey: "id",
        cell: (cell: any) => <DeleteBtn key={cell.row.id} qK={queryKey} url={url + `${cell.getValue()}`} />,
        enableSorting: false,
        enableColumnFilter: false,
        isPlaceholder: true,
        placeholderId: "actionCol"
    }
}


export const building: DataProps = {
    dataType: 'buildings',
    tableName: 'Emplacements',
    emptyDataMessage: "d'emplacement",
    addBtnName: 'un emplacement',
    columns: [
        {
            header: "Nom",
            id: 'name',
            accessorFn: (row: any) => `${row.name} #${row.id}`,
        }, {
            accessorKey: "address",
            header: "Adresse",
        }, {
            header: "Ville",
            accessorKey: "city",
        }, {
            header: "Code postal",
            accessorKey: "postal_code",
        }, {
            header: "Pays",
            accessorKey: "country",
            cell: (cell: any) => cell.getValue().toUpperCase(),
        },
        actionCol('buildings', URL.DEL_BUILDING),
    ]
}

export const room: DataProps = {
    dataType: 'rooms',
    tableName: 'Salles',
    emptyDataMessage: "de salle",
    addBtnName: 'une salle',
    columns: [
        {
            header: "Nom",
            id: 'name',
            accessorFn: (row: any) => `${row.name} #${row.id}`,
        }, {
            header: "N°",
            accessorKey: "number",
            // cell: props => <div style={{ textAlign: 'end' }}>{props.getValue()}</div>,
        }, {
            header: "Emplacement",
            id: "building_id",
            accessorFn: (row: any) => `Id : #${row.building_id}`,
        }, {
            header: "Étage",
            id: "floor",
            accessorFn: (row: any) => !row.floor ? 'N/A' : row.floor == 1 ? `${row.floor}er` : `${row.floor}e`,
        }, {
            header: "Direction",
            accessorKey: "direction",
        }, {
            header: "Capacité",
            id: "capacity",
            accessorFn: (row: any) => !row.capacity ? 'N/A' : row.capacity == 1 ? `${row.capacity} place` : `${row.capacity} places`,
        },
        actionCol('rooms', URL.DEL_ROOM),
    ]
}

export const peripheral: DataProps = {
    dataType: 'peripherals',
    tableName: 'Périphériques',
    emptyDataMessage: "de périphérique",
    addBtnName: 'un périphérique',
    columns: [
        // { header: 'id', accessorKey: 'id' },
        {
            header: "IP",
            accessorKey: "ip_terminal",
        }, {
            header: "Salle",
            id: 'room',
            accessorFn: (row: any) => `Id : #${row.room_id}`,
        }, {
            header: "Model",
            accessorKey: "terminal_type",
            cell: (cell: any) => cell.getValue().toUpperCase(),
        }, {
            header: "Numéro de série",
            id: 'serialNb',
            accessorFn: (row: any) => row.serial_number ? row.serial_number : 'N/A',
        }, {
            header: "État",
            id: 'state',
            accessorFn: (row: any) => row.is_init ? 'Initialisé' : 'En attente',
        },
        actionCol('preipherals', URL.DEL_PERIPHERAL, true),

    ]
}