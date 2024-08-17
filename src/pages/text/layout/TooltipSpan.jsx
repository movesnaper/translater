import React from "react"
import { CTooltip, CLink } from '@coreui/react'
import style from './style.module.css'
const dst = (cur, {dst = ''}) => cur += (dst + ' ')
const fontStyle = (v) => {
  // console.log(v, v.length);
  
return !v?.length && 'oblique'
}
const TooltipSpan = ({ item, onClick, mark }) => {
    const { str, key, value, index } = item || {}
      const tooltip = value?.reduce && <CTooltip content={ value.reduce(dst, '') }>
      <CLink >{str}</CLink>
      </CTooltip>
      return key && <span key={index} style={{fontStyle: fontStyle(value)}}
      className={[style.text__tooltip, mark && style.text__book_mark].join(' ')}
      onDoubleClick={onClick}>{ tooltip || str }</span> || str

}

export default TooltipSpan