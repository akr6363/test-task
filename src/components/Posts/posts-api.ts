import axios from "axios";

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const postsApi = {
  getPosts() {
    return axios.get<PostType[]>("https://jsonplaceholder.typicode.com/posts").then((response) => {
      return response.data;
    });
  },
};
