import {InferActions} from "./reduxStore";

const SET_EDITING_QUERY = 'SET_EDITING_QUERY'
const SET_EDIT_MODE = 'SET_EDIT_MODE'

const initialState = {
    query: '',
    name: '',
    maxResults: 0 as number | undefined,
    sortBy: '' as string | undefined,
    editMode: false,
    queryId: ''
}

type InitialStateType = typeof initialState

export const queryReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type){
        case SET_EDITING_QUERY:
            return{
                ...state,
                query: action.payload.query,
                name: action.payload.name,
                maxResults: action.payload.maxResults,
                sortBy: action.payload.sortBy,
                queryId: action.payload.queryId
            }
        case SET_EDIT_MODE:
            return{
                ...state,
                editMode: action.edit
            }
        default: return state
    }
}

type Actions = InferActions<typeof queryActions>

interface IPayload {
    query: string
    name: string
    maxResults?: number
    sortBy?: string
    queryId: string
}

export const queryActions = {
    setEditingQuery: (payload: IPayload) => ({type: SET_EDITING_QUERY, payload} as const),
    setEditMode: (edit: boolean) => ({type: SET_EDIT_MODE, edit} as const)
}