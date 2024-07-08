import { Request, Response, NextFunction } from 'express';
import { Error } from '../type';


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    switch (err?.name) {
        // case 401:
        //     res.status(401).json({ ok: false, ...err })
        //     break
        case 404:
            res.json({ ok: false, ...err })
            break
        case 6:
            res.status(422).json({ ok: false, ...err })
            break
        case "JsonWebTokenError":
            const newObj = { ok: false, ...err }
            newObj.message = "Invalid Token"
            res.status(401).json(newObj)
            break
        default:
            res.json({ ok: false, ...err })
    }


}