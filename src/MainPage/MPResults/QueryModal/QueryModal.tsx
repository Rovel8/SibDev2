import React, {useState} from "react";
import ReactDOM from 'react-dom'
import './QueryModal.css'
import {Field, Form, Formik} from "formik";
import {Button, Col, Input, Row} from 'antd';
import * as Yup from 'yup';
import {useTypedSelector} from "../../../Redux/reduxStore";
import {Select, Slider, InputNumber} from "formik-antd";
import {setNewUserQuery} from "../../../Redux/loginReducer";
import {useDispatch} from "react-redux";

interface IProps {
    setFavorite: (value: boolean) => void
    label?: string
    query?: string
    name?: string
    maxResults?: number
    sortBy?: string
    id?: string
}

export const QueryModal: React.FC<IProps> = (props) => {

    const [maxResult, setMaxResult] = useState<number>(1)
    const query = useTypedSelector(state => state.videos.query)
    const email = useTypedSelector(state => state.login.email)
    const dispatch = useDispatch()

    const initialValues = {
        query: query,
        name: '',
        sortBy: '',
        maxResults: maxResult as number
    }

    type ValuesType = typeof initialValues

    const onSubmit = (values: ValuesType) => {
        const {query, name, maxResults, sortBy} = values
        props.setFavorite(false)
        dispatch(setNewUserQuery(query, name, email, maxResults, sortBy))
    }

    const validationSchema = Yup.object({
        query: Yup.string().required(' '),
        name: Yup.string().required(' ')
    })

    return ReactDOM.createPortal(
        <div className={'query-modal'}>
            <div className={'query-modal__content'}>
                <div className={'query-modal__container'}>
                    <div className={'query-modal__header'}>
                        {props.label ? props.label : 'Сохранить запрос'}
                    </div>
                        <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues}>
                        <Form>
                        <div className={'query-modal__input-label'}>
                        <label htmlFor="query">Запрос</label>
                        </div>
                        <div className={'query-modal__form-input'}>
                            <Field name={'query'}>
                                {
                                    (props: any) => {
                                        const {field, meta} = props
                                        return <Input {...field} value={query} className={meta.error && meta.touched ? 'query__error' : 'query__done'} id={'query'} />
                                    }
                                }
                            </Field>
                        </div>
                        <div className={'query-modal__input-label'}>
                        <label htmlFor="name">Название</label>
                        </div>
                        <div className={'query-modal__form-input'}>
                            <Field name={'name'}>
                                {
                                    (props: any) => {
                                        const {field, meta} = props
                                        return <Input className={meta.error && meta.touched ? 'query__error' : 'query__done'} {...field} id={'name'} />
                                    }
                                }
                            </Field>
                        </div>
                        <div className={'query-modal__input-label'}>
                        <label htmlFor="sortBy">Сортировать по</label>
                        </div>
                        <div className={'query-modal__form-input'}>
                            <Select name={'sortBy'} id={'sortBy'} defaultValue="rating" style={{ width: '100%' }}>
                                <option value="date">Date</option>
                                <option value="rating">Rating</option>
                                <option value="relevance">Relevance</option>
                                <option value='title'>Title</option>
                                <option value='videoCount'>Total Videos</option>
                                <option value='viewCount'>Total Views</option>
                            </Select>
                        </div>
                        <div className={'query-modal__form-input'}>
                        <div className={'query-modal__input-label'}>
                        <label htmlFor="maxResults">Максимальное количество</label>
                        </div>
                        <div className={'query-modal__form-slider'}>
                            <Row style={{width: '100%'}}>
                                <Col span={12}>
                                    <Slider
                                        id={'maxResults'} name={'maxResults'} tooltipVisible={false} max={50}
                                        onChange={(value: number) => setMaxResult(value)} style={{width: '100%'}} defaultValue={1}
                                    />
                                </Col>
                                <Col span={4}>
                                    <InputNumber name={'maxResults'} id={'maxResults'}
                                        min={1}
                                        max={50}
                                        style={{ margin: '0 16px' }}
                                        value={maxResult}
                                    />
                                </Col>
                            </Row>
                        </div>
                        </div>
                        <div className={'query-modal__buttons'}>
                        <Button onClick={() => {props.setFavorite(false)}} type={'default'}>Не сохранять</Button>
                        <Button htmlType={'submit'} type={'primary'}>Сохранить</Button>
                        </div>

                        </Form>
                        </Formik>
                </div>
            </div>
        </div>, document.getElementById('SaveQuery') as HTMLElement
        )
}