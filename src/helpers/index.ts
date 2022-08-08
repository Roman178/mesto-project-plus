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

export { successResponse, errorResponse, getInvalidFields };
