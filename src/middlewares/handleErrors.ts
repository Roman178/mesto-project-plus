import { ErrorRequestHandler } from 'express';
import { errorResponse, getInvalidFields } from '../helpers';
import { POST_NOT_FOUND_MESSAGE, ErrorTypesEnum, USER_NOT_FOUND_MESSAGE } from '../types/errors';
import BadRequestError from '../types/BadRequestError';

const handleErrors: ErrorRequestHandler = (err, req, res, next): void => { // eslint-disable-line
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
      if (message === USER_NOT_FOUND_MESSAGE || message === POST_NOT_FOUND_MESSAGE) {
        break;
      } else {
        statusCode = 500;
        message = 'Ошибка сервера';
      }
      break;
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
