import React, {useState} from "react";
import { CSpinner } from '@coreui/react'

import style from './style.module.css'


const ContextMenu = ({schema, context}) => {
  const [loading, setLoading] = useState(false)
  const { x, y, range } = context || {}
  const contextStyle = {
    display: context ? 'block' : 'none',
    position: 'absolute',
    top: y,
    left: x,
    zIndex: 200
  }
  return <div style={contextStyle} className={style.pages__text__context_menu}>
    <ul >
    {loading && <CSpinner component="span" size="sm" aria-hidden="true"/>}
      {schema.map(({title, action}, index) => 
        <li key={index} onClick={async() => {
          setLoading(true)
          await action(range)
          setLoading(false)
          
        }}>{title}</li>)}
    </ul>
  </div>
}

export default ContextMenu