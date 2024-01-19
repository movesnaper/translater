import style from './Dictionary.module.css'
import { db } from '../../db/index.js'
import React from "react"
import { CButton, CFormCheck } from '@coreui/react'
import { useParams, NavLink } from 'react-router-dom'
import DictionaryTable from './DictionaryTable.jsx'
import DictanationInputs from '../TranslateInputs.jsx'
import TranslateItems from '../TranslateItems'
import DropDownBtn from '../DropDownBtn.jsx'

const Dictionary =  () => {

  const { id } = useParams();

  const addResult = async (key, value) => {
    try {
      await db(`/documents/${id}`).post(`/result/${key}`, {value})
      // update()
    } catch(e) {
      console.log(e);
    }
  }


  const tableParams = {
    height: 400,
    api: db('/dictionary'),
    url: `/${id}`,
    limit: 10
  }
  const getModal = ({key, value, index, update}) => {
    const setResult = async (value) => addResult(key, value)
      .then(() => update(!!value._id && {key, value}, index))
    return {
      title: key,
      body: <>
        <DictanationInputs value={value} setValue={(value) => update({key, value, index})}/>
        <TranslateItems schema={[
          (value) => <CButton color="link" onClick={() => update({key, value, index})}>
             {value?._id} 
          </CButton>,
          (value) => value?.dst
        ]} 
        params={{ api: db(`/documents`), url: !!key && `/translate/${key}`}}/>        
      </>,
      footer: <DropDownBtn schema={ btnSchema(value, (v) => setResult(v).then(update)) }/>
    }
  }

  const tableSchema = (update) => {

    const setResult = (key, value) => (evt) => {
      evt.stopPropagation()
      const result = value.result < 10 ? 10 : 0
      addResult(key, {...value, result }).then((value) => update({ key, value }))
    }
    return [
      { title: '#', key: 'index', getValue: ({index}) => index + 1 },
      { title: 'Id', key: 'id', getValue: ({key, value }) => value?._id || key },
      { title: 'Distanation', key: 'dst', getValue: ({ value }) => value?.dst },
      { title: 'Result', key: 'rst', getValue: ({ key, value, index }) => 
        !!value?._id && <div onClick={ setResult(key, value, index) }>
      <CFormCheck button={{ color: 'primary', variant: 'outline' }} 
      label={ (value.result || 0).toString() } 
      defaultChecked={ value.result >= 10 }/>      
      </div>}
    ]
  }

  const btnSchema = (value, update) => {
    const items = [
      { title: 'Remove', action: () => update(undefined) }
    ]
    return { title: 'Save', action: () => update(value), items}
  }


  return <div className={style.Dictionary}>
      <div  className={style.Dictionary__header}>
        {/* <h1>Total: {dictionary.total}</h1> */}
        <NavLink to={`/praxis/${id || ''}`}>
          <CButton  color="light" variant="outline" >praxis</CButton>
        </NavLink>
      </div>
      {/* <StatisticHeader></StatisticHeader> */}
      <DictionaryTable schema={tableSchema} params={tableParams} modal={getModal}/>

  </div>
}

export default Dictionary