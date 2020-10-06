import React, {useEffect, useState} from "react";
import { Input } from 'antd';
import './MPResults.css'
import {AppstoreOutlined, HeartOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useTypedSelector} from "../../Redux/reduxStore";
import { Redirect } from "react-router-dom";
import {VideoItem} from "./VideoItem/VideoItem";
import {setVideoItems} from "../../Redux/videosReducer";
import {useDispatch} from "react-redux";
import { Typography } from 'antd';
import CSSTransition from "react-transition-group/CSSTransition";
import {QueryModal} from "./QueryModal/QueryModal";
import {nanoid} from "nanoid";

export const MPResults: React.FC<{}> = () => {

    const { Link } = Typography;

    const [grid, setGrid] = useState<boolean>(false)
    const [favourite, setFavourite] = useState<boolean>(false)

    const { Search } = Input;

    const dispatch = useDispatch()

    const amount = useTypedSelector(state => state.videos.amount)
    let query = useTypedSelector(state => state.videos.query)
    const videos = useTypedSelector(state => state.videos.videos)

    const suffix = (
        <Link onClick={() => setFavourite(true)}>
            <HeartOutlined
                style={{
                    fontSize: 16,
                    color: '#1890ff',
                }}
            />
        </Link>
    );

    if(!amount) return <Redirect to={'/MainPage'} />

    return <>
        <div className={'MPResults__input-label'}>
            <span>Поиск видео</span>
        </div>
        <div className={'MPResults__input'}>
            <Search
                defaultValue={query}
                placeholder="Чего хотите посмотреть?"
                enterButton="Найти"
                size="large"
                suffix={suffix}
                onSearch={(values) => dispatch(setVideoItems(values))}
            />
        </div>
        <CSSTransition in={favourite} unmountOnExit={true} timeout={150} classNames={{
            enter: 'MPResults__favorite-enter',
            enterActive: 'MPResults__favorite-enterActive',
            exit: 'MPResults__favorite-exit',
            exitActive: 'MPResults__favorite-exitActive'
        }}>
            <QueryModal setFavourite={setFavourite} />
        </CSSTransition>
        <br/>
        <div className={'MPResults__videos'}>
            <div className={'MPResults__videos-label'}>
                <span>Видео по запросу "<span className={'MPResults__query'}>{query}</span>"</span>
                <span className={'MPResults__videos-amount'}>{amount}</span>
            </div>
           <div className={'MPResults__order'}>
               <span onClick={() => setGrid(false)} className={grid ? 'MPResults__order-gridNotActive' : 'MPResults__order-gridActive'}>
                   <UnorderedListOutlined  />
               </span>
               <span onClick={() => setGrid(true)} className={grid ? 'MPResults__order-gridActive' : 'MPResults__order-gridNotActive'}>
                    <AppstoreOutlined />
                </span>
           </div>
        </div>
        <div className={grid ? "MPResults__video-gridItems" : 'MPResults__video-listItems'}>
            {videos.map((item) => {
                let id = nanoid()
                return <VideoItem key={id} grid={grid} videoTitle={item.videoTitle} channelTitle={item.channelTitle} cover={item.cover} />
            })}
        </div>
        </>
}