import {InferActions, ThunkType} from "./reduxStore";
import {getVideos} from "../API/API";
import {db} from "../Firebase/firebase";
import {queryActions} from "./queryReducer";

const SET_AMOUNT = 'SET_AMOUNT'
const SET_QUERY = 'SET_QUERY'
const SET_VIDEOS = 'SET_VIDEOS'
const CLEAR_VIDEOS_VAULT = 'CLEAR_VIDEOS_VAULT'
const SET_CURRENT_BOOKMARK = 'SET_CURRENT_BOOKMARK'

interface IVideos {
    videoTitle: string | null
    channelTitle: string | null
    cover?: string
}

const initialState = {
    videos: [] as Array<IVideos>,
    amount: 0,
    query: '' as string | undefined,
    currentBookmark: 'search'
}

type InitialStateType = typeof initialState

export const videosReducer = (state = initialState, action: Actions):InitialStateType => {
    switch (action.type){
        case SET_AMOUNT:
            return{
                ...state,
                amount: action.amount
            }
        case SET_QUERY:
            return{
                ...state,
                query: action.query
            }
        case SET_VIDEOS:
            return{
                ...state,
                videos: [...state.videos, action.payload]
            }
        case CLEAR_VIDEOS_VAULT:
            return{
                ...state,
                videos: [] // clear existing items in videos array
            }
        case SET_CURRENT_BOOKMARK:
            return {
                ...state,
                currentBookmark: action.bookmark
            }
        default: return state
    }
}

type Actions = InferActions<typeof videosActions>

export const videosActions = {
    setVideosAmount: (amount: number) => ({type: SET_AMOUNT, amount} as const),
    setQuery: (query: string | undefined) => ({type: SET_QUERY, query} as const),
    setVideos: (videoTitle: string | null, channelTitle: string | null, cover?: string) => ({
        type: SET_VIDEOS, payload: {videoTitle, channelTitle, cover}
    } as const),
    clearVideosVault: () => ({type: CLEAR_VIDEOS_VAULT} as const),
    setCurrentBookmark: (bookmark: string) => ({type: SET_CURRENT_BOOKMARK, bookmark} as const)
}

export const setVideoItems = (value: string, order = 'rating', maxResults = 12): ThunkType<string> => (dispatch) => {
        getVideos(value, order, maxResults).then(result => {
            dispatch(videosActions.clearVideosVault())
            dispatch(videosActions.setQuery(value))
            dispatch(videosActions.setVideosAmount(result.data.pageInfo.totalResults))
            result.data.items.map((item: any) => dispatch(videosActions.setVideos(item.snippet.title, item.snippet.channelTitle, item.snippet.thumbnails.medium.url)))
        })
}

export const editVideoQueryProperties = (email: string | null, name: string, editModeQueryId: string,
                                         query: string | undefined, sortBy: string | undefined, maxResults: number | undefined):ThunkType<string> => async (dispatch) => {
    await db.collection(`${email}`).doc(editModeQueryId).set({
        query: query,
        name: name,
        sortBy: sortBy,
        maxResults: maxResults
    })
    dispatch(queryActions.setEditingQuery({query: '', name: '', maxResults: 0, sortBy: '', queryId: ''}))
    dispatch(queryActions.setEditMode(false))
}

