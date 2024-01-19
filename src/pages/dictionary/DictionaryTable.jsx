import React, { useState, useEffect } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
// import style from './Dictionary.module.css'
import Modal from './modal/Modal.jsx'


const DictionaryTable = ({ schema, params, modal: getModal }) => {
  const [data, setData] = useState({ skip: 0, loading: false, modal: false })
  const [values, setValues] = useState([])
  const { api, url, limit, height } = params || {}
  const { loading, modal, skip } = data || {}
  const { title, body, footer } = getModal(modal)


  const handelScroll = ({target}) => {
    target.scrollHeight - target.scrollTop <= height + 1  && update(data)
  }

  const updateValues = (index) => (value) => {
    value ? values.splice(index, 1, value) : values.splice(index, 1)
    setValues([...values])
  }

  const setModal = (value, index) => {
    if (index !== undefined) return updateValues(index)(value)
    const modal = !!value && {...value, update: setModal}
    setData({...data, modal })
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

  useEffect(() => { params.url && update(data) }, [params.url])

  return <>
 <Modal modal={modal} title={title} footer={footer}> { body } </Modal>
<div style={{ height, overflow: "auto", width: '100%' }} onScroll={handelScroll}>
  <CTable hover small style={{ width: '100%'}}>
  <CTableHead style={{ position: "sticky", top: 0 }}>
    <CTableRow> { schema(values).map(({title}, index) => 
      <CTableHeaderCell key={index}>{title}</CTableHeaderCell>)}
    </CTableRow>
  </CTableHead>
  <CTableBody>{ values.map((value, index) => {
    return <CTableRow key={index} onClick={() => setModal({...value, index })}>
      { schema(updateValues(index)).map(({ getValue }, i) => 
      <CTableDataCell key={i}>{ getValue({...value, index }) }</CTableDataCell>)}
  </CTableRow>
  })}
  </CTableBody>
</CTable>
</div>  
  </>
}

export default DictionaryTable