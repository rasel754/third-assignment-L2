import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../utils/error.interface';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSource: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1], //tarking last index
      message: issue.message,
    };
  });
  const statusCode = 400;

  return {
    success: false,
    message: ' validation zod error occurred',
    statusCode,
    errorSource,
  };
};

export default handleZodError;
