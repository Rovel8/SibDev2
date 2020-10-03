import React from "react";
import './SignUp.css'
import {useDispatch} from "react-redux";
import ReactDOM from 'react-dom'
import {Field, Form, Formik} from "formik";
import {createNewUser} from "../Redux/loginReducer";
import {Button, Input, Typography} from "antd";
import {CloseOutlined} from "@ant-design/icons";

interface IProps {
    setSignUp: (value: boolean) => void
}

export const SignUp: React.FC<IProps> = ({setSignUp}) => {

    const { Text, Link } = Typography;

    const dispatch = useDispatch()

    const initialValues = {
        email: '',
        password: ''
    }

    type initialValuesType = typeof initialValues

    const onSubmit = (values: initialValuesType) => {
        const {email, password} = values
        dispatch(createNewUser(email, password))
    }

    return ReactDOM.createPortal(
        <div className={'signup'}>
            <div className={'signup__container'}>
                <div className={'signup__header'}>
                    <div className={'signup__header-label'}>
                        Регистрация
                    </div>
                    <div className={"signup__header-btn"}>
                        <button onClick={() => setSignUp(false)}><CloseOutlined /></button>
                    </div>
                </div>

                <div className={'signup__form'}>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form>
                            <div className={'signup__form-item'}>
                                <Text type={'secondary'}>
                                    <label className={'form__label'} htmlFor={'email'}>Email</label>
                                </Text>
                                <Field as={LoginInput} id={'email'} name={'email'} placeholder={'email'} />
                            </div>
                            <div className={'signup__form-item'}>
                                <Text type={'secondary'}>
                                    <label className={'form__label'} htmlFor={'password'}>Password</label>
                                </Text>
                                <Field as={PasswordInput} id={'password'} name={'password'} placeholder={'Password'} />
                            </div>
                            <div className={'signup__form-btn'}>
                                <Button htmlType={'submit'}  type="primary" style={{ background: "#76f84f", borderColor: "#76f84f" }}>Создать</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>, document.getElementById('SignUp') as HTMLElement
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