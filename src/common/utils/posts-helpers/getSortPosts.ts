import { PostType } from "components/Posts/posts-api";
import { SortParamsType } from "components/Posts/posts-reducer";

export const getSortPosts = (
  posts: PostType[],
  sortParams: SortParamsType,
): PostType[] => {
  const { sortKey, sortDirection } = sortParams;
  return [...posts].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue === bValue) {
      return 0;
    } else if (sortDirection === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });
};
