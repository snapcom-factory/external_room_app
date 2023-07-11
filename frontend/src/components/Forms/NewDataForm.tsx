import React from 'react'
import { CunninghamProvider, Input, DatePicker, Select } from '@openfun/cunningham-react'
// import { Box, TextField, Autocomplete } from '@mui/material';

export default function NewDataForm({ ...props }) {

    const [selectedBuilding, setSelectedBuilding] = React.useState([])
    const [buildingValue, setBuildingValue] = React.useState('')
    const [roomValue, setRoomValue] = React.useState('')

    return (
        <div className='inputs'>
            <CunninghamProvider>
                {props.columns.map((column: { accessorKey: React.Key | null | undefined; header: string | undefined }) => (
                    <Input key={column.accessorKey} label={column.header} />)
                )}
            </CunninghamProvider>
        </div>
    )
}