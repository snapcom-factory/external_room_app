import * as React from 'react'
import * as api from '../../api/api'
import { useQuery } from 'react-query';
import { Button, TextField, Backdrop, Fade, Modal, Box, InputAdornment } from "@mui/material";
import { AddCircle, SearchRounded } from '@mui/icons-material';
import FiltersContainer from "./FiltersContainer";
import BasicTable from './BasicTable'
import Form from '../Forms/Form';
import NewDataForm from '../Forms/NewDataForm';




export default function DataPanel({ ...props }) {

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isLoading, error, data, } = useQuery({
    queryKey: [props.queryKey],
    queryFn: () => api.getData(props.urlName)
  })

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + JSON.stringify(error)

  // if (data) {
  //   console.log('Data : ', data, typeof (data))
  // }

  return (
    <>
      <div className="wrapper data-panel">

        {/* Filtres */}
        {data.length ? <FiltersContainer /> : null}


        {/* Titre */}
        <div className="table-title">

          <h3>{props.tableName} :</h3>

          <TextField sx={{ flexGrow: 1 }} id="standard-search" label="" type="search" variant="standard" size='small' InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRounded />
              </InputAdornment>
            )
          }} />

          <Button variant="contained" size="small" startIcon={<AddCircle fontSize="small" />} id='primary-btn' onClick={handleOpen}>Ajouter {props.addBtnName}</Button>

        </div>


        {/* Tableau */}
        {data.length ?
          <BasicTable db={data} columns={props.columns} ></BasicTable>
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