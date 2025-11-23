import React, { useEffect } from "react";
import Title from "./CardTitle"
import Transcription from "./CardTranscription"
import style from './style.module.css'
import PlaySound from './PlaySound'

const CardHeader = ({value, sound}) => {


  
  const {result, _id, snd} = value || {}

  useEffect(() => { sound && PlaySound(value) }, [sound, snd])

  return <div className={style.card__header__left}>
  <Title value={{ result, key: _id }}/>
  <Transcription value={value}/>
</div>
}

export default CardHeader