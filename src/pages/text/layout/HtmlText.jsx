import React from "react";
import DropDownBtn from '../../../components/dropDownBtn'
import style from './style.module.css'


const TextFooter = ({ schema }) => {
  const { content, footer } = schema

  return <>
    <div className={style.text__html__body}>{content}</div>
    <DropDownBtn schema={footer}/>
  </>

}

export default TextFooter