import React, { useState } from "react"
import CIcon from '@coreui/icons-react'
import { CSpinner, CButton  } from '@coreui/react'
import { cilVolumeHigh } from '@coreui/icons'

import style from './style.module.css'

  const CardTranscription = ({ api, value }) => {
    const [loading, setLoading] = useState(false)
    const { trc, snd } = value || {}

    const play = async (evt) => {
      evt.stopPropagation()
      try {
        setLoading(true)
        snd && await api(snd)
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false)
      }
    }

  return trc && <div>

    <CButton className={style.card__transcription_btn}
    variant="ghost" onClick={play}>
      <span className={ style.card__transcription }> { `[ ${trc} ]` } </span>
      { loading ? <CSpinner color="primary" as="span" size="sm" aria-hidden="true"/>
      : snd && <CIcon className="text-primary" icon={cilVolumeHigh} />}
      
    </CButton>  
  </div>


  
}


export default CardTranscription