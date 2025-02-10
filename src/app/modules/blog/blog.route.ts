import { Router } from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { BLoagValidation } from './blog.validation';
import { BlogController } from './blog.controller';
import authenticate from '../../middlwares/authenticate';


const blogRouter = Router();

blogRouter.post(
  '/create-blog',
  authenticate('user' , 'admin'),
  validateRequest(BLoagValidation.createBlogValidationSchema),
  BlogController.createBLog,
);

blogRouter.get('/',authenticate('admin','user'), BlogController.getAllBLogs);


 blogRouter.delete(
   '/:id',
   authenticate('user'),
   BlogController.deleteBlog,
 );


 blogRouter.patch(
   '/:id',
   authenticate('user'),
   validateRequest(
     BLoagValidation.updateBlogValidationSchema
   ),
  BlogController.updateBlog
 );

 blogRouter.delete(
   '/blogs/:id',
   authenticate('admin'),
   BlogController.deleteBlogByAdmin,
 );


export default blogRouter;
