import React, { useState } from "react"
import CIcon from '@coreui/icons-react'
import { CSpinner } from '@coreui/react'
import { cilVolumeHigh } from '@coreui/icons'
import PlaySound from './PlaySound'
import style from './style.module.css'

  const CardTranscription = ({ value }) => {
    const [loading, setLoading] = useState(false)
    const { trc } = value || {}

    

    const play = async (evt) => {
      evt.stopPropagation()
      try {
        setLoading(true)
          await PlaySound(value)
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false)
      }
    }

  return <div className={ style.card__transcription } onClick={play}>
      <div className={ style.card__transcription__title }> { `[ ${trc} ]` } </div>
      { loading ? <CSpinner color="primary" as="span" size="sm" aria-hidden="true"/>
      : <div>
        <CIcon className="text-primary" icon={cilVolumeHigh} />
      </div>}
    </div>  
  
}

export default CardTranscription