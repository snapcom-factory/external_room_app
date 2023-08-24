import React, { useEffect } from 'react'

import { useQueryClient } from 'react-query'
import * as api from '../../services/api'

import { Button } from '@mantine/core'


export default function InitBtn() {

    const queryClient = useQueryClient()

    const [isInitializing, setIsInitializing] = React.useState<boolean>(false)

    const handleInit = async () => {
        setIsInitializing(true)
        console.log("Initializing terminals")
        await api.initDevices()
            .then(() => setTimeout(() => {
                queryClient.invalidateQueries()
                setIsInitializing(false);
            }, 200))
    }

    useEffect(() => { console.log("initbtn renderin"); }, [])

    return (
        <Button
            aria-label="Initialize"
            size=''
            variant='outline'
            onClick={handleInit}
            loading={isInitializing}
            style={{ padding: '.5rem' }}
        >
            <h5>Initialiser</h5>
        </Button>
    )
}
