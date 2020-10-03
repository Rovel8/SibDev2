import React, {useEffect} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {Login} from "./Login/Login";
import {MainPage} from "./MainPage/MainPage";
import {useTypedSelector} from "./Redux/reduxStore";
import {Space} from "antd";
import Spin from "antd/lib/spin";
import {authStatusObserver} from "./Redux/loginReducer";
import {useDispatch} from "react-redux";

export function App() {



    return (
        <div className="App">
            <Switch>
                <Route path={'/login'} render={() => <Login />} />
                <Route path={'/MainPage'} render={() => <MainPage />} />
                <Route exact path={'/'} render={() => <MainPage />} />
            </Switch>
        </div>
    );
}

export const WholeApp: React.FC<{}> = (props) => {

    const isInitialized = useTypedSelector(state => state.initialization.isInitialized)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authStatusObserver())
    }, [])

    return(
        <div>
            {isInitialized ? <App /> :  <Space size="middle">
                <Spin size="large" />
            </Space>}
        </div>
    )
}