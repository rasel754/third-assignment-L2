import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlwares/globalErrorHandlers';
import { StatusCodes } from 'http-status-codes';
import userRouter from './app/modules/users/user.route';
import blogRouter from './app/modules/blog/blog.route';

const app: Application = express();

const port = 3000;

app.use(express.json());
app.use(cors());

//all routes 
app.use('/api/',userRouter)
app.use('/api/', blogRouter);



//



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: false,
    message: 'route not found',
  });
});

export default app;
