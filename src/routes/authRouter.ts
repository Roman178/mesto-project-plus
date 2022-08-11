import { Router } from 'express';
import { createUser, login } from '../controllers/users';

const authRouter = Router();

export default authRouter
  .post('/signin', login)
  .post('/signup', createUser);
