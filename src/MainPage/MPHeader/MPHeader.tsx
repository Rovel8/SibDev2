import React from "react";
import SibDevLogo from "../../assets/sibdev-logo.png";
import {Menu} from "antd";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../Redux/loginReducer";
import {Link, Redirect} from "react-router-dom";
import {useTypedSelector} from "../../Redux/reduxStore";
import {videosActions} from "../../Redux/videosReducer";

export const MPHeader: React.FC<{}> = () => {

    const bookmark = useTypedSelector(state => state.videos.currentBookmark)
    const dispatch = useDispatch()


    const logout = () => {
        dispatch(logoutUser())
    }

    const linkToFavorite = () => {
        return <Redirect to={'/MainPage/favorites'} />
    }



    return <>
        <div className={'main-page__header'}>
            <div className={'main-page__header-left'}>
                <div className={'main-page__header-logo'}>
                    <img src={SibDevLogo} alt="SibDevLogo"/>
                </div>
                <Menu onClick={(e) => dispatch(videosActions.setCurrentBookmark(String(e.key)))} selectedKeys={[bookmark]} mode="horizontal">

                    <Menu.Item className={'menu__search'} key="search">
                        Поиск
                        <Link to={'/MainPage'} />
                    </Menu.Item>
                    <Menu.Item onClick={() => linkToFavorite()} className={'menu__favorite'} key="favorite">
                        Избранное
                        <Link to={'/MainPage/favorites'} />
                    </Menu.Item>

                </Menu>
            </div>
            <div className={'main-page__header-right'}>
                <a onClick={() => logout()}>Выйти</a>
            </div>
        </div>
    </>
}