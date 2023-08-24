const obtpIp = import.meta.env.VITE_OBTP_IP;
const obtpPort = import.meta.env.VITE_OBTP_PORT;
// console.log("meta-env : ", import.meta.env.VITE_OBTP_PORT)

// const obtpIp = "localhost";
// const obtpPort = "8000";

export const DJANGO_APP = `${obtpIp}:${obtpPort}`
// console.log("from index : ", DJANGO_APP)

export const GET_KEYCLOAK = `http://${DJANGO_APP}/api/get-keycloak-url`

export const NEW_MEETING = `http://${DJANGO_APP}/api/new-meeting/`

export const INIT_DEVICES = `http://${DJANGO_APP}/api/init/`

export const ROOMS = `http://${DJANGO_APP}/api/rooms/`
export const BUILDINGS = `http://${DJANGO_APP}/api/buildings/`
export const PERIPHERALS = `http://${DJANGO_APP}/api/terminals/`

export const ADD_ROOM = `http://${DJANGO_APP}/api/add-room/`
export const ADD_BUILDING = `http://${DJANGO_APP}/api/add-building/`
export const ADD_PERIPHERAL = `http://${DJANGO_APP}/api/add-terminal/`

export const DEL_ROOM = `http://${DJANGO_APP}/api/delete-room/`
export const DEL_BUILDING = `http://${DJANGO_APP}/api/delete-building/`  
export const DEL_PERIPHERAL = `http://${DJANGO_APP}/api/delete-terminal/`  