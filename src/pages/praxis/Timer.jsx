import React, { useState, useRef } from 'react'
import { CButton } from '@coreui/react'

import style from './Praxis.module.css'

const Timer = ({seconds = 5, next, start}) => {
  const Ref = useRef(this)
  const [timer, setTimer] = useState('0')
  const [active, setActive] = useState(false)

const getTimeRemaining = (e) => {
  const total = Date.parse(e) - Date.parse(new Date())
  const seconds = Math.floor((total / 1000) % 60)
  return { total, seconds }
}

const startTimer = (deadline) => {
  const { total, seconds } = getTimeRemaining(deadline)
  if (total >= 0) setTimer(seconds)
  else next().then(reset)
}

const getDeadLine = () => {
  const deadline = new Date()
  deadline.setSeconds(deadline.getSeconds() + seconds)
  return deadline
}

const resetTimer = () => {
  const deadline = getDeadLine()
  Ref.current = setInterval(() => {
    startTimer(deadline)
  }, 1000)
}

const reset = (active = true) => {
  stop(active)
  setTimer(seconds)
  setActive(active)
  if (active) resetTimer()
}

const stop = () => {
  if (Ref.current) clearInterval(Ref.current)
}

const onStart = () => {
  return start(this)
}


  return (
    <div className={style.timer}>
      {/* <CButton onClick={() => reset(!active)}>{timer}</CButton> */}
      <CButton onClick={onStart}>{timer}</CButton>
    </div>
  )
}

export default Timer