import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../helper/jwt';
import { JWTPayload } from '../type';

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.headers
        if (!token) throw { code: 401, message: "Please login first" }

        //Verify Token
        const tokenString = Array.isArray(token) ? token[0] : token;
        const { email } = verifyJWT(tokenString) as JWTPayload;
        req.headers.email = email
        next()
    } catch (error) {
        next(error)
    }



} 