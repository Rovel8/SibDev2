import React, {useState} from "react";
import SibDevLogo from "../../assets/sibdev-logo.png";
import {Menu, Typography} from "antd";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../Redux/loginReducer";
import {Link, Redirect} from "react-router-dom";

export const MPHeader: React.FC<{}> = (props) => {


    const [current, setCurrent] = useState('search')
    const [favorites, setFavorites] = useState<boolean>(false)
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
                <Menu onClick={(e) => setCurrent(String(e.key))} selectedKeys={[current]} mode="horizontal">

                    <Menu.Item onClick={() => setFavorites(false)} className={'menu__search'} key="search">
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