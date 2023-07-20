import {postsApi, PostType} from "./posts-api";
import {AppThunk} from "../../app/store";

export type PostsReducerActionType =
    ReturnType<typeof setPosts>
    | ReturnType<typeof setPageTotalCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setSearchValue>

type InitialStateType = {
    posts: PostType[]
    pageTotalCount: number
    pageSize: number
    currentPage: number
    searchValue: string
}

const initialState = {
    posts: [],
    currentPage: 1,
    pageSize: 10,
    pageTotalCount: 0,
    searchValue: ''
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


export const fetchPosts = (currentPage: number, value: string = '', pageSize: number = 10): AppThunk => (dispatch) => {
    postsApi.getPosts()
        .then((res)=> {
            const posts = foundPosts(res, value)
            dispatch(setPosts(getPostsOnPage(currentPage, pageSize, posts)))
            dispatch(setCurrentPage(currentPage))
            dispatch(setPageTotalCount(posts.length))
        })

}

const foundPosts = (posts: PostType[], value: string) => {
    return  posts.filter((post) => {
        return (
            post.id.toString().indexOf(value) !== -1 ||
            post.title.indexOf(value) !== -1 ||
            post.body.indexOf(value) !== -1
        );
    })
}


const getPostsOnPage = (page: number, pageSize: number, posts: PostType[]): PostType[] => {
    const startIndex = (page - 1) * pageSize
    const endIndex = ((page - 1) * pageSize) + pageSize
    return posts.slice(startIndex, endIndex);
}