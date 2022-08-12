import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import usersRouter from './routes/usersRouter';
import cardsRouter from './routes/cardsRouter';
import authRouter from './routes/authRouter';
import auth from './middlewares/auth';
import handleErrors from './middlewares/handleErrors';
import { requestLogger, errorLogger } from './middlewares/logger';
import authValidator from './validators/authValidator';

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('', authRouter);

app.use(authValidator(), auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // eslint-disable-line
});
