import express from 'express';
import { Controller } from '../controller/api';
export const auth = express.Router()

auth.post('/login', Controller.login)