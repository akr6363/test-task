import { Dispatch } from "redux";
import { postsActions } from "components/Posts/posts-reducer";
import axios, { AxiosError } from "axios";

// export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
//   dispatch(postsActions.setError(error.message ? error.message : "Some error occurred"));
//   dispatch(setStatus("failed"));
// };

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(postsActions.setError({ error }));
  } else {
    dispatch(postsActions.setError({ error: `Native error ${err.message}` }));
  }
  dispatch(postsActions.setError({ error: "failed" }));
};
