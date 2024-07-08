import { Request, Response, NextFunction } from 'express';
import { User } from "../repository/userCollection";
import { passwordCompare } from '../helper/bycript';

export class Controller {
    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body
            const { email } = payload
            await User.create(email, payload)
            res.status(201).json({ ok: true, status: "Successful create user" })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const user = await User.find(email)
            const hPassword = user?.password
            if (passwordCompare(password, hPassword) == false) throw { name: 401, message: "Invalid mail/password" }
            res.status(200).json({ ok: true, token: user?.token })
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {


            // console.log(req.headers)

            const payload = req.body
            const email = typeof req?.headers?.email === 'string' ? req.headers.email : '';
            const result = await User.update(payload, email);
            delete result?.password

            res.status(200).json({ ok: true, status: "Successful update user", data: result })
        } catch (error) {
            next(error)
        }
    }

    static async fetchAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            //Get user
            const users = await User.getAllUser()
            if (users.length === 0) throw { name: 404, message: "Data Not Found" }
            res.status(200).json({ ok: true, data: users })
        } catch (error) {
            next(error)
        }
    }

}




