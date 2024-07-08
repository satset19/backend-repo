import express from 'express';
import cors from "cors"
import * as dotenv from "dotenv"
import { user } from '../routes/userRoutes';
import { auth } from '../routes/auth';
import { errorHandler } from '../entities/ApiError';

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/user", user)
app.use('/auth', auth)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    // console.log(key)
})