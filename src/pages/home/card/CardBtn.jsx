import React from 'react'
import { CButton, CSpinner } from '@coreui/react'

const CardBtn = ({ schema, loading }) => {
  const { title, onClick } = schema || {}
  return <CButton disabled={loading} onClick={onClick}>{ 
    loading ? <CSpinner component="span" size="sm" aria-hidden="true"/>
    : title
  }</CButton>
}

export default CardBtn