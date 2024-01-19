import React from "react"
import DropDownBtn from '../../DropDownBtn'
import style from './style.module.css'


const CardFooter  = ({ schema }) => {

  return <div className={style.card__footer}>
    <DropDownBtn schema={schema}/>

  </div>
  

}

export default CardFooter
