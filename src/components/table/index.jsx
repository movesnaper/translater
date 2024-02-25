import React, { useState, useEffect } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
import style from './style.module.css'


const Table = ({ api, height, schema }) => {
  const [mark, setMark] = useState({})
  const { items, setItems, header } = schema || {}

  const handelScroll = ({target}) => {
    const { scrollHeight, scrollTop} = target
    scrollHeight - scrollTop < height + 10   &&  update()
  }

  const update = async () => {
    // if(!mark) return
    try {
      const { values, skip } = await api(mark)
      // const { values, bookmark } = await api.get('', { limit, mark })
      setMark(skip)
      setItems(values)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { api && update() }, [])

  return <div className={style.table__scroll} style={{ height }} onScroll={handelScroll}>
    <CTable hover small style={{ width: '100%'}}>
    <CTableHead style={{ position: "sticky", top: 0 }}>
      <CTableRow>{header.map((item = {}, index) => 
        <CTableHeaderCell style={item.style} key={index}>{
          item.value || item
        }</CTableHeaderCell>)}
      </CTableRow>
    </CTableHead>
    <CTableBody>{ items.map(({onClick, height = '50px', cells = []}, index) => {
      return <CTableRow key={index} style={{ height }} onClick={onClick}>
        { cells.map(({ style, value }, index) => 
        <CTableDataCell style={style} key={index}>{value}</CTableDataCell>)}
    </CTableRow>
    })}
    </CTableBody>
  </CTable>
</div>
}

export default Table