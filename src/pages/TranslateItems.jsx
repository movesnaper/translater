import React, {useState, useEffect} from "react";
import { CRow, CCol, CListGroup, CListGroupItem } from '@coreui/react'
import style from './style.module.css'

const TranslateItems = ({ api, url, schema }) => {
  const [items, setItems] = useState([])
  const update = async () => {
    setItems(await api.get(url))
  }
  useEffect(() => { update() }, [url])

  return <>
 <CListGroup className={style.ListGroupe}>
  { items && items.map((value, index) => {
    return <CListGroupItem key={index} className={style.CListGroupItem}>
      <CRow>
        { schema.map((item, index) => 
        <CCol key={index}> { item(value) } </CCol>)}
      </CRow>
    </CListGroupItem>
  })}

</CListGroup> 
  </>
}

export default TranslateItems