import React from "react";
import StatisticProgress from "./StatisticProgress"
import DocTitle from '../../docTitle'
// import { useNavigate, useLocation } from "react-router-dom"


import style from './style.module.css'


const PageHeader = ({schema}) => {

    const {keys, color, total, menu} = schema || {}
    const value = + total > 25 ? +total : 25
    return [
        <div key='header__keys' className={style.page__header__keys}>{`keys: ${keys}`}</div>,
        <div key='header__range' className={style.page__header__range}>
            <StatisticProgress schema={[{ color, value, label: `${total} %`}]}/>
        </div>,
        <div key='header__settings'>{DocTitle({menu})}</div>
        
      ]
}

export default PageHeader