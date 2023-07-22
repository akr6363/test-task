import { Dispatch } from "redux";
import { setError, setStatus } from "components/Posts/posts-reducer";
import { AppActionsType } from "app/store";

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch<AppActionsType>,
) => {
  dispatch(setError(error.message ? error.message : "Some error occurred"));
  dispatch(setStatus("failed"));
};
