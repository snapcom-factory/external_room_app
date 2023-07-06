import Filter from './Filter'
import { Tune } from '@mui/icons-material';


export default function FiltersContainer() {
    return (
        <>
            <div className='filters-header'>
                <Tune fontSize="small" />
                <p> Filtres :</p>
            </div>
            <div className="filters-inputs">
                <Filter labelName={'Nom'}></Filter>
                <Filter labelName={'Numéro'}></Filter>
                <Filter labelName={'Étage'}></Filter>
            </div>
        </>
    )
}