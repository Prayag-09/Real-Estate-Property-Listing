import express from 'express';
import { createUser } from '../users/user';

const router = express.Router();

router.post('/register',createUser);
export { router as userRoute };