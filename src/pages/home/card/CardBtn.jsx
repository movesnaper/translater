import React, {useState} from 'react'
import { CButton, CSpinner } from '@coreui/react'

const CardBtn = ({ schema }) => {
  const [loading, setLoading ] = useState(false)
  const { title, onClick, color, prepend } = schema({loading, setLoading}) || {}
  return <>
  <CButton color={color} disabled={loading} onClick={onClick}>{ 
    loading ? <CSpinner component="span" size="sm" aria-hidden="true"/>
    : title
  }</CButton>
  {prepend}
  </>
}

export default CardBtn