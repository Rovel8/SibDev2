import React from "react";
import './MainPage.css'
import {useTypedSelector} from "../Redux/reduxStore";
import {Redirect, Route, Switch} from "react-router-dom";
import {MPSearch} from "./MPSearch/MPSearch";
import {MPHeader} from "./MPHeader/MPHeader";
import {MPResults} from "./MPResults/MPResults";
import {Favorites} from "../Favorites/Favorites";

export const MainPage = () => {

    const isAuth = useTypedSelector(state => state.login.initialized)

    if (!isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={'main-page'}>
            <div className={'main-page__container'}>
               <MPHeader />
                <div>
                    <Switch>
                        <Route exact path={'/MainPage'} render={() => <MPSearch />}/>
                        <Route path={'/MainPage/results'} render={() => <MPResults />} />
                        <Route path={'/MainPage/favorites'} render={() => <Favorites />} />
                        <Route exact path={'/'} render={() => <MPSearch />} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}