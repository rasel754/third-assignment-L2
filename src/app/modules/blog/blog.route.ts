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

blogRouter.get('/', BlogController.getAllBLogs);


 blogRouter.delete(
   '/:id',
   BlogController.deleteBlog,
 );


 blogRouter.patch(
   '/:id',
   validateRequest(
     BLoagValidation.updateBlogValidationSchema
   ),
  BlogController.updateBlog
 );

export default blogRouter;
