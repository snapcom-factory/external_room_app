import React from "react";

//* React Query
import { UseQueryResult, useQuery } from "react-query";

//* API
import * as api from './api'
import * as URL from '../constants'


interface DataContextValues {
    buildings: UseQueryResult;
    rooms: UseQueryResult;
    peripherals: UseQueryResult;
}

const defaultDataContextValues: DataContextValues = {
    // eslint-disable-next-line
    // @ts-ignore:
    buildings: undefined,
    // eslint-disable-next-line
    // @ts-ignore:
    rooms: undefined,
    // eslint-disable-next-line
    // @ts-ignore:
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
        queryFn: () => api.getData(URL.PERIPHERALS)
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