import { TErrorSources, TGenericErrorResponse } from '../utils/error.interface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSource: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = 400;

  return {
    success: false,
    message: ' duplicate error is occurred',
    statusCode,
    errorSource,
  };
};

export default handleDuplicateError;
