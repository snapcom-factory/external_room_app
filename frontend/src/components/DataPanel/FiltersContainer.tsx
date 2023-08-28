import * as React from 'react'

import Filter from './Filter'

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Tune, ExpandMore } from '@mui/icons-material';


export default function FiltersContainer({ ...props }) {
    const [isExpanded, setIsExpanded] = React.useState(Boolean)
    const table = props.table

    return (
        <Accordion expanded={isExpanded} onChange={() => setIsExpanded(isExpanded ? false : true)} TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div className='filters-header'>
                    <Tune fontSize="small" />
                    <p> Filtres :</p>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                {/* <div className="filters-inputs ">
                    {props.columns.map((field: any) => field.header ? <Filter key={field.header} labelName={field.header} /> : null)}
                </div> */}
                <div className="filters-inputs ">
                    {table.getHeaderGroups().map((headerGroup: any) =>
                        headerGroup.headers.map((header: any) =>
                            header.column.getCanFilter() ?
                                <Filter key={header.id} column={header.column} table={table} />
                                : null
                        )
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    )
}



