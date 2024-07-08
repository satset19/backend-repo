import express from 'express';
import { Controller } from '../controller/api';
import { isLogin } from '../middleware/authMiddleware';
export const user = express.Router()

user.post('/create', Controller.createUser)
user.use(isLogin)
user.get("/fetch-user-data", Controller.fetchAllUser)
user.post("/update-user-data", Controller.updateUser)