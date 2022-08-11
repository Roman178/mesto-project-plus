import { Router } from 'express';
import {
  getUsers, getUserById, updateUser,
} from '../controllers/users';

const usersRouter = Router();

export default usersRouter
  .get('/', getUsers)
  .get('/me', getUserById)
  .patch('/me', updateUser)
  .patch('/me/avatar', updateUser);
