import React from 'react'
import dayjs from 'dayjs'

import * as api from '../../services/api'
import * as URL from '../../constants'
import * as Types from './interfaces'

import { DataContext } from '../../services/Queries';

import { TextInput, MultiSelect, Indicator, Box } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates'
import { useForm, hasLength, isNotEmpty } from '@mantine/form';

import FormBtns from '../Buttons/FormBtns';
import StateDisplay from '../StateDisplay'


const defaultFormValues: Types.Meeting = {
    name_meeting: '',
    start_date: '',
    rooms: '',
}

export default function NewMeeting() {

    const db = React.useContext(DataContext)

    const buildingData = React.useMemo<any>(() => { if (db.buildings.status === 'success') return (db.buildings.data) }, [db])
    const roomData = React.useMemo<any>(() => { if (db.rooms.status === 'success') return (db.rooms.data) }, [db])
    const peripheralData = React.useMemo<any>(() => { if (db.peripherals.status === 'success') return (db.peripherals.data) }, [db])

    const [options, setOptions] = React.useState<Array<any>>([])

    React.useEffect(() => {
        if (db.rooms.isLoading) { setOptions([{ disabled: true, value: 'loading', label: "Chargement des salles ..." }]) }
        if (db.rooms.isError) { setOptions([{ disabled: true, value: 'error', label: "Erreur rencontrée en essayant d'atteindre la base de données" }]) }
        if (db.rooms.isSuccess) {
            setOptions(Array.from(
                peripheralData?.filter((terminal: Types.Terminal) => terminal.is_init)
                    .map((terminal: Types.Terminal) => {
                        const room = roomData.find((room: Types.Room) => room.id == terminal.room_id)
                        const group = buildingData.find((building: Types.Building) => building.id == room.building_id).name
                        return { value: room.name, label: room.name, group: group }
                    })
            ))
        }
    }, [db.rooms, peripheralData, roomData, buildingData])


    //* FORM
    const form = useForm({
        initialValues: defaultFormValues,
        transformValues: (values: any) => ({
            name_meeting: values.name_meeting,
            start_date: dayjs(values.start_date).format('YYYY-MM-DD HH:mm:ss'),
            rooms: values.rooms
        }),
        validate: {
            name_meeting: hasLength({ min: 1, max: 200 }, "Le nom doit faire entre 1 et 200 caractères"),
            start_date: isNotEmpty("Selectionnez une date et un horraire"),
        },
    });

    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false)

    const handleSubmit = (values: Types.Meeting) => {
        setIsSubmiting(true)
        console.log('submitting new meeting ... : ', values)
        //! Different api than for data posting
        api.createMeeting(URL.NEW_MEETING, values)
        setTimeout(() => {
            form.reset()
            setIsSubmiting(false)
        }, 300)
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
                {...form.getInputProps('name_meeting')}
                required
                label="Nom"
                placeholder="Nom de la réunion"
                autoFocus
            />
            <DateTimePicker
                {...form.getInputProps('start_date')}
                dropdownType="modal"
                required
                label="Date et heure"
                placeholder="Date et heure de la réunion"
                valueFormat="DD MMMM YYYY HH:mm"
                minDate={today}
                // allowDeselect
                clearable
                renderDay={(date) => {
                    const day = date.getDate();
                    const month = date.getMonth();
                    const year = date.getFullYear();
                    console.log("day = ", day);
                    console.log("today", today)
                    return (
                        <Indicator size={6} color="red" offset={-4} disabled={day !== today.getDate() || month !== today.getMonth() || year !== today.getFullYear()}>
                            <div>{day}</div>
                        </Indicator>
                    );
                }}
            />
            <MultiSelect
                {...form.getInputProps('rooms')}
                required
                label="Salles"
                placeholder="Choisissez au moins deux salles"
                data={options ? options : ['']}
                // data={data}
                maxDropdownHeight={220}
                dropdownComponent="div"
                searchable
                nothingFound="Pas de résultat"
                clearable
                dropdownPosition="bottom"
                {...(!db.buildings.isSuccess ? { itemComponent: StateDisplay } : {})}
            // itemComponent={StateDisplay}
            />

            <br />

            <FormBtns isSubmiting={isSubmiting} />
        </Box>
    )
}