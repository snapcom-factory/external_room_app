import Filter from './Filter'
import * as React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Tune, ExpandMore } from '@mui/icons-material';


export default function FiltersContainer() {
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
                    <Filter labelName={'Nom'}></Filter>
                    <Filter labelName={'Numéro'}></Filter>
                    <Filter labelName={'Étage'}></Filter>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}