import React from "react";
import Tabs from '../../../components/tabs/index.jsx'
import style from './style.module.css'

const CardHistory = ({schema}) => {
  return <div className={style.card__history}>
    <Tabs  schema={schema}/>
  </div>
}
export default CardHistory