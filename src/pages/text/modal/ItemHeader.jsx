import React from "react";
import { CFormCheck } from '@coreui/react'
import Content from '../../modal/Content'
import Transcription from '../../praxis/Card/CardTranscription'

const ItemHeader = ({value, setValue}) => {
  const {_id, dst} = value || {}
  const onClick = (evt) => {
    evt.stopPropagation()
    setValue(!_id)
  }
  const schema = [
    { component:   <CFormCheck label={dst} defaultChecked={!!_id} onClick={onClick}/> },
    { component: <Transcription value={value}/>}
  ]

  return Content({ schema })
  
}

export default ItemHeader