import React, {useState} from 'react';
import './Login.css'
import {Field, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {logInUser} from "../Redux/loginReducer";
import {useTypedSelector} from "../Redux/reduxStore";
import { Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import {SignUp} from "../SignUp/SignUp";
import {initializationActions} from "../Redux/initializationReducer";
import {Input, Space, Typography } from 'antd';
import Button from "antd/lib/button";
import SibDevLogo from '../assets/sibdev-logo.png'



export const Login: React.FC<{}> = (props) => {

    const { Text, Link } = Typography;

    const isAuth = useTypedSelector(state => state.login.initialized)
    const isFetching = useTypedSelector(state => state.initialization.isFetching)

    const dispatch = useDispatch()

    const [signUp, setSignUp] = useState<boolean>(false)

    const initialValues = {
        email: '',
        password: ''
    }

    type initialValuesType = typeof initialValues

    const onSubmit = (values: initialValuesType) => {
        const {email, password} = values
        dispatch(logInUser(email, password))
        dispatch(initializationActions.setIsFetching(true))
    }

    if(isAuth) return <Redirect to={'/MainPage'} />

    return (
        <div className={'login'}>
            <CSSTransition unmountOnExit={true} in={signUp} classNames={{
                enter: 'signUp-enter',
                enterActive: 'signUp-enter-active',
                exit: 'signUp-exit',
                exitActive: 'signUp-exit-active'
            }} timeout={400}>
                <SignUp setSignUp={setSignUp} />
            </CSSTransition>
            <div className={'login__container'}>
                <div className={'login__form'}>
                    <div className={'login__form-logo'}>
                        <img src={SibDevLogo} alt="SibDevLogo"/>
                    </div>
                    <div className={'login__form-label'}>
                        Вход
                    </div>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form>
                            <div className={'login__form-item'}>
                                    <Text type={'secondary'}>
                                        <label className={'form__label'} htmlFor={'email'}>Email</label>
                                    </Text>
                                <Field as={LoginInput} id={'email'} name={'email'}/>
                            </div>
                            <div className={'login__form-item'}>
                                <Text type={'secondary'}>
                                    <label className={'form__label'} htmlFor={'password'}>Password</label>
                                </Text>
                                <Field as={PasswordInput} id={'password'} name={'password'}/>
                            </div>
                            <div className={'login__form-button'}>
                            <Button htmlType="submit" type={'primary'} disabled={isFetching}>Войти</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
                    <div className={'login__createUser'}>
                        <Button type={'primary'} style={{ background: "#76f84f", borderColor: "#76f84f" }}
                                onClick={() => setSignUp(true)}>Создать аккаунт</Button>
                    </div>
            </div>
        </div>
    );
}

const PasswordInput: React.FC<{}> = (props) => {
    return <>
        <Input.Password {...props} />
        </>
}

const LoginInput: React.FC<{}> = (props) => {
    return <>
        <Input {...props} />
    </>
}