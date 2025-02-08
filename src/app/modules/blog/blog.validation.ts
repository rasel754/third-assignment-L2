import { z } from "zod";

 const createBlogValidationSchema = z.object({
   body: z.object({
     title: z.string().min(5, 'Title must be at least 5 characters long'),
     content: z.string().min(5, 'Content must be at least 5 characters long'),
     author: z.string(),
     isPublished: z.boolean().default(true),
   }),
 });

export const BLoagValidation = {
  createBlogValidationSchema,
};