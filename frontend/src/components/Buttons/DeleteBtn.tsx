import React from 'react'

import * as api from '../../services/api'
import { useQueryClient } from 'react-query'

import { ActionIcon } from '@mantine/core'
import { Delete } from '@mui/icons-material'

export default function DeleteBtn(props: any) {

    const queryClient = useQueryClient()

    const [isDeleting, setIsDeleting] = React.useState<boolean>(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        console.log(`deleting ${props.qK.slice(0, -1)} : `, props.deleteId)
        await api.deleteData(props.url)
            .then(() => setTimeout(() => {
                queryClient.invalidateQueries()
                setIsDeleting(false);
            }, 200))
    }

    return (
        <ActionIcon aria-label="delete" variant='outline' color='red' onClick={handleDelete} loading={isDeleting}>
            <Delete fontSize="small" />
        </ActionIcon>
    )
}
