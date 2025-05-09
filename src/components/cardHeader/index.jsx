import React, { useEffect } from "react";
import Title from "./CardTitle"
import Transcription from "./CardTranscription"
import style from './style.module.css'

const CardHeader = ({value, sound}) => {

  const play = async (snd) => {
      const audio = new Audio(snd)
      audio.type = 'audio/wav'
      const resp = audio.play()
      if (resp!== undefined) resp.then(() => {}).catch(error => {})
  }
  
  const {result, _id, snd} = value || {}

  useEffect(() => { sound && snd && play(snd) }, [sound, snd])

  return <div className={style.card__header__left}>
  <Title value={{ result, key: _id }}/>
  <Transcription api={play} value={value}/>
</div>
}

export default CardHeader