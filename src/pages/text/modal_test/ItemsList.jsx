import React, { useState, useEffect } from "react";
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/react'
import { useDebouncedCallback  } from 'use-debounce';
import ItemBody from './ItemBody'
import ItemHeader from './ItemHeader'
import style from './style.module.css'
import { db } from '../../../db'
const api = db(`/documents/translate/lingvo/`)

const ItemsList = (value, setModal) => {
  const { _id: key, dst, value: values } = value || {}
  const [loading, setLoading] = useState(false)


  const update = async() => {
    if(loading) return
    try {
      setLoading(true)
      const items = await api.get(`id/${key}`)
      setModal({...value, value: items.length ? items : [{key, dst}]})
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }
  const debounced = useDebouncedCallback(update, 1000, { maxWait: 3000 } )

  useEffect(() => {
    if (key) debounced()
   }, [key, dst])

  const setValue = (index) => (v) => {
    values.splice(index, 1, v)
    setModal({...value, value: values})
  }
  return <CAccordion flush className={style.items__list}>{
    
    values && values.map((value, index) => {
      return <CAccordionItem  key={index}>
        <CAccordionHeader>
          <ItemHeader  value={value} setValue={(active) => {
            setValue(index)({...value, active })
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