import React from "react";
import { CFormTextarea } from '@coreui/react'

const Translate = ({value, setValue}) => {
  return <CFormTextarea rows={3} value={value?.trc} name="trc"
  onInput={({target}) => setValue({...value, trc: target.value})}/>
}

export default Translate