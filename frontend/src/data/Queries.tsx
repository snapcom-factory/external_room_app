import React from "react";

//* React Query
import { useQuery } from "react-query";

//* API
import * as api from '../services/api'
import * as URL from '../constants'


interface DataContextValues {
    buildings: any | unknown;
    rooms: any | unknown;
    peripherals: any | unknown;
}

const defaultDataContextValues: DataContextValues = {
    buildings: undefined,
    rooms: undefined,
    peripherals: undefined,
}

export const DataContext = React.createContext<DataContextValues>(
    defaultDataContextValues
)

interface DataContextProviderProps {
    children: JSX.Element
}


const DataContextProvider = (props: DataContextProviderProps) => {

    const buildings = useQuery({
        queryKey: ['buildings'],
        queryFn: () => api.getData(URL.BUILDINGS)
    })

    const rooms = useQuery({
        queryKey: ['rooms'],
        queryFn: () => api.getData(URL.ROOMS)
    })

    const peripherals = useQuery({
        queryKey: ['peripherals'],
        queryFn: () => api.getData(URL.ROOMS)
    })

    return (
        <DataContext.Provider
            value={{ buildings, rooms, peripherals }}
        >
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;