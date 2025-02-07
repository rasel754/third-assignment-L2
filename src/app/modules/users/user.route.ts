import { Router } from "express";
import validateRequest from "../../middlwares/validateRequest";
import { userValidation } from "./user.validation";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter.post(
  '/create-user',
  validateRequest(userValidation.userValidationSchema),
  UserController.createUser
 
);

export default userRouter;
