import React from "react"
import { CTooltip, CLink } from '@coreui/react'
import style from './style.module.css'
const dst = (cur, {dst = ''}) => cur += (dst + ' ')
const fontStyle = ({length}) => !length && 'oblique'
const TooltipSpan = ({ item, onClick, mark }) => {
    const { str, key, value, index } = item || {}
      const tooltip = value?.reduce && <CTooltip content={ value.reduce(dst, '') }>
      <CLink style={{fontStyle: fontStyle(value)}}>{str}</CLink>
      </CTooltip>
      return key && <span key={index} 
      className={[style.text__tooltip, mark && style.text__book_mark].join(' ')}
      onDoubleClick={onClick}>{ tooltip || str}</span> || str

}

export default TooltipSpan