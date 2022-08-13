import { ISuccessResponse, IErrorResponse } from '../types/interfaces';

const successResponse = (data: any): ISuccessResponse => ({
  status: 'success',
  data,
});

const errorResponse = (message: string): IErrorResponse => ({
  status: 'error',
  message,
});

const getInvalidFields = (message: string): string => {
  const invalidFields: string[] = [];
  message.split(' ').forEach((word: string, i: number, arr: string[]) => {
    if (word === 'Path') invalidFields.push(arr[i + 1]);
  });

  return invalidFields.join(', ');
};

const urlRegexp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/; // eslint-disable-line
const urlValidator = (value: string) => urlRegexp.test(value);

export {
  successResponse, errorResponse, getInvalidFields, urlValidator, urlRegexp,
};
