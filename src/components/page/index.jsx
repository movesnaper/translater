import React from "react"
import { useParams } from 'react-router-dom'
import { db } from '../../db/index.js'
import style from './style.module.css'
import Statistic from '../statistic'
const api = db(`/documents`)

const ComponentPage =  ({ children, schema }) => {
  const { id = '' } = useParams()

  return <div className={style.component__page}>
    <Statistic api={() => api.get(`/info/${id}`)} schema={(state) => schema({...state, id})}>
        { ({update}) => children({ id, update }) }
    </Statistic>
  </div>
}

export default ComponentPage