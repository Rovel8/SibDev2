import React from "react";
import './FavoritesItem.css'
import {IQueryList} from "../../Redux/loginReducer";
import {Typography} from "antd";
import {useTypedSelector} from "../../Redux/reduxStore";
import {db} from "../../Firebase/firebase";

interface IProps{
    id: string
    setFavourite: (value: boolean) => void
}

export const FavoritesItem: React.FC<IQueryList & IProps> = (props) => {

    const {Link} = Typography
    const email = useTypedSelector(state => state.login.email)


    return (<>
            <div className={'favItem'}>
                <div className={'favItem__name'}>
                    {props.name}
                </div>
                <div className={'favItem__actions'}>
                    <Link onClick={() => {
                        console.log('hello')
                        props.setFavourite(true)
                    }}>Изменить</Link>
                    <Link onClick={() => db.collection(`${email}`).doc(props.id).delete()} style={{color: 'red'}}>Удалить</Link>
                </div>
            </div>
        </>
    )
}