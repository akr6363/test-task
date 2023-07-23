import { postsApi, PostType } from "./posts-api";
import { findPosts, getPostsOnPage, getSortPosts } from "common/utils/posts-helpers";
import { createAppAsyncThunk, handleServerNetworkError } from "common/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateType = {
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

const slice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    setPageTotalCount(state, action: PayloadAction<{ pageTotalCount: number }>) {
      state.pageTotalCount = action.payload.pageTotalCount;
    },
    setCurrentPage(state, action: PayloadAction<{ currentPage: number }>) {
      state.currentPage = action.payload.currentPage;
    },
    setSearchValue(state, action: PayloadAction<{ value: string }>) {
      state.searchValue = action.payload.value;
    },
    setSortParams(state, action: PayloadAction<{ params: SortParamsType }>) {
      state.sortParams = action.payload.params;
    },
    setStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
    });
  },
});

//--------------------thunks-------------------------//

const fetchPosts = createAppAsyncThunk<{ posts: PostType[] }>("posts/fetchPosts", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;
  try {
    dispatch(postsActions.setStatus({ status: "loading" }));
    const res = await postsApi.getPosts();
    const posts = findPosts(res, getState().posts.searchValue);
    const sortPosts = getSortPosts(posts, getState().posts.sortParams);
    dispatch(postsActions.setPageTotalCount({ pageTotalCount: sortPosts.length }));
    dispatch(postsActions.setStatus({ status: "succeeded" }));
    return {
      posts: getPostsOnPage(getState().posts.currentPage, getState().posts.pageSize, sortPosts),
    };
  } catch (error: any) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

//--------------------types-------------------------//

export const postsReducer = slice.reducer;
export const postsActions = slice.actions;
export const postsThunks = { fetchPosts };

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
