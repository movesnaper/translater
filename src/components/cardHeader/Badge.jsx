import React from "react";
import { CBadge } from '@coreui/react'

const Badge = ({value}) => {
  const {result} = value || {}
  const info = result < 10 && 'info'

  return <CBadge color={info || 'success'} >
  { result } 
</CBadge>
}

export default Badge