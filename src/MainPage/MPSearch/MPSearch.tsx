import React from "react";
import {Input} from "antd";
import './MPSearch.css'
import {Redirect} from "react-router-dom";
import {setVideoItems} from "../../Redux/videosReducer";
import {useTypedSelector} from "../../Redux/reduxStore";
import {useDispatch} from "react-redux";

export const MPSearch: React.FC<{}> = (props) => {

    const {Search} = Input;

    const amount = useTypedSelector(state => state.videos.amount)

    const dispatch = useDispatch()

    if(amount) return <Redirect to={'/MainPage/results'} />

    return<>
        <div className={'main-page__form'}>
            <div className={'main-page__form-label'}>
                Поиск видео
            </div>
            <div className={'main-page__search-input'}>
                <Search
                    placeholder="Что хотите посмотреть?"
                    enterButton="Найти"
                    size="large"
                    onSearch={(values) => dispatch(setVideoItems(values))}
                />
            </div>
        </div>
        </>
}