export interface IUser {
    email: string,
    name: string,
    phone: string,
    active: boolean,
    uid: string,
    streamID: string[]
}

export interface IStream {
    id: string,
    title: string,
    description?: string,
    preview?: string,
    stream: any
}