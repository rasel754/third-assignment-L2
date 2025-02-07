export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorSource: TErrorSources;
};
