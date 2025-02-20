export type T_Participant =  {
    id: number,
    name: string,
    description: string,
    phone: string,
    clas: string,
    image: string,
    status: number,
    won?: boolean
}

export type T_Tender = {
    id: string | null
    status: E_TenderStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    participants: T_Participant[]
    description: string
    won: string
    qr: string
}

export enum E_TenderStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
    is_superuser: boolean
}

export type T_TendersFilters = {
    date_formation_start: string
    date_formation_end: string
    status: E_TenderStatus
    owner: string
}

export type T_ParticipantsListResponse = {
    participants: T_Participant[],
    draft_tender_id?: number,
    participants_count?: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}

export type T_ParticipantAddData = {
    name: string;
    description: string;
    phone: number;
    image?: File | null;
}