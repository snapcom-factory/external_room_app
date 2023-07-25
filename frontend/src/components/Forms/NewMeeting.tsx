import React from 'react'

import * as api from '../../services/api'

import { DataContext } from '../../services/Queries';

import { TextInput, Select, Indicator, Box } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates'
import { useForm, hasLength, isNotEmpty } from '@mantine/form';

import FormBtns from './FormBtns';


interface FormValues {
    name: string,
    date: string | undefined,
    room: object | string | null,
}

const defaultFormValues: FormValues = {
    name: '',
    date: '',
    room: '',
}


export default function NewMeeting() {

    const db = React.useContext(DataContext)

    const buildingData = React.useMemo<any>(() => { if (db.buildings.status === 'success') return (db.buildings.data) }, [db])
    const roomData = React.useMemo<any>(() => { if (db.rooms.status === 'success') return (db.rooms.data) }, [db])

    const [options, setOptions] = React.useState<Array<any>>([])

    React.useEffect(() => {
        if (db.rooms.status === 'loading') { setOptions([{ disabled: true, value: 'loading', label: 'Loading ...' }]) }
        if (db.rooms.status === 'error') { setOptions([{ disabled: true, value: 'error', label: 'An error was encountered' }]) }
        if (db.rooms.status === 'success') {
            setOptions(Array.from(roomData.map((e: any) => {
                let group;
                buildingData.forEach((building: any) => {
                    if (e.building_id == building.id) group = building.name
                })
                return {
                    value: e.id, label: e.name, group: group
                }
            }
            )))
        }
    }, [db.rooms.status, roomData, buildingData])


    //* FORM
    const form = useForm({
        initialValues: defaultFormValues,
        validate: {
            name: hasLength({ min: 1, max: 200 }, "Le nom doit faire entre 1 et 200 caractères"),
            date: isNotEmpty("Selectionnez une date et un horraire"),
        },
    });

    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false)

    const handleSubmit = (values: FormValues) => {
        setIsSubmiting(true)
        console.log('submitting new meeting ... : ', values)
        //! Different api than for data posting
        api.createMeeting('add-building', values)
        setTimeout(() => {
            setIsSubmiting(false)
            form.reset()
        }, 3000)
    }

    const handleReset = () => {
        form.reset()
    }

    const today = new Date()


    return (
        <Box
            component="form"
            onSubmit={form.onSubmit(handleSubmit)}
            onReset={handleReset}>
            <h1>Create a new meeting</h1>

            <TextInput
                {...form.getInputProps('name')}
                required
                label="Nom"
                placeholder="Nom de la réunion"
            />
            <DateTimePicker
                {...form.getInputProps('date')}
                required
                label="Date et heure"
                placeholder="Date et heure de la réunion"
                valueFormat="DD MMM YYYY HH:mm"
                minDate={today}
                // allowDeselect
                clearable
                renderDay={(date) => {
                    const day = date.getDate();
                    return (
                        <Indicator size={6} color="red" offset={-4} disabled={day !== today.getDate()}>
                            <div>{day}</div>
                        </Indicator>
                    );
                }}
            />
            <Select
                {...form.getInputProps('room')}
                required
                label="Salle"
                placeholder="Choisissez une salle"
                data={options}
                maxDropdownHeight={210}
                dropdownComponent="div"
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
