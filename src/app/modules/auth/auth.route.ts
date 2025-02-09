import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

router.post('/register', AuthController.registerUser);

export const AuthRoute = router;