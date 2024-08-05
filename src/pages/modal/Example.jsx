import React from "react"
import { CFormTextarea } from '@coreui/react'


const Example = ({ value, setValue }) => {
  const { exm = '' } = value || {}


  return <CFormTextarea rows={8} value={exm} name="exm"
  onInput={({target}) => setValue({...value, exm: target.value})}/>
}

export default Example