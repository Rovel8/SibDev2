import {InferActions, ThunkType} from "./reduxStore";
import {auth, db} from "../Firebase/firebase";
import {initializationActions} from "./initializationReducer";

const SET_USER = 'SET_USER'

export interface IQueryList {
    query: string
    name: string
    maxResults?: number
    sortBy?: string
}

const initialState = {
    initialized: false,
    email: '' as string | null,
    queryList: [] as Array<IQueryList>
}

type InitialStateType = typeof initialState

export const loginReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type){
        case SET_USER:
            return{
                ...state,
                email: action.email,
                initialized: action.initialized
            }
        default: return state
    }

}

type Actions = InferActions<typeof loginActions>

export const loginActions = {
    setUser: (email: string | null, initialized: boolean) => ({type: SET_USER, email, initialized} as const)
}

export const setNewUserQuery = (query: string | undefined, name: string, email: string | null,
                                maxResults = 12, sortBy = 'rating'): ThunkType<string> => async () => {
    await db.collection(`${email}`).doc().set({
        query: query,
        name: name,
        maxResults: maxResults,
        sortBy: sortBy
    })
}

export const authStatusObserver = (): ThunkType<string> => (dispatch) => {
    auth.onAuthStateChanged((user) => {
        if(user){
            dispatch(loginActions.setUser(user.email, true))
            dispatch(initializationActions.initializeApp())
            dispatch(initializationActions.setIsFetching(false))
        }else{
            dispatch(loginActions.setUser(null, false))
            dispatch(initializationActions.initializeApp())
            dispatch(initializationActions.setIsFetching(false))
        }
    })
}

export const createNewUser = (email: string, password: string): ThunkType<string> => async (dispatch) => {
    await auth.createUserWithEmailAndPassword(email, password)
    await db.collection('users').doc(email).set({
        userEmail: email
    })
    dispatch(loginActions.setUser(email, true))
    dispatch(initializationActions.initializeApp())
    dispatch(initializationActions.setIsFetching(false))
}

export const logInUser = (email: string, password: string): ThunkType<string> => async (dispatch) => {
    await auth.signInWithEmailAndPassword(email, password)
    dispatch(loginActions.setUser(email, true))
    dispatch(initializationActions.initializeApp())
    dispatch(initializationActions.setIsFetching(false))
}

export const logoutUser = ():ThunkType<string> => async(dispatch) => {
    await auth.signOut()
    dispatch(loginActions.setUser('', false))
    dispatch(initializationActions.initializeApp())
    dispatch(initializationActions.setIsFetching(false))
}
