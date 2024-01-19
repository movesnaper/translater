import React from "react";
import TranslateInputs from '../TranslateInputs'
import TranslateItems from '../TranslateItems'

const Translate = ({value}) => {
  const setResult = (value) => {
    console.log(value);
  }
  return <>
      <TranslateInputs value={value} onSave={setResult}/>
      <TranslateItems value={value} onSelect={setResult}/>

  </>
}

export default Translate