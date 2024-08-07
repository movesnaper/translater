import React from "react"
import { CTooltip, CLink } from '@coreui/react'
import style from './style.module.css'
const dst = (cur, {dst = ''}) => cur += (dst + ' ')
const TooltipSpan = ({ item, onClick, mark }) => {
    const { str, key, value, index } = item || {}
      const tooltip = value?.reduce && <CTooltip content={ value.reduce(dst, '') }>
        <CLink>{str}</CLink>
      </CTooltip>

      return key && <span key={index} 
      className={[style.text__tooltip, mark && style.text__book_mark].join(' ')}
      onClick={onClick}>{ tooltip || str}</span> || str

}

export default TooltipSpan