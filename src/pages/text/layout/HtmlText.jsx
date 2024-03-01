import React, { useState } from "react";
import DropDownBtn from '../../../components/dropDownBtn'
import Modal from '../../dictionary/table/TableModal'
import style from './style.module.css'
import TooltipSpan from './TooltipSpan'


const TextFooter = ({ schema }) => {
  const [modal, setModal] = useState(null)
  const [mark, setMark] = useState(null)

  const { values, footer, modalSchema } = schema({ modal, setModal })

  const edit = (item, index) => {
    values.splice(index, 1, {...item, loading: true})
    setMark(index)
    setModal(item)
  }


  return <>
    <div className={style.text__html__body}>{
      values.map((item, index) => {
        return <TooltipSpan key={index} item={{...item, mark: mark === index}} 
        onClick={() => edit(item, index)}/>
      })
    }</div>
    <DropDownBtn schema={footer}/>
    <Modal modal={modal} setModal={setModal} 
      footer={<DropDownBtn schema={modalSchema}/>}/>   
  </>

}

export default TextFooter