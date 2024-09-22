import React, {useEffect} from "react";
import Title from "./CardTitle"
import Transcription from "./CardTranscription"
import Autocomplete from './Autocomplete'
import style from './style.module.css'

const CardHeader = ({value, setValue, sound}) => {
  
  const play = async (snd) => {
    try {
      const audio = new Audio(snd)
      audio.type = 'audio/wav'
      return audio.play()
    } catch(e) {
      console.error(e);
    }
  }
  
  const {result, _id, snd} = value || {}

  useEffect(() => { sound && snd && play(snd) }, [sound, snd])
  return <div className={style.card__header__left}>
  {setValue ? Autocomplete({value, setValue}) : <Title value={{ result, key: _id }}/>}
  <Transcription api={play} value={value}/>
</div>
}

export default CardHeader