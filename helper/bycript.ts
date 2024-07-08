import { CreatePayload } from "../type"
import bcrypt from "bcryptjs"

export const passwordHash = (payload: CreatePayload) => {
    const salt = bcrypt.genSaltSync(10)
    payload.password = bcrypt.hashSync(payload.password, salt)
    return payload
}

export const passwordCompare = (password: string, hasPassword: string) => {
    return bcrypt.compareSync(password, hasPassword)
}