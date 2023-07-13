import * as React from 'react'
import * as api from '../../services/api'

//* React(/TanStack) Table
import { useReactTable, getCoreRowModel, getSortedRowModel, SortingState, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'

//* Components
import FiltersContainer from "./FiltersContainer";
import BasicTable from './BasicTable'
import Form from '../Forms/Form';
import NewDataForm from '../Forms/NewDataForm';

//* UI
import { Button, TextField, Backdrop, Fade, Modal, Box, InputAdornment } from "@mui/material";
import { AddCircle, SearchRounded } from '@mui/icons-material';
import { DataContext } from '../../data/Queries';


export default function DataPanel(props: any | unknown) {

  const db = React.useContext(DataContext)

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


  const data = React.useMemo(() => db.rooms.data, [db])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState<string>('')

  const table = useReactTable({
    data,
    columns: props.columns,
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,

    // debugTable: true,
  })


  return (
    <>
      <div className="wrapper data-panel">

        {/* Filtres */}
        {data?.length ? <FiltersContainer {...props} /> : null}


        {/* Titre */}
        <div className="table-title">

          <h3>{props.tableName} :</h3>

          <TextField sx={{ flexGrow: 1 }} disabled={data ? false : true} value={data ? globalFilter : "Pas de données"} label="" id="standard-search" type="search" variant="standard" size='small'
            InputProps={{ startAdornment: (<InputAdornment position='start'><SearchRounded /></InputAdornment>) }}
            onChange={e => setGlobalFilter(e.target.value)}

          />

          <Button variant="contained" size="small" startIcon={<AddCircle fontSize="small" />} id='primary-btn' onClick={handleOpen}>
            Ajouter {tooSmall ? null : props.addBtnName}
          </Button>

        </div>


        {/* Table Status */}
        {/* {isLoading ? 'Loading ...' : null}
        {error ? <div className='error'><h4>An error has occurred:</h4> <br /> <code>{JSON.stringify(error)}</code></div> : null} */}


        {/* Tableau */}
        {data?.length ?
          <BasicTable table={table} columns={props.columns} ></BasicTable>
          : 'Pas de salles dans la base de données'
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
            <Form formTitle={'Ajouter ' + `${props.addBtnName}`} submitTitle={'Ajouter'} apiAction={api.addData} urlName={props.urlName}>
              <NewDataForm {...props} />
            </Form>
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