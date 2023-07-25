import React from 'react'

import * as api from '../../services/api'
import * as URL from '../../constants'

import { useQueryClient } from 'react-query'
import { DataContext } from '../../services/Queries';

import { TextInput, Select, NumberInput, Checkbox, Box } from '@mantine/core';
import { useForm, isNotEmpty, hasLength } from '@mantine/form';

import FormBtns from './FormBtns';

interface FormValues {
    name: string,
    number: string,
    direction: string,
    building_id: object | string | null,
    floor: number | undefined,
    capacity: number | undefined,
    has_windows: boolean,
}

const defaultFormValues: FormValues = {
    name: '',
    number: '',
    direction: '',
    building_id: '',
    floor: undefined,
    capacity: undefined,
    has_windows: false,
}


export default function NewRoom() {

    const db = React.useContext(DataContext).buildings

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
            name: hasLength({ min: 1, max: 200 }, 'Le nom doit faire entre 1 et 200 caractères'),
            number: isNotEmpty('Entez le numéro de la salle'),
            direction: isNotEmpty('Entez la direction chargée de la salle'),
            building_id: isNotEmpty("Selectionnez l'emplacenet de la salle"),
        },
    });

    // const [buildingValue, setBuildingValue] = React.useState<string | null>(null)
    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false)
    const queryClient = useQueryClient()
    const handleSubmit = async (values: FormValues) => {
        setIsSubmiting(true)
        console.log('submitting new room ... : ', values)
        await api.addData(URL.ADD_ROOM, values)
            .then(() => setTimeout(() => {
                form.reset()
                queryClient.invalidateQueries()
                setIsSubmiting(false)
            }, 250))
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
            <h1>Add a room</h1>

            <TextInput
                {...form.getInputProps('name')}
                required
                label="Nom"
                placeholder="Nom de la salle"
            />
            <NumberInput
                {...form.getInputProps('number')}
                required
                label="Numéro"
                placeholder="Numéro de la salle"
                stepHoldDelay={500}
                stepHoldInterval={100}
            />
            <TextInput
                {...form.getInputProps('direction')}
                required
                label="Direction"
                placeholder="Direction en charge de la salle"
            />
            <Select
                {...form.getInputProps('building_id')}
                required
                label="Emplacement"
                placeholder="Choisissez un emplacement"
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
            <NumberInput
                {...form.getInputProps('floor')}
                // required
                label="Étage"
                placeholder="Étage de la salle"
                stepHoldDelay={500}
                stepHoldInterval={100}
            />
            <NumberInput
                {...form.getInputProps('capacity')}
                // required
                label="Capacité"
                placeholder="Capacité de la salle"
                stepHoldDelay={500}
                stepHoldInterval={100}
            />
            <Checkbox
                {...form.getInputProps('has_windows', { type: 'checkbox' })}
                label="A des fenêtres ?"
            />

            <br />

            <FormBtns isSubmiting={isSubmiting} />
        </Box>
    )
}
