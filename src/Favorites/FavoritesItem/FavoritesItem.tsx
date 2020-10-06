import React from "react";
import './FavoritesItem.css'
import {IQueryList} from "../../Redux/loginReducer";
import {Typography} from "antd";
import {useTypedSelector} from "../../Redux/reduxStore";
import {db} from "../../Firebase/firebase";
import {useDispatch} from "react-redux";
import {queryActions} from "../../Redux/queryReducer";
import {setVideoItems, videosActions} from "../../Redux/videosReducer";
import {NavLink} from "react-router-dom";

interface IProps{
    id: string
}

export const FavoritesItem: React.FC<IQueryList & IProps> = (props) => {

    const {Link} = Typography

    const email = useTypedSelector(state => state.login.email)
    const dispatch = useDispatch()

    return (<>
            <div className={'favItem'}>
                <div className={'favItem__name'}>
                    {props.name}
                </div>
                <div className={'favItem__actions'}>
                    <NavLink to={'/MainPage/results'}>
                        <Link onClick={() => {
                            dispatch(setVideoItems(props.query, props.sortBy, props.maxResults))
                            dispatch(videosActions.setCurrentBookmark('search'))
                        }}>Выполнить</Link>
                    </NavLink>
                    <Link onClick={() => {
                        dispatch(queryActions.setEditingQuery({query: props.query, name: props.name, maxResults: props.maxResults, sortBy: props.sortBy, queryId: props.id}))
                        dispatch(queryActions.setEditMode(true))
                    }}>Изменить</Link>
                    <Link onClick={() => db.collection(`${email}`).doc(props.id).delete()} style={{color: 'red'}}>Удалить</Link>
                </div>
            </div>
        </>
    )
}