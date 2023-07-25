import { Button } from "@mantine/core";

interface FormBtnStatus {
    isSubmiting: boolean
}

export default function FormBtns({ isSubmiting }: FormBtnStatus) {
    return (
        <div className='form-btn-container'>
            <Button type='reset' variant="light" disabled={isSubmiting} fullWidth>Reset</Button>
            <Button type='submit' variant="filled" loading={isSubmiting} fullWidth>Submit</Button>
        </div>
    );
}