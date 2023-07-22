import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunkMiddleWare, { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  postsReducer,
  PostsReducerActionType,
} from "components/Posts/posts-reducer";

const rootReducer = combineReducers({
  posts: postsReducer,
});

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunkMiddleWare),
);

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<
  AppRootStateType,
  unknown,
  AppActionsType
>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;

export type AppActionsType = PostsReducerActionType;
