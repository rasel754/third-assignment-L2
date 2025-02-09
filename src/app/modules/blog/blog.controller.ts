import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { BlogServices } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/appError';
import { Blog } from './blog.model';

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

    const blog = await Blog.findById(id);

    if (!blog) {
      throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
    }

    if (blog.author.equals(id)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You can only delete your own blog',
      );
    }

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

  const blog = await Blog.findById(id);
 
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

   if (blog.author.equals(id)) {
     throw new AppError(
       httpStatus.FORBIDDEN,
       'You can only update your own blog',
     );
   }

  const result = await BlogServices.updateBlogIntoDB(id, req.body);

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
