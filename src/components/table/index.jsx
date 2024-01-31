import React, { useState, useEffect } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
import style from './style.module.css'


const Table = ({ api, limit, height, schema, setItems }) => {
  const [mark, setMark] = useState({})
  const { items, header, onClick } = schema || {}

  const handelScroll = ({target}) => {
    const { scrollHeight, scrollTop} = target
    scrollHeight - scrollTop <= height - 21  && update()
  }

  const update = async () => {
    try {
      const { values } = await api.get('', { limit, mark })
      const [{key} = {}] = values.splice(limit - 1, 1)
      setMark(key || {})
      setItems(values)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { api && update() }, [])

  return <div className={style.table__scroll} style={{ height }} onScroll={handelScroll}>
    <CTable hover small style={{ width: '100%'}}>
    <CTableHead style={{ position: "sticky", top: 0 }}>
      <CTableRow>{header.map(({title, style }, key) => 
        <CTableHeaderCell style={style} key={key}>{title}</CTableHeaderCell>)}
      </CTableRow>
    </CTableHead>
    <CTableBody>{ items.map((item, index) => {
      return <CTableRow key={index} style={{ height: '50px'}}
        onClick={() => onClick && onClick(item)}>
        { header.map(({getValue}, key) => 
        <CTableDataCell key={key}>{getValue(item)}</CTableDataCell>)}
    </CTableRow>
    })}
    </CTableBody>
  </CTable>
</div>
}

export default Table