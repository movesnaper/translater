import React, { useState, useEffect } from "react";
import style from './style.module.css'
import { CButton } from '@coreui/react'
import { cilAvTimer } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Timer  from "../../Timer"

const CardTimer = ({ disabled, reset, next }) => {
 
  const [timer, setTimer] = useState()
  const { active } = timer || {}

  useEffect(() => { 
    timer && timer.reset(active && !disabled) 
  }, [active, reset, disabled])


  const toggleTimer = ({ stop, reset }) => {
    setTimer({ stop, reset, active: !active})
  }
 
  return <div className={style.card__timer}>
    <Timer seconds={5}> 
      {(timer) => {
        if (timer.value === 0) timer.stop().then(next)
        return <CButton className={style.timer_btn}
        disabled={!!disabled} onClick={() => toggleTimer(timer)}>
          {timer.value || <CIcon icon={cilAvTimer} size="xl"/>}
        </CButton>
      }} 
      </Timer>
  </div>
}

export default CardTimer