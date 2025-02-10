import QueryBuilder from '../../builder/queryBuilders';
import { courseSearchAbleFileds } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBLogIntoDB = async (payload: TBlog): Promise<TBlog> => {
  const result = await Blog.create(payload);

  return result;
};

const getAllblogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(courseSearchAbleFileds)
    .sort()
    .filter();

  const result = await blogQuery.modelQuery;

  return result;
};


const deleteBLogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};


const updateBlogIntoDB = async (
  id: string,
  payload:Partial<TBlog>,
) => {
  const result = await Blog.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};



const deleteAnyBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};



export const BlogServices = {
  createBLogIntoDB,
  getAllblogFromDB,
  deleteBLogFromDB,
  updateBlogIntoDB,
  deleteAnyBlogFromDB,
};
