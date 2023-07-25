const DJANGO_APP = 'localhost:8000'

export const ROOMS = `http://${DJANGO_APP}/api/rooms/`
export const BUILDINGS = `http://${DJANGO_APP}/api/buildings/`
export const PERIPHERALS = `http://${DJANGO_APP}/api/terminals/`

export const ADD_ROOM = `http://${DJANGO_APP}/api/add-room/`
export const ADD_BUILDING = `http://${DJANGO_APP}/api/add-building/`
export const ADD_PERIPHERAL = `http://${DJANGO_APP}/api/add-terminal/`

export const DEL_ROOM = `http://${DJANGO_APP}/api/delete-room/`
export const DEL_BUILDING = `http://${DJANGO_APP}/api/delete-building/`  
export const DEL_PERIPHERAL = `http://${DJANGO_APP}/api/delete-terminal/`  