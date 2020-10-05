import React, {useEffect, useState} from "react";
import './Favorites.css'
import {db} from "../Firebase/firebase";
import {useTypedSelector} from "../Redux/reduxStore";
import {nanoid} from "nanoid";
import {FavoritesItem} from "./FavoritesItem/FavoritesItem";
import CSSTransition from "react-transition-group/CSSTransition";
import {QueryModal} from "../MainPage/MPResults/QueryModal/QueryModal";

export const Favorites: React.FC<{}> = () => {

    const [fav, setFav] = useState<any>([])

    const email = useTypedSelector(state => state.login.email)
    const editMode = useTypedSelector(state => state.query.editMode)

    useEffect(() => {
        db.collection(`${email}`).get().then(result =>
        setFav(result.docs.map((doc) => ({id: doc.id, data: doc.data()}))))
    })

    return (<>
        <div className={'favorites'}>
            <CSSTransition in={editMode} unmountOnExit={true} timeout={150} classNames={{
                enter: 'favourites__favorite-enter',
                enterActive: 'favourites__favorite-enterActive',
                exit: 'favourites__favorite-exit',
                exitActive: 'favourites__favorite-exitActive'
            }}>
                <QueryModal label={'Изменить запрос'} />
            </CSSTransition>
            <div className={'favItem__header'}>
                <h2>Избранное</h2>
            </div>
            {fav.map((item: any) => {
                let id = nanoid()
                return <FavoritesItem
                    key={id}
                    query={item.data.query}
                    name={item.data.name}
                    maxResults={item.data.maxResults}
                    sortBy={item.data.sortBy}
                    id={item.id}
                />
            })}
        </div>
        </>
    )
}