import { TBlog } from './blog.interface';
import { Blog } from "./blog.model";


const createBLogIntoDB = async (payload: TBlog): Promise<TBlog> => {
  const result = await Blog.create(payload);

  return result;
};

export const BlogServices = {
  createBLogIntoDB,
};
