import * as React from 'react'
import * as api from '../../api/api'
import { Button } from "@mui/material";

export default function Form({ ...props }) {
    const handleSubmit = (post: unknown) => {
        api.addData('baseURL/add-room', post)
        console.log('submitting : ', post)
    }

    return (
        <form className='wrapper form-container' onSubmit={(post) => handleSubmit(post)}>

            <h2 style={{ textAlign: 'center' }}>{props.formTitle}</h2>

            {props.children}

            <div style={{ width: '100%' }}>
                <Button fullWidth variant="contained" size="medium" id='primary-btn' type='submit'>{props.submitTitle}</Button>
                <Button fullWidth variant="outlined" size="small" id='outline-btn' style={{ marginTop: '.5rem', textTransform: 'none' }}>Besoin d'aide ?</Button>
            </div>



        </form>
    )


}


