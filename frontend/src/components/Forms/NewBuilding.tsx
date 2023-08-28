import React from 'react'

import * as api from '../../services/api'
import * as URL from '../../constants'
import * as Types from './interfaces'

import { useQueryClient } from 'react-query'

// import { DataContext } from '../data/Queries';

import { TextInput, Box } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';

import FormBtns from '../Buttons/FormBtns';



const defaultFormValues: Types.Building = {
    name: '',
    address: '',
    city: '',
    postal_code: '',
    country: undefined,
}


export default function NewBuilding() {

    const form = useForm({
        initialValues: defaultFormValues,
        validate: {
            name: hasLength({ min: 1, max: 200 }, "Le nom doit faire entre 1 et 200 caractères"),
            address: hasLength({ min: 1, max: 200 }, "L'adresse doit faire entre 1 et 200 caractères"),
            city: hasLength({ min: 1, max: 200 }, "La ville doit faire entre 1 et 200 caractères"),
            postal_code: hasLength({ min: 1, max: 200 }, "Le code postal doit faire entre 1 et 200 caractères"),
        },
    });

    const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false)

    const queryClient = useQueryClient()


    const handleSubmit = async (values: Types.Building) => {
        setIsSubmiting(true)
        console.log('submitting new building ... : ', values)
        await api.addData(URL.ADD_BUILDING, values)
            .then(() => setTimeout(() => {
                form.reset()
                queryClient.invalidateQueries()
                setIsSubmiting(false)
            }, 250))
    }

    const handleReset = () => {
        form.reset()
    }


    return (
        <Box
            component="form"
            onSubmit={form.onSubmit(handleSubmit)}
            onReset={handleReset}>
            <h1>Add a building</h1>

            <TextInput
                {...form.getInputProps('name')}
                required
                label="Nom"
                placeholder="Nom de l'emplacement"
            />
            <TextInput
                {...form.getInputProps('address')}
                required
                label="Adresse"
                placeholder="Adresse de l'emplacement"
            />
            <TextInput
                {...form.getInputProps('city')}
                required
                label="Ville"
                placeholder="Ville de l'emplacement"
            />
            <TextInput
                {...form.getInputProps('postal_code')}
                required
                label="Code postal"
                placeholder="Code postal de l'emplacement"
            />
            <TextInput
                {...form.getInputProps('country')}
                // required
                label="Pays"
                placeholder="Pays de l'emplacement"
            />

            <br />

            <FormBtns isSubmiting={isSubmiting} />
        </Box>
    )
}
