import React from "react"
import { CTooltip, CLink } from '@coreui/react'
import style from './style.module.css'
const dst = (cur, {dst = ''}) => cur += (dst + ' ')
const TooltipSpan = ({ item, onClick }) => {
    const { str, key, value, index, loading } = item
      const tooltip = value?.reduce && <CTooltip content={ value.reduce(dst, '') }>
        <CLink>{str}</CLink>
      </CTooltip>

      const bookMarkStyle = loading && style.text__book_mark

      return key && <span key={index} 
      className={[style.text__tooltip, bookMarkStyle].join(' ')}
      onClick={onClick}>{ tooltip || str}</span> || str

}

export default TooltipSpan