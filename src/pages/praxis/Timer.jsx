import React, { useState, useRef, useEffect } from 'react'
import { cilAvTimer } from '@coreui/icons'

import CIcon from '@coreui/icons-react'

import style from './Praxis.module.css'

const Timer = ({seconds = 5, next, active}) => {
  const Ref = useRef(null)
  
  const [timer, setTimer] = useState('0')
  

  useEffect(() => {
    console.log(active);
    if (active) reset()
    else stop()
  }, [active])

const getTimeRemaining = (e) => {
  const total = Date.parse(e) - Date.parse(new Date())
  const seconds = Math.floor((total / 1000) % 60)
  return { total, seconds }
}

const startTimer = (deadline) => {
  const { total, seconds } = getTimeRemaining(deadline)
  if (total >= 0) setTimer(seconds)
  else next()
}

const getDeadLine = () => {
  const deadline = new Date()
  deadline.setSeconds(deadline.getSeconds() + seconds)
  return deadline
}

const resetTimer = () => {
  setTimer(seconds)
  const deadline = getDeadLine()
  Ref.current = setInterval(() => {
    startTimer(deadline)
  }, 1000)
}

const reset = () => {
  stop()
  resetTimer()
}

const stop = () => {
  setTimer('timer')
  if (Ref.current) clearInterval(Ref.current)
}

  return (
    <div className={style.timer}>
      { timer === 'timer' ? <CIcon icon={cilAvTimer} size="xl"/> : timer}
    </div>
  )
}

export default Timer