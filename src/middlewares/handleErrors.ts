import {
  Request, Response, NextFunction, ErrorRequestHandler,
} from 'express';
import { errorResponse, getInvalidFields } from '../helpers';
import { ErrorTypesEnum } from '../types/errors';
import BadRequestError from '../types/Errors/BadRequestError';
import ConflictingRequestError from '../types/Errors/ConflictingRequestError';

const handleErrors: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction): void => { // eslint-disable-line
  let { statusCode, message } = err;
  const { name } = err;
  switch (name) {
    case ErrorTypesEnum.CAST_ERROR: {
      const badReq = new BadRequestError('Поле "_id" некорректно. Не соответсвует типу ObjectId.');
      statusCode = badReq.statusCode;
      message = badReq.message;
      break;
    }
    case ErrorTypesEnum.VALIDATION_ERROR: {
      const badReq = new BadRequestError(`Поля ${getInvalidFields(message)} не валидны.`);
      statusCode = badReq.statusCode;
      message = badReq.message;
      break;
    }
    case ErrorTypesEnum.ERROR:
      if (statusCode === 401) {
        break;
      } else {
        statusCode = 500;
        message = 'Ошибка сервера';
      }
      break;
    case ErrorTypesEnum.MONGO_SERVER_ERROR: {
      if (err.code === 11000) {
        const conflictError = new ConflictingRequestError('Пользователь с таким email уже существует.');
        message = conflictError.message;
        statusCode = conflictError.statusCode;
        break;
      } else {
        statusCode = 500;
        message = 'Ошибка сервера';
        break;
      }
    }
    default:
      statusCode = 500;
      message = 'Ошибка сервера';
      break;
  }
  res
    .status(statusCode)
    .send(errorResponse(message));
};

export default handleErrors;
