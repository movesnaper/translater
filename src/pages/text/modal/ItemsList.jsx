import React from "react";
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/react'
import ItemBody from './ItemBody'
import ItemHeader from './ItemHeader'
import style from './style.module.css'

const ItemsList = (value, setModal) => {
  const { key, value: values} = value || {}

  const setValue = (index) => (v) => {
    values.splice(index, 1, v)
    setModal({...value, value: values})
  }
  return values && <CAccordion flush className={style.items__list}>{
    
   values.map((value, index) => {
      return <CAccordionItem  key={index}>
        <CAccordionHeader>
          <ItemHeader value={value} setValue={(active) => {
            console.log(key);
            setValue(index)({...value, _id: active ? key : active })
          }}/>
        </CAccordionHeader>
        <CAccordionBody>
          <ItemBody value={value} setValue={setValue(index)}/>
        </CAccordionBody>
      </CAccordionItem >
    })
  }</CAccordion>
}

export default ItemsList