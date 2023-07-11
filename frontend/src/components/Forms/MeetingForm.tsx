import React from 'react'
import { CunninghamProvider, Input, DatePicker, Select } from '@openfun/cunningham-react'
// import { Box, TextField, Autocomplete } from '@mui/material';

export default function MeetingForm() {

    const bat1 = [{ label: 'Salle 23', value: 'room23' }, { label: 'Salle 56', value: 'room56' },]
    const bat2 = [{ label: 'Salle 1', value: 'room1' }, { label: 'Salle 751', value: 'room751' }, { label: 'Salle 84', value: 'room84' }, { label: 'Salle 19', value: 'room19' },]

    const buildings = [{ label: 'Batiment 1', value: 'bat1' }, { label: 'Batiment 2', value: 'bat2' }]

    const [selectedBuilding, setSelectedBuilding] = React.useState([])
    const [buildingValue, setBuildingValue] = React.useState('')
    const [roomValue, setRoomValue] = React.useState('')



    return (
        <div className='inputs'>
            <CunninghamProvider>

                <Input label="Titre" />

                <DatePicker label="Date" />

                <input type='time' id='time-picker' />

                <Select label='Emplacement' options={buildings} value={buildingValue} searchable
                    onChange={e => {
                        setRoomValue(e)
                        setBuildingValue(e.target.value ? (e.target.value as string) : '')
                        setSelectedBuilding(e.target.value ? eval(e.target.value as string) : [])
                    }}
                ></Select>

                <Select label='Salle' options={selectedBuilding} value={roomValue} text={buildingValue ? '' : "Sélectionner un emplacement"} disabled={buildingValue ? false : true} ></Select>

            </CunninghamProvider>
        </div>

    )
}


