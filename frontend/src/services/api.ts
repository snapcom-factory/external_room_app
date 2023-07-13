import axios from 'axios'

const mainApi = axios.create({
    baseURL: 'http://localhost:8000/api '
})

export const getData = async (urlName: string) => {
    const res = await mainApi.get(urlName)
    return res.data
}

export const addData = async (urlName: string, newData: unknown) => {
    return await mainApi.post(urlName, newData)
}

export const modData = async (urlName: string, toMod: unknown) => {
    return await mainApi.patch(urlName, toMod)
}

export const deleteData = async (urlName: string, toDelete: never) => {
    return await mainApi.delete(urlName, toDelete)
}

export const createMeeting = async (urlName: string, newMeeting: unknown) => {
    return await mainApi.post(urlName, newMeeting)
}

// export const logOut = async () => {}


export default mainApi