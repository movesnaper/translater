import React, { useState } from "react"
import CIcon from '@coreui/icons-react'
import { CSpinner, CButton  } from '@coreui/react'
import { cilVolumeHigh } from '@coreui/icons'

import style from './style.module.css'

  const CardTranscription = ({ value }) => {
    const [loading, setLoading] = useState(false)
    const { trc, snd } = value || {}

    const play = async (evt) => {
      evt.stopPropagation()
      try {
        setLoading(true)
        const audio = new Audio(snd)
        audio.type = 'audio/wav'
        await audio.play()
      } catch(e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    }

  return trc && <div>
    {/* <span className={ style.card__transcription }> { `[ ${trc} ]` } </span>
    { snd && loading ? <CSpinner/> : <CIcon className={style.card__transcription_btn}
    variant="ghost" icon={cilVolumeHigh} onClick={play}/>  } */}
    <CButton className={style.card__transcription_btn}
    variant="ghost" onClick={play}>
      <span className={ style.card__transcription }> { `[ ${trc} ]` } </span>
      { loading ? <CSpinner color="primary" as="span" size="sm" aria-hidden="true"/>
      : <CIcon className="text-primary" icon={cilVolumeHigh} />}
      
    </CButton>  
  </div>


  
}


export default CardTranscription