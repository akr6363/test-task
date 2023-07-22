import {postsApi, PostType} from "./posts-api";
import {AppRootStateType, AppThunk} from "../../app/store";

export type PostsReducerActionType =
    ReturnType<typeof setPosts>
    | ReturnType<typeof setPageTotalCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setSearchValue>
    | ReturnType<typeof setSortParams>

export type SortDirectionType = 'asc' | 'desc'
export type SortKeyType = 'id' | 'title' | 'body'

export type SortParamsType = {
    sortDirection: SortDirectionType
    sortKey: SortKeyType
}

type InitialStateType = {
    posts: PostType[]
    pageTotalCount: number
    pageSize: number
    currentPage: number
    searchValue: string
    sortParams: SortParamsType
}

const initialState = {
    posts: [],
    currentPage: 1,
    pageSize: 10,
    pageTotalCount: 0,
    searchValue: '',
    sortParams: {
        sortDirection: 'asc' as SortDirectionType,
        sortKey: 'id' as SortKeyType
    }

};

export const postsReducer = (state: InitialStateType = initialState, action: PostsReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'posts/SET-POSTS':
            return {
                ...state,
                posts: [...action.posts]
            }
        case 'posts/SET_PAGE_TOTAL_COUNT':
            return {
                ...state,
                pageTotalCount: action.pageTotalCount
            }
        case 'posts/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'posts/SET_SEARCH_VALUE':
            return {
                ...state,
                searchValue: action.value
            }
        case 'posts/SET_SORT_PARAMS':
            return {
                ...state,
                sortParams: action.params
            }
        default:
            return state
    }
}

export const setPosts = (posts: PostType[]) =>
    ({type: 'posts/SET-POSTS', posts} as const)

export const setPageTotalCount = (pageTotalCount: number) =>
    ({type: 'posts/SET_PAGE_TOTAL_COUNT', pageTotalCount} as const)

export const setCurrentPage = (currentPage: number) =>
    ({type: 'posts/SET_CURRENT_PAGE', currentPage} as const)

export const setSearchValue = (value: string) =>
    ({type: 'posts/SET_SEARCH_VALUE', value} as const)

export const setSortParams = (params: SortParamsType) =>
    ({type: 'posts/SET_SORT_PARAMS', params} as const)


export const fetchPosts = (): AppThunk => (dispatch, getState) => {
    postsApi.getPosts()
        .then((res) => {
            const posts = foundPosts(res, getState().posts.searchValue)
            const sortPosts = getSortPosts(posts, getState().posts.sortParams)
            dispatch(setPosts(getPostsOnPage(getState().posts.currentPage, getState().posts.pageSize, sortPosts)))
            dispatch(setPageTotalCount(sortPosts.length))
        });
};

const foundPosts = (posts: PostType[], value: string) => {
    return posts.filter((post) => {
        return (
            post.id.toString().indexOf(value) !== -1 ||
            post.title.indexOf(value) !== -1 ||
            post.body.indexOf(value) !== -1
        );
    })
}


const getSortPosts = (posts: PostType[], sortParams: SortParamsType): PostType[] => {
    const { sortKey, sortDirection } = sortParams;
    return [...posts].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (aValue === bValue) {
            return 0;
        } else if (sortDirection === 'asc') {
            return aValue < bValue ? -1 : 1;
        } else {
            return aValue > bValue ? -1 : 1;
        }
    });
};

const getPostsOnPage = (page: number, pageSize: number, posts: PostType[]): PostType[] => {
    const startIndex = (page - 1) * pageSize
    const endIndex = ((page - 1) * pageSize) + pageSize
    return posts.slice(startIndex, endIndex);
}
