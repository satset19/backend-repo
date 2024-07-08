export interface CreatePayload {
    email: string
    name: string
    password: string
    token?: string
    createdAt: Date

}

export interface JWTPayload {
    email: string
    name: string
    createdAt: Date
}

export interface Error {
    message: string
    name: string | number
}

export interface PayloadUpdate {
    email: string
    name: string
    password: string
    token?: string
    createdAt: Date
}