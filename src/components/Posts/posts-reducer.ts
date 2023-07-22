import { postsApi, PostType } from "./posts-api";
import { AppThunk } from "app/store";
import {
  findPosts,
  getPostsOnPage,
  getSortPosts,
} from "common/utils/posts-helpers";
import { handleServerNetworkError } from "common/utils";

const initialState = {
  posts: [],
  currentPage: 1,
  pageSize: 10,
  pageTotalCount: 0,
  searchValue: "",
  sortParams: {
    sortDirection: "asc" as SortDirectionType,
    sortKey: "id" as SortKeyType,
  },
  status: "idle" as RequestStatusType,
  error: null,
};
export const postsReducer = (
  state: InitialStateType = initialState,
  action: PostsReducerActionType,
): InitialStateType => {
  switch (action.type) {
    case "posts/SET-POSTS":
      return {
        ...state,
        posts: [...action.posts],
      };
    case "posts/SET_PAGE_TOTAL_COUNT":
      return {
        ...state,
        pageTotalCount: action.pageTotalCount,
      };
    case "posts/SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case "posts/SET_SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.value,
      };
    case "posts/SET_SORT_PARAMS":
      return {
        ...state,
        sortParams: action.params,
      };
    case "posts/SET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "posts/SET_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

//--------------------actions-------------------------//

export const setPosts = (posts: PostType[]) =>
  ({ type: "posts/SET-POSTS", posts }) as const;

export const setPageTotalCount = (pageTotalCount: number) =>
  ({ type: "posts/SET_PAGE_TOTAL_COUNT", pageTotalCount }) as const;

export const setCurrentPage = (currentPage: number) =>
  ({ type: "posts/SET_CURRENT_PAGE", currentPage }) as const;

export const setSearchValue = (value: string) =>
  ({ type: "posts/SET_SEARCH_VALUE", value }) as const;

export const setSortParams = (params: SortParamsType) =>
  ({ type: "posts/SET_SORT_PARAMS", params }) as const;
export const setStatus = (status: RequestStatusType) =>
  ({ type: "posts/SET_STATUS", status }) as const;

export const setError = (error: string | null) =>
  ({ type: "posts/SET_ERROR", error }) as const;

//--------------------thunks-------------------------//

export const fetchPosts = (): AppThunk => (dispatch, getState) => {
  dispatch(setStatus("loading"));
  postsApi
    .getPosts()
    .then((res) => {
      const posts = findPosts(res, getState().posts.searchValue);
      const sortPosts = getSortPosts(posts, getState().posts.sortParams);
      dispatch(
        setPosts(
          getPostsOnPage(
            getState().posts.currentPage,
            getState().posts.pageSize,
            sortPosts,
          ),
        ),
      );
      dispatch(setPageTotalCount(sortPosts.length));
      dispatch(setStatus("succeeded"));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

//--------------------types-------------------------//

export type PostsReducerActionType =
  | ReturnType<typeof setPosts>
  | ReturnType<typeof setPageTotalCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setSearchValue>
  | ReturnType<typeof setSortParams>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof setError>;

export type SortDirectionType = "asc" | "desc";
export type SortKeyType = "id" | "title" | "body";

export type SortParamsType = {
  sortDirection: SortDirectionType;
  sortKey: SortKeyType;
};
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialStateType = {
  posts: PostType[];
  pageTotalCount: number;
  pageSize: number;
  currentPage: number;
  searchValue: string;
  sortParams: SortParamsType;
  status: RequestStatusType;
  error: string | null;
};
