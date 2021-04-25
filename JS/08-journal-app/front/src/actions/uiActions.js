import { types } from "../types/types";

export const setErrorAction = (err) => (
    {
        type: types.uiSetError,
        payload: {
            msgError: err
        }
    }
)

export const removeErrorAction = () => (
    {
        type: types.uiRemoveError
    }
)

export const startLoading = () => (
    {
        type: types.uiStartLoading
    }
)
export const finishLoading = () => (
    {
        type: types.uiFinishLoading
    }
)
