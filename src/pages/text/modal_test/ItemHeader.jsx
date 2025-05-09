import React from 'react'
import { CFormCheck } from '@coreui/react'
import Content from '../../modal/Content'
import Transcription from '../../../components/cardHeader/CardTranscription'

const ItemHeader = ({value, setValue}) => {
  const { uid, active, dst} = value || {}
  const defaultChecked = active === undefined ? !!uid : active

  const onClick = (evt) => {
    evt.stopPropagation()
    setValue(!defaultChecked)
  }
  
  const schema = [
    { component:   <CFormCheck label={dst} defaultChecked={defaultChecked} onClick={onClick}/> },
    { component: <Transcription value={value}/>}
  ]

  return Content({ schema })
  
}

export default ItemHeader