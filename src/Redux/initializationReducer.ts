import {InferActions} from "./reduxStore";

const SET_INITIALIZED_APP = 'SET_INITIALIZED_APP'
const SET_IS_FETCHING = 'SET_IS_FETCHING'

const initialState = {
    isInitialized: false,
    isFetching: false
}

type InitialStateType = typeof initialState

export const initializationReducer = (state = initialState, action:actionsType): InitialStateType => {
    switch (action.type){
        case SET_INITIALIZED_APP:
            return{
                ...state,
                isInitialized: true
            }
        case SET_IS_FETCHING:
            return{
                ...state,
                isFetching: action.isFetching
            }
        default:return state
    }
}

type actionsType = InferActions<typeof initializationActions>

export const initializationActions = {
    initializeApp: () => ({type: SET_INITIALIZED_APP} as const),
    setIsFetching: (isFetching: boolean) => ({type: SET_IS_FETCHING, isFetching} as const)
}