import React from "react"
import { CTooltip, CLink } from '@coreui/react'
import style from './style.module.css'
const dst = (cur, {dst = ''}) => cur += (dst + ' ')
const fontStyle = (v) => {
return !v?.length && 'oblique'
}
const TooltipSpan = ({ item, onClick, mark, index }) => {
    const { str, key, value } = item || {}
      const tooltip = value?.reduce && <CTooltip content={ value.reduce(dst, '') }>
      <CLink >{str}</CLink>
      </CTooltip>
      return key && <span data-index={index} key={index} style={{fontStyle: fontStyle(value)}}
      className={[style.text__tooltip, mark && style.text__book_mark].join(' ')}
      onDoubleClick={onClick}>{ tooltip || str }</span> ||
      <span data-index={index}>{str}</span>
}

export default TooltipSpan