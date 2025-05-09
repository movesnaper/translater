import React from "react";
import { CFormTextarea } from '@coreui/react'

const Translate = ({value, setValue}) => {
  return <CFormTextarea rows={3} value={value?.dst} name="dst"
  onInput={({target}) => setValue({...value, dst: target.value})}/>
}

export default Translate