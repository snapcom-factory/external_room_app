import React from 'react'

//* API
import * as api from '../services/api.ts'

//* Components
import Form from './Forms/Form.tsx';
import MeetingForm from './Forms/MeetingForm.tsx';


export default function MeetingPage() {
    return (
        <div className='meeting-page'>
            <Form formTitle='Créer votre Réunion :' submitTitle={'Créer'} apiAction={api.createMeeting}>
                <MeetingForm />
            </Form>
        </div>
    )
}
