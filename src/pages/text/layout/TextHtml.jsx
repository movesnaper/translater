import React, { useState, useEffect } from "react";
import { CTooltip, CLink } from '@coreui/react'

import style from './style.module.css'

const TextHtml = ({ api, schema, height }) => {

  const [mark, setMark] = useState({})

  const { items, setItems, onClick } = schema || {}

  const update = async () => {
    try {
      const limit = 200
      const { values } = await api.get('/text', { limit, mark })
      const [{index} = {}] = values.splice(limit - 1, 1)
      setMark(index )
      setItems(values)
    } catch (e) {
      console.log(e);
    }
  }  
  const handelScroll = ({target}) => {
    const { scrollHeight, scrollTop} = target
    scrollHeight - scrollTop <= height && update()
  }

  useEffect(() => { api && update() }, [api])

  return <div className={style.text__scroll} style={{ height }}
  onScroll={handelScroll}>{
    items.map(({ str, key, value }, index) => {
      const exclude = value === 'exclude' &&
        <span className={style.text__exclude}>exclude</span>
      return  value !== undefined ? <span key={index} className={style.text__tooltip}
      onClick={() => onClick({ str, key, value, index })}>{
       value ? <CTooltip  content={exclude || value.dst}>
      <CLink > {str} </CLink>
    </CTooltip> : ` ${str} `
    }</span> : ` ${str} `
    })
  }</div>

}

export default TextHtml