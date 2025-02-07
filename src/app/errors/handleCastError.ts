import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../utils/error.interface';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSource: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;

  return {
    success: false,
    message: ' cast error is occured ',
    statusCode,
    errorSource,
  };
};

export default handleCastError;
