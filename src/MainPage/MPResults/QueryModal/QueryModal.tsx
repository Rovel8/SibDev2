import React, {useState} from "react";
import ReactDOM from 'react-dom'
import './QueryModal.css'
import {Field, Form, Formik} from "formik";
import {Button, Col, Row} from 'antd';
import * as Yup from 'yup';
import {useTypedSelector} from "../../../Redux/reduxStore";
import {Input, Select, Slider, InputNumber} from "formik-antd";
import {setNewUserQuery} from "../../../Redux/loginReducer";
import {useDispatch} from "react-redux";
import {queryActions} from "../../../Redux/queryReducer";
import {editVideoQueryProperties} from "../../../Redux/videosReducer";

interface IProps {
    setFavourite?: (value: boolean) => void
    label?: string
    id?: string
    editMode?: boolean
}

export const QueryModal: React.FC<IProps> = (props) => {

    const {Option} = Select

    const [maxResult, setMaxResult] = useState<number>(1)
    const dbQuery = useTypedSelector(state => state.videos.query)
    const email = useTypedSelector(state => state.login.email)
    const editModeQuery = useTypedSelector(state => state.query.query)
    const editModeName = useTypedSelector(state => state.query.name)
    const editModeSortBy = useTypedSelector(state => state.query.sortBy)
    const editModeMaxResults = useTypedSelector(state => state.query.maxResults)
    const editModeQueryId = useTypedSelector(state => state.query.queryId)
    const editMode = useTypedSelector(state => state.query.editMode)

    const dispatch = useDispatch()

    const initialValues = {
        query: dbQuery,
        name: '',
        sortBy: '' as string | undefined,
        maxResults: 1 as number | undefined
    }

    const editModeInitialValues = {
        query: editModeQuery,
        name: editModeName,
        sortBy: editModeSortBy,
        maxResults: editModeMaxResults
    }



    type ValuesType = typeof initialValues

    const onSubmit = (values: ValuesType) => {
        const {query, name, maxResults, sortBy} = values
        if(props.setFavourite){
            props.setFavourite(false)
        }

        if(editMode){
            dispatch(editVideoQueryProperties(email, name, editModeQueryId, query, sortBy, maxResults))
        }else {
            dispatch(setNewUserQuery(query, name, email, maxResults, sortBy))
        }
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
                        <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={editMode ? editModeInitialValues: initialValues}>
                        <Form>
                        <div className={'query-modal__input-label'}>
                        <label htmlFor="query">Запрос</label>
                        </div>
                        <div className={'query-modal__form-input'}>
                            <Field name={'query'}>
                                {
                                    (props: any) => {
                                        const {field, meta} = props
                                        if(editMode){
                                            return <Input {...field} className={meta.error && meta.touched && 'errorInput'} defaultValue={editModeQuery} id={'query'} />
                                        }else{
                                            return <Input {...field} className={meta.error && meta.touched && 'errorInput'} value={dbQuery} id={'query'} />
                                        }
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
                                        if(editMode){
                                            return <Input {...field} className={meta.error && meta.touched && 'errorInput'} id={'name'} defaultValue={editModeName} />
                                        }else{
                                            return <Input {...field} className={meta.error && meta.touched && 'errorInput'} id={'name'} />
                                        }
                                    }
                                }
                            </Field>
                        </div>
                        <div className={'query-modal__input-label'}>
                        <label htmlFor="sortBy">Сортировать по</label>
                        </div>
                        <div className={'query-modal__form-input'}>
                            <Select name={'sortBy'} id={'sortBy'} defaultValue={editMode ? editModeSortBy : 'rating'} style={{ width: '100%' }}>
                                <Option value="date">Date</Option>
                                <Option value="rating">Rating</Option>
                                <Option value="relevance">Relevance</Option>
                                <Option value='title'>Title</Option>
                                <Option value='videoCount'>Total Videos</Option>
                                <Option value='viewCount'>Total Views</Option>
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
                                        onChange={(value: number) => setMaxResult(value)}
                                        style={{width: '100%'}} defaultValue={editMode ? editModeMaxResults : maxResult}
                                    />
                                </Col>
                                <Col span={4}>
                                    <InputNumber name={'maxResults'} id={'maxResults'}
                                        min={1}
                                        max={50}
                                        style={{ margin: '0 16px' }}
                                        defaultValue={editMode ? editModeMaxResults : maxResult}
                                    />
                                </Col>
                            </Row>
                        </div>
                        </div>
                        <div className={'query-modal__buttons'}>
                        <Button onClick={() => {
                            if(editMode){
                                dispatch(queryActions.setEditingQuery({query: '', name: '', maxResults: 0, sortBy: '', queryId: ''}))
                                dispatch(queryActions.setEditMode(false))
                            }
                            if(props.setFavourite){
                                props.setFavourite(false)
                            }
                        }} type={'default'}>Не сохранять</Button>
                        <Button htmlType={'submit'} type={'primary'}>Сохранить</Button>
                        </div>

                        </Form>
                        </Formik>
                </div>
            </div>
        </div>, document.getElementById('SaveQuery') as HTMLElement
        )
}