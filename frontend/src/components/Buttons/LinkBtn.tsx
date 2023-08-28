import { ActionIcon } from '@mantine/core'
import { OpenInNewOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import React from 'react'

export default function LinkBtn() {
    const [error, setError] = React.useState('errorMsg')
    setError
    return (
        <ActionIcon aria-label="go to error" variant='default' color='blue'>
            <Link to="error" target="_blank" state={{ error: error }}>
                <OpenInNewOutlined fontSize="small" />
            </Link>
        </ActionIcon >
    )
}
