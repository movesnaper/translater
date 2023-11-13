import React, { useState, useEffect } from "react";
import { CButton } from '@coreui/react'

const PraxisCardFooter = ({ history, next, addResult }) => {
  // const [index, setIndex] = useState(0)

  const update = (index) => {
    if(index <= 5) setIndex(index)
    next(history[index])
  }

  useEffect(() => { setIndex(history.length) }, [history])

  return <>
  <CButton  
  disabled={!index || !history.length} 
  onClick={() => update(index - 1)}
  >Prev</CButton>
  <CButton  onClick={() => addResult(-1).then(() => update(index + 1))}>Next</CButton>
  </>
}

export default PraxisCardFooter