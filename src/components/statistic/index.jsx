import React, {useState, useEffect} from "react"
import { NavLink } from 'react-router-dom'
import style from './style.module.css'
import { CRow, CCol } from '@coreui/react'
import { CProgress, CProgressStacked } from '@coreui/react'
import DropDownBtn from '../dropDownBtn'

export const dropDowvNavs = ({ id, xs, url, title }, ...menu) => {
  return { xs, value: <DropDownBtn schema={[
    { value: title },
    { value: <NavLink color='white' to={`${url}/${id}`}>{url}</NavLink>,
      menu: menu.map((url) => 
      ({ title: url, href: `${url}/${id}`}))
    }
    ]}/>
  }
}

export const schema = ({ keys, results, total }) => {
  const info = total < 75 && 'info'
  return [
    { progress: [
      { color: 'secondary', value: 50, label: `keys ${keys}`},
      { color: 'primary', value: 50, label: `results ${results}`}
    ]},
    { progress: [
      { color: info || 'success', min: 15, value: + total, label: `${total} %`}
    ]}
  ]
}

const Statistic = ({ api, schema, children }) => {
  const [value, setValue] = useState({})

  const update = async () => {
    setValue(await api.get())
  }

  useEffect(() => { api && update() }, [api])

  return <>
    <CRow className={style.statistic}>
        { schema(value).map((item, index) => {
          const { xs, progress, value } = item || {}
          return <CCol xs={xs} key={index}>
          { !progress ? value : <CProgressStacked>
            { progress.map(({ min, value, label, color, className }, index) => {
              return <CProgress
              key={index}
              className={className} 
              color={color} 
              value={ min > value ? min : value }>{label}</CProgress>
            })}
        </CProgressStacked>}
        </CCol>
        })}
    </CRow>
    { children(update) }
  </>
}

export default Statistic