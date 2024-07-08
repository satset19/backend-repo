import jwt from "jsonwebtoken";
import { CreatePayload, JWTPayload } from "../type";
export const signJWT = (obj: JWTPayload) => {
    const secret = process.env.SECRET || 'defaultSecret'; // Provide a default value if process.env.SECRET is undefined
    return jwt.sign(obj, secret);
};
export const verifyJWT = (accessToken: string) => {
    const secret = process.env.SECRET || 'defaultSecret'; // Provide a default value if process.env.SECRET is undefined
    return jwt.verify(accessToken, secret);
};