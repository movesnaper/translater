import React from "react";
import StatisticProgress from "./StatisticProgress"
import DocTitle from '../../docTitle'
import { CIcon } from '@coreui/icons-react'
import { cilSettings } from '@coreui/icons'
// import { useNavigate, useLocation } from "react-router-dom"


import style from './style.module.css'


const PageHeader = ({schema, settings}) => {

    const {keys, color, total} = schema || {}
    const value = + total > 25 ? +total : 25
    return [
        <div key='header__keys' className={style.page__header__keys}>{`keys: ${keys}`}</div>,
        <div key='header__range' className={style.page__header__range}>
            <StatisticProgress schema={[{ color, value, label: `${total} %`}]}/>
        </div>,
        <div key='header__settings' className={style.page__header__settings}>{
            settings && <DocTitle title={<CIcon icon={cilSettings} size="sm"/>} menu={settings}/>
        }</div>
      ]
}

export default PageHeader