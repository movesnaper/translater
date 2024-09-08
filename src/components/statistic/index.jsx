import React, {useState, useEffect} from "react"
import style from './style.module.css'
import { CRow, CCol } from '@coreui/react'
import DropDownBtn from '../dropDownBtn'
import StatisticProgress from "./StatisticProgress"

export const dropDowvNavs = ({ id, xs, title }, ...menu) => {
  return { xs, value: <DropDownBtn schema={[
    { value: <span style={{fontSize: '13px'}}>{title}</span> },
    { xs: 1, menu: menu.map((url) => ({ title: url, href: `/${url}/${id}`})) }
    ]}/>
  }
}

export const schema = ({ total }) => {
  const info = total < 75 && 'info'
  return [
    { progress: [
      { color: info || 'success', min: 25, value: + total, label: `${total} %`}
    ]}
  ]
}

const Statistic = ({ api, schema, children }) => {
  const [state, setState] = useState(null)

  const update = async () => {
    try {
      setState(await api())
    }catch (err) {
      console.log(err);
    }

  }

  useEffect(() => { update() }, [])

  const render = ({id, title, keys, color, total}) => [
    ...schema({ id, title }),
    { xs: 2, value: `keys: ${keys}`},
    {value: StatisticProgress({schema: [
      { color, value: + total || 25, label: `${total} %`}
    ]})}
  ]


  return <>
    <CRow className={style.statistic}>
        { state && render(state).map((item, index) => {
          const { xs, value } = item || {}
          return <CCol xs={xs} key={index}>
            {value}
        </CCol>
        })}
    </CRow>
    { children({...state, update}) }
  </>
}

export default Statistic