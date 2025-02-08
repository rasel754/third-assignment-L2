import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { BlogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';


const createBLog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBLogIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blog is created is successfully',
    data: result,
  });
});

export const BlogController = {
  createBLog,
};
