import React from 'react'

import { useQueryClient } from 'react-query'
import * as api from '../../services/api'

import { Button } from '@mantine/core'
// import { Delete } from '@mui/icons-material'

export default function DeleteBtn(props: any) {

    const queryClient = useQueryClient()

    const [isInitializing, setIsInitializing] = React.useState<boolean>(false)

    const handleInit = async () => {
        setIsInitializing(true)
        console.log(`deleting ${props.qK.slice(0, -1)} : `, props.deleteId)
        await api.deleteData(props.url)
            .then(() => setTimeout(() => {
                queryClient.invalidateQueries()
                setIsInitializing(false);
            }, 200))
    }

    return (
        <Button aria-label="Initialize" size='' variant='outline' onClick={handleInit} loading={isInitializing} >
            <h6 >Init</h6>
        </Button>
    )
}
