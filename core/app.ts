import express from 'express';
import { Controller } from '../controller/api';
import cors from "cors"
import * as dotenv from "dotenv"

dotenv.config()

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.post('/', Controller.createUser)

app.post('/login', Controller.login)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    // console.log(key)
})