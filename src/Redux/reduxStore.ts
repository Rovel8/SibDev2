import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./loginReducer";
import thunk, {ThunkAction} from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import { Action } from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {initializationReducer} from "./initializationReducer";
import {videosReducer} from "./videosReducer";
import {queryReducer} from "./queryReducer";

const reducers = combineReducers({
    login: loginReducer,
    initialization: initializationReducer,
    videos: videosReducer,
    query: queryReducer
})

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export type AppStateType = ReturnType<typeof reducers>

export type InferActions<T> = T extends {[key: string]: (...args: any) => infer U} ? U : never

export type ThunkType<T> = ThunkAction<void, AppStateType, unknown, Action<T>>

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector