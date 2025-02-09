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


const getAllBLogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllblogFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blog are retrieved successfully',
    data: result,
  });
});


const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBLogFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blog is deleted succesfully',
    data: result,
  });
});



const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const result = await BlogServices.updateBlogIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'blog is upadate succesfully',
    data: result,
  });
});

export const BlogController = {
  createBLog,
  getAllBLogs,
  deleteBlog,
  updateBlog,
};
