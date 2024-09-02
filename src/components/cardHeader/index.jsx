import React from "react";
import Title from "./CardTitle"
import Transcription from "./CardTranscription"
import Autocomplete from './Autocomplete'
import style from './style.module.css'

const CardHeader = ({value, setValue}) => {
  
  const {result, _id} = value || {}
  return <div className={style.card__header__left}>
  {setValue ? Autocomplete({value, setValue}) : <Title value={{ result, key: _id }}/>}
  <Transcription value={value}/>
</div>
}

export default CardHeader