import { db } from "../config/firebaseConfig";
import { passwordHash } from "../helper/bycript";
import { signJWT } from "../helper/jwt";
import { CreatePayload } from "../type";

export class User {
    static create(email: string, payload: CreatePayload) {
        passwordHash(payload);
        const newPayload = {
            email,
            name: payload.name,
            createdAt: new Date(),
        };
        payload.token = signJWT(newPayload);
        payload.createdAt = new Date();
        console.log(process.env.KEY)
        return db.collection("users").doc(email).create(payload);
    }

    static async find(email: string) {
        const userData = db.collection("users").doc(email);
        const res = await userData.get();
        return res.data();
    }
}
