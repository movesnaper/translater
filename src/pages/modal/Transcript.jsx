import React from "react";
import { CRow, CFormLabel, CFormInput, CCol } from '@coreui/react'

const Transcript = ({value, setValue}) => {
  return <div className='tab-body'>
    <CRow className="tab-body-item mb-2">
      <CFormLabel className="col-sm-2 col-form-label" htmlFor="trcInput">Trc</CFormLabel>
      <CCol sm={10}>
      <CFormInput id="trcInput" value={value?.trc} name="trc"
      onInput={({target}) => setValue({...value, trc: target.value})}/>
      </CCol>
    </CRow>
    <CRow className="tab-body-item mb-2">
     <CFormLabel className="col-sm-2 col-form-label" htmlFor="sndInput">Snd</CFormLabel>
     <CCol sm={10}>
      <CFormInput id="sndInput" className='tab-body-item' value={value?.snd} name="snd"
      onInput={({target}) => setValue({...value, snd: target.value})}/>
      </CCol>
    </CRow>
  
  </div>
}

export default Transcript