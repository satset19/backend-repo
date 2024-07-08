import { Request, Response, NextFunction } from 'express';
import { User } from "../repository/userCollection";




export class Controller {
    static async createUser(req: Request, res: Response, next: NextFunction) {
        // console.log(req.body)
        try {
            const payload = req.body
            const { email } = payload
            await User.create(email, payload)
            res.json({ ok: true, status: "Successful create user" }).status(201)
        } catch (error) {
            console.log(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body
            console.log(email)
            const password = req.body

            const user = await User.find(email)
            res.json({ user }).status(200)
        } catch (error) {
            console.log(error)
        }
    }

}




