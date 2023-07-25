import DeleteBtn from '../Buttons/DeleteBtn'
import * as URL from '../../constants'

type DataProps = {
    dataType: string;
    tableName: string;
    addBtnName: string;
    columns: Array<object>;
}

const actionCol = (queryKey: string, url: string) => {
    return {
        header: null,
        accessorKey: "id",
        cell: (cell: any) => <DeleteBtn key={cell.row.id} qK={queryKey} url={url + `${cell.getValue()}`} />,
        enableSorting: false,
        enableColumnFilter: false,
    }
}


export const building: DataProps = {
    dataType: 'buildings',
    tableName: 'Emplacements',
    addBtnName: 'un emplacement',
    columns: [
        {
            header: "Nom",
            accessorKey: "name",
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
        },
        actionCol('buildings', URL.DEL_BUILDING),
    ]
}

export const room: DataProps = {
    dataType: 'rooms',
    tableName: 'Salles',
    addBtnName: 'une salle',
    columns: [
        {
            header: "Nom",
            accessorKey: "name",
        }, {
            header: "N°",
            accessorKey: "number",
            // cell: props => <div style={{ textAlign: 'end' }}>{props.getValue()}</div>,
        }, {
            header: "Emplacement",
            accessorKey: "building_id",
            cell: (cell: any) => { return <div>{cell.getValue()}</div> },
        }, {
            header: "Étage",
            accessorKey: "floor",
        }, {
            header: "Direction",
            accessorKey: "direction",
        }, {
            header: "Capacité",
            accessorKey: "capacity",
        },
        actionCol('rooms', URL.DEL_ROOM),
    ]
}

export const peripheral: DataProps = {
    dataType: 'peripherals',
    tableName: 'Périphériques',
    addBtnName: 'un périphérique',
    columns: [
        // { header: 'id', accessorKey: 'id' },
        {
            header: "IP",
            accessorKey: "ip_terminal",
        }, {
            header: "Salle",
            accessorKey: "room_id",
        }, {
            header: "Model",
            accessorKey: "terminal_type",
        }, {
            header: "Numéro de série",
            id: 'serialNb',
            accessorFn: (row: any) => row.serial_number ? row.serial_number : 'N/A',
        }, {
            header: "État",
            id: 'state',
            accessorFn: (row: any) => row.is_init ? 'Initialisé' : 'En attente',
        },
        actionCol('preipherals', URL.DEL_PERIPHERAL),

    ]
}