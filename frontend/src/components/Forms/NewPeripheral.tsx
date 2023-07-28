import React from 'react'

import * as api from '../../services/api'
import * as URL from '../../constants'
import * as Types from './interfaces'

import { useQueryClient } from 'react-query'

import { DataContext } from '../../services/Queries';

import { TextInput, Select, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

import FormBtns from '../Buttons/FormBtns';


const defaultFormValues: Types.Terminal = {
    ip_terminal: '',
    serial_number: null,
    terminal_type: 'Cisco',
    is_init: false,
    password_keycloak: null,
    room_id: null,
}


export default function NewPeripheral() {

    const db = React.useContext(DataContext)

    const buildingData = React.useMemo<any>(() => { if (db.buildings.status === 'success') return (db.buildings.data) }, [db])
    const roomData = React.useMemo<any>(() => { if (db.rooms.status === 'success') return (db.rooms.data) }, [db])

    const [options, setOptions] = React.useState<Array<any>>([])

    React.useEffect(() => {
        if (db.rooms.status === 'loading') { setOptions([{ disabled: true, value: 'loading', label: 'Loading ...' }]) }
        if (db.rooms.status === 'error') { setOptions([{ disabled: true, value: 'error', label: 'An error was encountered' }]) }
        if (db.rooms.status === 'success') {
            setOptions(Array.from(
                roomData.map((room: any) => {
                    const group = buildingData.find((building: Types.Building) => building.id == room.building_id).name
                    return { value: room.id, label: room.name, group: group }
                })
            ))
        }
    }, [db.rooms.status, roomData, buildingData])


    const form = useForm({
        initialValues: defaultFormValues,
        validate: {},
        transformValues: (values: any) => ({
            ip_terminal: values.ip_terminal,
            serial_number: values.serial_number,
            terminal_type: values.terminal_type.toLowerCase(),
            is_init: values.is_init,
            password_keycloak: values.password_keycloak,
            room_id: values.room_id,

        }),
    });

    const queryClient = useQueryClient()

    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false)

    const handleSubmit = (values: Types.Terminal) => {
        setIsSubmiting(true)
        console.log('submitting new peripheral ... : ', values)
        api.addData(URL.ADD_PERIPHERAL, values)
        setTimeout(() => {
            form.reset()
            queryClient.invalidateQueries()
            setIsSubmiting(false)
        }, 250)
    }

    const handleReset = () => {
        form.reset()
    }


    // const [searchValue, setSearchValue] = React.useState<string>('');
    return (
        <Box
            component="form"
            onSubmit={form.onSubmit(handleSubmit)}
            onReset={handleReset}>
            <h1>Add a peripheral</h1>


            <TextInput
                {...form.getInputProps('ip_terminal')}
                required
                label="Ip"
                placeholder="Ip du terminal"
            />
            <Select
                {...form.getInputProps('room_id')}
                required
                label="Salle"
                placeholder="Choisissez une salle"
                data={options ? options : ['']}
                maxDropdownHeight={220}
                dropdownComponent="div"
                creatable
                getCreateLabel={(query) => <>+ Create {query}<p>(data not handled yet)</p></>}
                searchable
                nothingFound="Pas de résultat"
                clearable
                allowDeselect
                dropdownPosition="bottom"
                limit={15}
            />
            <TextInput
                {...form.getInputProps('terminal_type')}
                // required
                label="Model"
                placeholder="Model du terminal"
                disabled={true}
            />
            <TextInput
                {...form.getInputProps('serial_number')}
                // required
                label="Numéro de série"
                placeholder="Numéro de série du terminal"
            />

            <br />

            <FormBtns isSubmiting={isSubmiting} />
        </Box>
    )
}
