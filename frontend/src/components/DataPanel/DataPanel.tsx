import * as React from 'react'
// import * as api from '../../services/api'

//* React(/TanStack) Table
import {
  useReactTable, getCoreRowModel,
  getSortedRowModel, SortingState,
  getPaginationRowModel,
  getFilteredRowModel, ColumnFiltersState,
} from '@tanstack/react-table'

//* Components
import FiltersContainer from "./FiltersContainer";
import BasicTable from './BasicTable'
import NewRoom from '../Forms/NewRoom';
import NewBuilding from '../Forms/NewBuilding';
import NewPeripheral from '../Forms/NewPeripheral';
// import NewDataForm from '../Formsold/NewDataForm';

import { DataContext } from '../../services/Queries';

//* UI
import { MantineProvider } from '@mantine/core';
import { Button, TextField, Backdrop, Fade, Modal, Box, InputAdornment } from "@mui/material";
import { AddCircle, SearchRounded } from '@mui/icons-material';


export default function DataPanel(props: any | unknown | string) {

  const db = React.useContext<any>(DataContext)

  const [tooSmall, setTooSmall] = React.useState(() => window.innerWidth < screen.width / 2 ? true : false)
  window.addEventListener('resize', () => setTooSmall(window.innerWidth < screen.width / 2 ? true : false))

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
  };

  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const data = React.useMemo(() => db[props.dataType].data, [db, props.dataType])

  const [rowSelection, setRowSelection] = React.useState({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState<string>('')
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns: props.columns,
    state: {
      rowSelection: rowSelection,
      sorting: sorting,
      globalFilter: globalFilter,
      columnFilters: columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    // debugTable: true,
  })

  React.useEffect(() => table.setPageSize(8), [table])

  return (
    <>
      <div className="wrapper data-panel">

        {/* Filtres */}
        {data?.length ? <FiltersContainer table={table} /> : null}


        {/* Titre */}
        <div className="table-title">

          <h3>{props.tableName} :</h3>

          <TextField disabled={data ? false : true} sx={{ flexGrow: 1 }} value={data ? globalFilter : "Pas de données"} label="" id="standard-search" type="search" variant="standard" size='small'
            InputProps={{ startAdornment: (<InputAdornment position='start'><SearchRounded /></InputAdornment>) }}
            onChange={e => setGlobalFilter(e.target.value)}

          />

          <Button disabled={data ? false : true} variant="contained" size="small" startIcon={<AddCircle fontSize="small" />} id='primary-btn' onClick={handleOpen}>
            Ajouter {tooSmall ? null : props.addBtnName}
          </Button>

        </div>


        {/* Table Status */}
        {/* {isLoading ? 'Loading ...' : null}
        {error ? <div className='error'><h4>An error has occurred:</h4> <br /> <code>{JSON.stringify(error)}</code></div> : null} */}


        {/* Tableau */}
        {db[props.dataType].isFetching && "Chargement de la base de données ..."}
        {db[props.dataType].isError && "Erreur rencontrée en essayant d'atteindre la base de données"}
        {db[props.dataType].isSuccess ? (data.length ?
          <BasicTable table={table} columns={props.columns} ></BasicTable>
          : `Pas ${props.emptyDataMessage} dans la base de données`) : null}
        {
        }

      </div >


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <MantineProvider>
              {props.dataType == 'buildings' ? <NewBuilding /> : props.dataType == 'rooms' ? <NewRoom /> : <NewPeripheral />}
            </MantineProvider>
          </Box>
        </Fade>
      </Modal >

    </>

  )

}





// return (
//   <tr>
//     <td data-cell="name">
//       <a href="{% url 'room' room.id %}">{room.name}</a>
//     </td>
//     <td data-cell="building">
//       <a href="{% url 'building' room.building_id.id %}">{room.building_id}</a>
//     </td>
//     <td data-cell="floor">{room.floor}</td>
//     <td data-cell="capacity">{room.capacity}</td>
//   </tr>
// )