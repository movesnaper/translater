import React, { useState } from "react"
import CIcon from '@coreui/icons-react'
import { CButton, CSpinner  } from '@coreui/react'
import { cilVolumeHigh } from '@coreui/icons'

import style from './style.module.css'

  const CardTranscription = ({ value }) => {
    const [loading, setLoading] = useState(false)
    const { trc, snd } = value || {}

    const play = () => {
      try {
        setLoading(true)
        const audio = new Audio(snd)
        audio.type = 'audio/wav'
        audio.play()
      } catch(e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    }

  return trc && <div>
    <span className={ style.card__transcription }> { `[ ${trc} ]` } </span>
    { snd && <CButton className={style.card__transcription_btn}
    variant="ghost" onClick={play}>
        {loading ? <CSpinner/> : <CIcon icon={cilVolumeHigh} />}
    </CButton>  }
  </div>


  
}


export default CardTranscription