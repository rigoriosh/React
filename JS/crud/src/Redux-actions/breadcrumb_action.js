import { types } from "../Tools/types"


export const setPadreBreadCrumb = (payload) => ({
    type: types.setPadreBreadCrumb,
    payload
})
export const setHijoBreadCrumb = (payload) => ({
    type: types.setHijoBreadCrumb,
    payload
})
export const resetBreadCrumb = () => ({
    type: types.resetBreadCrumb
})