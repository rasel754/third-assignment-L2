import { Router } from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { BLoagValidation } from './blog.validation';
import { BlogController } from './blog.controller';


const blogRouter = Router();

blogRouter.post(
  '/create-blog',
  validateRequest(BLoagValidation.createBlogValidationSchema),
  BlogController.createBLog,
);

export default blogRouter;
