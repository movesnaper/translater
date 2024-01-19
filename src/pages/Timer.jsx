import React, { useState, useRef } from 'react'

const Timer = ({ seconds = 10, children }) => {
  const Ref = useRef(null)
  const [value, setValue] = useState(false)

const getTimeRemaining = (e) => {
  const total = Date.parse(e) - Date.parse(new Date())
  const seconds = Math.floor((total / 1000) % 60)
  return { total, seconds }
}

const startTimer = (deadline) => {
  const { total, seconds } = getTimeRemaining(deadline)
  total >= 0 && setValue(seconds)
}

const getDeadLine = () => {
  const deadline = new Date()
  deadline.setSeconds(deadline.getSeconds() + seconds)
  return deadline
}

const resetTimer = () => {
  setValue(seconds)
  const deadline = getDeadLine()
  Ref.current = setInterval(() => { startTimer(deadline) }, 1000)
}

const reset = async (active) => {
  stop(value).then(() => active && resetTimer())
}

const stop = async () => {
  setValue(false)
    Ref.current && clearInterval(Ref.current)
}

  return <div className="text-secondary">
      { children({value, stop, reset}) }
    </div>
}

export default Timer