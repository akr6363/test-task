import { PostType } from "components/Posts/posts-api";

export const findPosts = (posts: PostType[], value: string) => {
  return posts.filter((post) => {
    return (
      post.id.toString().indexOf(value) !== -1 ||
      post.title.indexOf(value) !== -1 ||
      post.body.indexOf(value) !== -1
    );
  });
};
