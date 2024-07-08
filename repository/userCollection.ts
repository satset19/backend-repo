import { db } from "../config/firebaseConfig";
import { passwordHash } from "../helper/bycript";
import { signJWT } from "../helper/jwt";
import { CreatePayload, PayloadUpdate } from "../type";

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
        // console.log(process.env.KEY)
        return db.collection("users").doc(email).create(payload);
    }

    static async find(email: string) {
        const userData = db.collection("users").doc(email);
        const res = await userData.get();
        return res.data();
    }

    static async getAllUser() {
        const res = await db.collection("users").get();

        let resArr: { [key: string]: any }[] = [];
        res.forEach((doc) => {
            resArr.push(doc.data())
        })

        return resArr?.map(el => {
            delete el.password
            return el
        })
    }

    static async update(payload: PayloadUpdate, loginEmail: string) {
        const userData = db.collection("users").doc(loginEmail);
        const res = await userData.get();
        //Temporary doc
        const temp = res.data()

        const newPaylaod = {
            ...temp,
            ...payload
        }
        if (payload.email && payload.email !== loginEmail && temp) {
            const userData = db.collection("users")

            //Create doc
            this.create(payload.email, newPaylaod as CreatePayload)
            //Delete doc
            userData.doc(loginEmail).delete()


            const res = await userData.doc(newPaylaod.email).get();
            return res.data();
        }
        await userData.update(newPaylaod)
        const resUpdate = await userData.get();
        return resUpdate.data();
    }
}
