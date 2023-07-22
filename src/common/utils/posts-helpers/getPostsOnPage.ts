import { PostType } from "components/Posts/posts-api";

export const getPostsOnPage = (
  page: number,
  pageSize: number,
  posts: PostType[],
): PostType[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = (page - 1) * pageSize + pageSize;
  return posts.slice(startIndex, endIndex);
};
