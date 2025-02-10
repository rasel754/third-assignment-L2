import { Router } from "express";
import validateRequest from "../../middlwares/validateRequest";
import { userValidation } from "./user.validation";
import { UserController } from "./user.controller";
import authenticate from "../../middlwares/authenticate";

const userRouter = Router();

userRouter.post(
  '/create-user',
  validateRequest(userValidation.userValidationSchema),
  UserController.createUser
 
);

userRouter.patch(
  '/admin/users/:userId/block',
  authenticate('admin'),
  UserController.blockUser,
);

export default userRouter;
