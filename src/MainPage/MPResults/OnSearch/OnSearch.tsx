import React from "react";
import ReactDOM from 'react-dom'
import './OnSearch.css'
import {Typography} from "antd";

interface IProps {
    setFavorite: (value: boolean) => void
}

export const OnSearch: React.FC<IProps> = (props) => {

    const { Link } = Typography;

    return ReactDOM.createPortal(
        <div onClick={() => props.setFavorite(false)} className={'modal__onSearch'}>
            <div className={'onSearch__content'}>
                <div className={'onSearch__header'}>
                    <span>Поиск сохранен в разделе "Избранное"</span>
                </div>
                <div className={'onSearch__link'}>
                    <Link>
                        <span>Перейти в избранное</span>
                    </Link>
                </div>
            </div>
        </div>, document.getElementById('onSearch') as HTMLElement
        )
}