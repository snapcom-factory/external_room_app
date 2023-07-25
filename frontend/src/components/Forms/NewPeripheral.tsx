import React from 'react'

import * as api from '../../services/api'
import * as URL from '../../constants'

import { useQueryClient } from 'react-query'
import { DataContext } from '../../services/Queries';

import { TextInput, Select, Box } from '@mantine/core';
import { useForm, isNotEmpty, hasLength } from '@mantine/form';

import FormBtns from './FormBtns';

interface FormValues {
    ip: string,
    serialNumber: string,
    terminalType: string,
    room: object | string | null,
}

const defaultFormValues: FormValues = {
    ip: '',
    serialNumber: '',
    terminalType: 'Cicso',
    room: '',
}


export default function NewPeripheral() {

    const db = React.useContext(DataContext).rooms

    const data = React.useMemo<any>(() => { if (db.status === 'success') return (db.data) }, [db])

    const [options, setOptions] = React.useState<Array<any>>([])

    React.useEffect(() => {
        if (db.status === 'loading') { setOptions([{ disabled: true, value: 'loading', label: 'Loading ...' }]) }
        if (db.status === 'error') { setOptions([{ disabled: true, value: 'error', label: 'An error was encountered' }]) }
        if (db.status === 'success') {
            setOptions(Array.from(data.map((e: any) => {
                return { value: e.id, label: e.name }
            })))
        }
    }, [db.status, data])


    const form = useForm({
        initialValues: defaultFormValues,
        validate: {
            ip: hasLength({ min: 1, max: 200 }, 'Le nom doit faire entre 1 et 200 caractères'),
            terminalType: isNotEmpty('Entez le model du terminal'),
        },
    });

    // const [buildingValue, setBuildingValue] = React.useState<string | null>(null)
    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false)
    const queryClient = useQueryClient()
    const handleSubmit = (values: FormValues) => {
        setIsSubmiting(true)
        console.log('submitting new peripheral ... : ', values)
        api.addData(URL.ADD_PERIPHERAL, values)
        setTimeout(() => {
            setIsSubmiting(false)
            queryClient.invalidateQueries()
            form.reset()
        }, 3000)
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
                {...form.getInputProps('ip')}
                required
                label="Ip"
                placeholder="Ip du terminal"
            />
            <TextInput
                {...form.getInputProps('serialNumber')}
                // required
                label="Numéro de série"
                placeholder="Numéro de série du terminal"
            />
            <TextInput
                {...form.getInputProps('termialType')}
                // required
                label="Model"
                placeholder="Model du terminal"
            />
            <Select
                {...form.getInputProps('room')}
                // required
                label="Salle"
                placeholder="Pick one"
                data={options}
                maxDropdownHeight={210}
                dropdownComponent="div"
                creatable
                getCreateLabel={(query) => <>+ Create {query}<p>(data not handled yet)</p></>}
                searchable
                nothingFound="Pas de résultat"
                clearable
                allowDeselect
            />

            <br />

            <FormBtns isSubmiting={isSubmiting} />
        </Box>
    )
}
