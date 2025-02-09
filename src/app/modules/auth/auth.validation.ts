import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string({
      required_error: 'id must be a string',
    }),
    password: z.string({
      required_error: 'password must be a string',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,

};