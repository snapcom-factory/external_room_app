import * as React from 'react'

import Filter from './Filter'

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Tune, ExpandMore } from '@mui/icons-material';


export default function FiltersContainer(props: any) {
    const [isExpanded, setIsExpanded] = React.useState(Boolean)

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
                <div className="filters-inputs ">
                    {props.columns.map((field: any) => <Filter key={field.header} labelName={field.header} />)}
                </div>
            </AccordionDetails>
        </Accordion>
    )
}