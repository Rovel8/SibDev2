import React from "react";
import './VideoItem.css'

interface IProps {
    videoTitle: string | null
    channelTitle: string | null
    cover?: string
    grid: boolean
}

export const VideoItem: React.FC<IProps> = (props) => {
    return<>
        <div className={props.grid ? 'videoGrid' : 'videoList'}>
            <div className={props.grid ? 'video__coverGrid' : 'video__coverList'}>
                <img src={props.cover} alt=""/>
            </div>
            <div className={props.grid ? 'video__infoGrid' : 'video__infoList'}>
                <div className={props.grid ? 'video__titleGrid' : 'video__titleList'}>{props.videoTitle}</div>
                <div className={props.grid ? 'video__channel-titleGrid' : 'video__channel-titleList'}>{props.channelTitle}</div>
            </div>
        </div>
        </>
}