import React from "react"
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import { cilVolumeHigh } from '@coreui/icons'

import style from './style.module.css'

  const CardTranscription = ({ value }) => {
    const { trc, snd } = value || {}

    const play = () => {
      try {
        const audio = new Audio(snd)
        audio.type = 'audio/wav'
        audio.play()
      } catch(e) {}
    }

  return trc && <h5 className={ style.card__transcription }> { `[${trc}]` }
    { snd && <CButton className={style.transcriptionr_btn}
    variant="ghost" onClick={play}>
        <CIcon icon={cilVolumeHigh} />
    </CButton>  }
    </h5>

  
}


export default CardTranscription