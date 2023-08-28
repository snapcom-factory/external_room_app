import { Text } from '@mantine/core';
import { CircularProgress } from '@mui/material';
import React from 'react'
// import LinkBtn from './Buttons/LinkBtn';


interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string;
    value: string;
}

const StateDisplay = React.forwardRef<HTMLDivElement, ItemProps>(
    ({ label, value, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.5rem' }}>
                <Text size="sm" style={{ wordBreak: 'normal' }}>{label}</Text>
                {value == 'loading' && <CircularProgress size={'1rem'} thickness={5} />}
                {/* {value == 'error' && <LinkBtn />} */}
            </div>
        </div>
    )
);


export default StateDisplay
