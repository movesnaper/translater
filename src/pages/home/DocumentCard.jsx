import React, { useEffect } from "react"
import { CCard, CCardBody, CButton, CSpinner } from '@coreui/react'
import { NavLink } from "react-router-dom"
import { db } from '../../db/index.js'

const DocumentCard =  ({doc, loading, onClick}) => {

  const translate = async ({_id, text = ''}) => {
    if(!_id) return
    try {
      // setLoading('translate')
      // const items = await db('/documents').post('/translate', {keys})
      // await db('/documents').post(`/${_id}/items`, {items})
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false)
    }
  }


  useEffect(() => {
    // if(!doc.items) translate(doc)
  }, [doc])

  return <CCard>
  <CCardBody>
    { doc.btn ? <CButton disabled={ loading === doc.btn}
      onClick={onClick}>
    { loading === doc.btn && <CSpinner component="span" size="sm" aria-hidden="true"/> }
    { doc.btn }
    </CButton> :  loading === 'translate' ?
      <CSpinner component="span" size="sm" aria-hidden="true"/> :
        <NavLink component="span" to={`/dictionary/${doc._id}`}> {doc.title} </NavLink>
    }
  </CCardBody>
</CCard>
}

export default DocumentCard