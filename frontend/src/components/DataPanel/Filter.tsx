// import * as React from 'react';

import { Column, Table, } from '@tanstack/react-table'

// import { TextField, Autocomplete } from '@mui/material';
import { TextInput, NumberInput } from '@mantine/core';


export default function Filter({ column, table }: {
    column: Column<unknown, unknown>
    table: Table<unknown>
}) {

    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()


    // const [inputValue, setInputValue] = React.useState();

    // const choix = ['Direction de la direction', 'Direction de la DTY']

    console.log(`column : ${column.id}, first value : ${firstValue} : ${typeof firstValue}`);

    return (
        typeof firstValue === 'number' ?
            <div style={{ display: 'flex', gap: '.5rem', alignItems: 'end' }}>
                <NumberInput
                    type="number"
                    label={column.columnDef.header as string}
                    value={(columnFilterValue as [number, number])?.[0] ?? ''}
                    onChange={e =>
                        column.setFilterValue((old: [number, number]) => [
                            e,
                            old?.[1],
                        ])
                    }
                    placeholder={`Min`}
                    min={0}
                />
                <NumberInput
                    type="number"
                    value={(columnFilterValue as [number, number])?.[1] ?? ''}
                    onChange={e =>
                        column.setFilterValue((old: [number, number]) => [
                            old?.[0],
                            e,
                        ])
                    }
                    placeholder={`Max`}
                    min={1}
                />
            </div>
            : <TextInput
                type="text"
                label={column.columnDef.header as string}
                value={(columnFilterValue ?? '') as string}
                onChange={e => column.setFilterValue(e.target.value)}
                placeholder={column.columnDef.header as string}
            />

        // <Autocomplete
        //     sx={{ minWidth: '16rem' }}
        //     value={value}
        //     onChange={(event, newValue: any) => {
        //         setValue(newValue);
        //     }}
        //     inputValue={inputValue}
        //     onInputChange={(event, newInputValue: any) => {
        //         setInputValue(newInputValue);
        //     }}
        //     multiple

        //     size="small"
        //     options={choix}
        //     // getOptionLabel={(option) => option.title}
        //     renderInput={(params) => (
        //         <TextField
        //             {...params}
        //             variant="outlined"
        //             label={column.columnDef.header as string}
        //             placeholder={column.columnDef.header as string}
        //             sx={{ fontStyle: 'italic' }}
        //         />
        //     )}
        // />
    )
}

