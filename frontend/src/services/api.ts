import axios from 'axios'
import {DJANGO_APP} from '../constants/index'

const mainApi = axios.create({
    baseURL: DJANGO_APP
})

export const createMeeting = async (urlName: string, newMeeting: any) => {  
    await mainApi.post(urlName, JSON.stringify(newMeeting),{
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => console.log('FROM SERVER : ', 'recieved : ', response))
        .catch((error) => console.log(error))
}

export const getData = async (urlName: string) => {
    const res = await mainApi.get(urlName)
    return res.data
}

export const addData = async (urlName: string, newData: any) => {
    console.log('FROM API : ', 'url : ', urlName)
    console.log('FROM API : ', 'newData : ', newData)
    console.log('FROM API : ', 'stringified : ', JSON.stringify(newData))
    await mainApi.post(urlName, JSON.stringify(newData), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => console.log('FROM SERVER : ', 'created : ', response))
        .catch((error) => console.log(error))
}

export const deleteData = async (urlName: string) => {
    console.log('FROM API : ', 'url : ', urlName)
    await mainApi.delete(urlName)
        .then((response) => console.log('FROM SERVER : ', 'res : ', response))
        .catch((error) => console.log(error))
}

// export const initDevice = async (urlName: string) => {
//     console.log('FROM API : ', 'url : ', urlName)
//     await mainApi.get(urlName)
//         .then((response) => console.log('FROM SERVER : ', 'res : ', response))
//         .catch((error) => console.log(error))
// }


export default mainApi