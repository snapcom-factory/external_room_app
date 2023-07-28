export interface Building {
    id?: number,
    name: string,
    address: string,
    city: string,
    postal_code: string,
    country: string | undefined,

}

export interface Room {
    id?: number,
    name: string,
    number: string,
    direction: string,
    building_id: object | string | null,
    floor: number | undefined,
    capacity: number | undefined,
    has_windows: boolean,
}

export interface Terminal {
    id?: number,
    ip_terminal: string,
    serial_number: string | null,
    terminal_type: string | null,
    is_init: boolean,
    password_keycloak: string | null,
    room_id: object | number | null,
}


export interface Meeting {
    id?: number,
    name_meeting: string,
    start_date: string | undefined,
    rooms: object | string | null,
}
