import React, { useState, useEffect } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
import style from './style.module.css'


const DictionaryTable = ({ api, url, limit, height, schema, rowClick }) => {
  const [data, setData] = useState({ skip: 0, loading: false })
  const [values, setValues] = useState([])
  const { loading, skip } = data || {}

  const handelScroll = ({target}) => {
    target.scrollHeight - target.scrollTop <= height + 1  && update(data)
  }

  const updateValues = (index) => (value) => {
    value ? values.splice(index, 1, value) : values.splice(index, 1)
    setValues([...values])
  }

  const update = async (data) => {
    if (loading) return
    try {
      setData({...data, loading: true})
      const { values: docs, offset } = await api.get(url, { limit, skip })
      setData({...data, skip: offset + limit, loading: false})
      setValues([...values, ...docs])
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { url && update(data) }, [url])

  const {items, row, header } = schema(values)

  return <div className={style.dictionary__table} style={{ height }} onScroll={handelScroll}>
  <CTable hover small style={{ width: '100%'}}>
  <CTableHead style={{ position: "sticky", top: 0 }}>
    <CTableRow> { header.map(({title}, key) => 
      <CTableHeaderCell key={key}>{title}</CTableHeaderCell>)}
    </CTableRow>
  </CTableHead>
  <CTableBody>{ items.map((value, index) => {
    // const update = updateValues(index)
    return <CTableRow key={index} 
      onClick={() => row.onClick(value, index)}>
      { header.map(({getValue}, key) => 
      <CTableDataCell key={key}>{ getValue(value, index) }</CTableDataCell>)}
  </CTableRow>
  })}
  </CTableBody>
</CTable>
</div>  
}

export default DictionaryTable