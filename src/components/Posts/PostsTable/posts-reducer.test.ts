import {
  InitialStateType,
  postsReducer,
  RequestStatusType,
  setCurrentPage,
  setError,
  setPageTotalCount,
  setPosts,
  setSearchValue,
  setSortParams,
  setStatus,
  SortDirectionType,
  SortKeyType,
} from "../posts-reducer";

let initialState: InitialStateType;
beforeEach(() => {
  initialState = {
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
});

test("posts should be set", () => {
  const posts = [
    { userId: 1, id: 1, title: "Post 1", body: "Body of post 1" },
    { userId: 2, id: 2, title: "Post 2", body: "Body of post 2" },
    { userId: 3, id: 3, title: "Post 3", body: "Body of post 3" },
  ];
  const newState = postsReducer(initialState, setPosts(posts));
  expect(newState.posts).toEqual(posts);
});

test("page total count should be set", () => {
  const newState = postsReducer(initialState, setPageTotalCount(10));
  expect(newState.pageTotalCount).toEqual(10);
});
test("current page should be set", () => {
  const newState = postsReducer(initialState, setCurrentPage(2));
  expect(newState.currentPage).toEqual(2);
});

test("search value should be set", () => {
  const newState = postsReducer(initialState, setSearchValue("abc"));
  expect(newState.searchValue).toEqual("abc");
});

test("sort params should be set", () => {
  const newParams = {
    sortDirection: "desc" as SortDirectionType,
    sortKey: "title" as SortKeyType,
  };
  const newState = postsReducer(initialState, setSortParams(newParams));
  expect(newState.sortParams).toEqual(newParams);
});

test("status should be set", () => {
  const newState = postsReducer(initialState, setStatus("loading"));
  expect(newState.status).toEqual("loading");
});

test("error should be set", () => {
  const newState = postsReducer(initialState, setError("some error"));
  expect(newState.error).toEqual("some error");
});
