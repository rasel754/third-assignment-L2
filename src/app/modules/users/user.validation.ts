import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First name is required')
    .max(25, 'Name cannot be more than 20 characters')
    .transform((value) => value.trim()), 
  middleName: z
    .string()
    .transform((value) => value?.trim() || ''),
  lastName: z
    .string()
    .transform((value) => value.trim()), 
});
 const userValidationSchema = z.object({
  body: z.object({
    name: UserNameValidationSchema,
    email: z.string().email('Invalid email format'),
    password: z.string(),
    role: z.enum(['admin', 'user']).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

export const userValidation = {
  userValidationSchema,
};
