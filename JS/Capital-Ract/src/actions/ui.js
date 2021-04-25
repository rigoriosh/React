import { tipos } from "../types/tipos";

export const setErrorAction = (err) => (
    {
        type: tipos.uiSetError,
        payload: err
    }
);

export const removeErrorAction = () => (
    {
        type: tipos.uiRemoveError
    }
);

export const startLoading = () => (
    {
        type: tipos.uiStartLoading,
        payload: true
    }
)
export const finishLoading = () => (
    {
        type: tipos.uiFinishLoading,
        payload: false
    }
)