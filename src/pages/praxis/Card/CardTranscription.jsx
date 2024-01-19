import React from "react";
import CIcon from '@coreui/icons-react'
import { CButton } from '@coreui/react'
import { cilVolumeHigh } from '@coreui/icons'
import style from './style.module.css'

  const CardTranscription = ({ card }) => {
    const { trc, snd } = card?.value || {}

  const getSnd = () => {
    console.log(snd);
  }

  return trc && <h4 className={ style.card__transcription }> { `[${trc}]` }
    { snd && <CButton className={style.transcriptionr_btn}
    variant="ghost"
     onClick={getSnd}>
        <CIcon icon={cilVolumeHigh} size="xl"/>
    </CButton>  }
    </h4>

  
}


export default CardTranscription