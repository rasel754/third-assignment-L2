import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../utils/error.interface';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSource: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    success: false,
    message: ' validation error is occurred',
    statusCode,
    errorSource,
  };
};

export default handleValidationError;
