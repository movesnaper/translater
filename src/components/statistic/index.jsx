import React, {useState, useEffect} from "react"
import style from './style.module.css'
import { CRow, CCol } from '@coreui/react'
import { CProgress, CProgressStacked } from '@coreui/react'
import DropDownBtn from '../dropDownBtn'

export const dropDowvNavs = ({ id, xs, title }, ...menu) => {
  return { xs, value: <DropDownBtn schema={[
    { value: <span style={{fontSize: '13px'}}>{title}</span> },
    { menu: menu.map((url) => 
      ({ title: url, href: `/${url}/${id}`}))
    }
    ]}/>
  }
}

export const schema = ({ total }) => {
  const info = total < 75 && 'info'
  return [
    // { progress: [
    //   { color: 'primary', value: 1, label: `keys ${keys}`}
    // ]},
    { progress: [
      { color: info || 'success', min: 25, value: + total, label: `${total} %`}
    ]}
  ]
}

const Statistic = ({ api, schema, children }) => {
  const [value, setValue] = useState(null)
  const [loading, setLoading] = useState(false)

  const update = async () => {
    if (loading) return
    try {
      setLoading(true)
      const info = await api()
      setValue(info)
    }catch (e) {}
    finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    api && update()
   }, [])

  return <>
    <CRow className={style.statistic}>
        { value && schema(value).map((item, index) => {
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
    { children(value, update) }
  </>
}

export default Statistic