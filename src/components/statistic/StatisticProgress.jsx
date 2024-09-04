import React from "react";
import { CProgress, CProgressStacked } from '@coreui/react'

const StatisticProgress = ({schema}) => {
  return <CProgressStacked>
  { schema.map(({ value, label, color }, index) => {
    return <CProgress key={index}
    color={color} 
    value={ value }>{label}</CProgress>
  })}
</CProgressStacked>
}

export default StatisticProgress