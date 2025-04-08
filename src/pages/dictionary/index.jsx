import React, {} from "react"
import Page from '../../components/page'
import Layout from './layout'
import Result from './layout/TableResult'
import { db } from '../../db'
import DropDownBtn from '../../components/dropDownBtn'
import SearchInput from '../../components/searchInput'

const api = db(`/documents`)

const Dictionary =  () => {
  return <Page menu={(id) => [
    {title: 'text', href: `/text/${id}`},
    {title: 'praxis', href: `/praxis/${id}`}
  ]}
  schema={({ id, update }) => {
 
    const setResult = async ({ ref, key, value = []}) => {
      const values = value.filter(({ uid, active }) => uid || active !== undefined)
        .map((v) => ({...v, _id: key || ref}))
      try {
        await api.post(`/text/${id}`, {key: ref, value: key, values})
        update()
      } catch(e) {
        console.error(e);
      }
    }
  
  return {
    content: <Layout 
    id={id}
    api={({skip = 0, limit= 20, filter}) => api.get(`/dictionary/${id}`, {skip, limit, filter})}
    schema={({ filter, total, setFilter, setModal }, update) => {
      return {
        table: {
          header: [
            {value: total, getValue: ({index}) => index + 1},
            { getValue: ({_id, key} = {}) => _id || key},
            {value: SearchInput({style: {position: 'absolute', top: 0, right: '25%', width: '50%'}}), 
            getValue: ({dst} = {}) => dst},
            {value: DropDownBtn({ style: {position: 'absolute', top: 0, right: 0, width: '25%'},
              schema: [
              { title: !filter ? 'all' : filter, menu: [
                filter && {title: 'all', action: () => setFilter(false) },
                filter !== 'hasValue' && {title: 'hasValue', action: () => setFilter('hasValue') },
                filter !== 'hasNoValue' && {title: 'hasNoValue', action: () => setFilter('hasNoValue') },
                filter !== 'isExclude' && {title: 'isExclude', action: () => setFilter('isExclude') }
              ].filter((v) => v)}
            ]}), getValue: (value = {}, index) => {
              return <Result value={value} addResult={(value) => {
                const { _id: ref } = value
              return setResult({ ref, value: [value]})
              .then(() => update(index))
            }}/>
            }},
          ],
          onClickRow: (value, index) => {
            const { _id: ref, exclude } = value
            !exclude && setModal({
              value: { _id: ref, key: ref },
              save: ({key, value}) => {
                return setResult({ ref, key, value}).then(() => update(index))
              },
            })
          }
        }
      }
    }}
    />
  }
  }}/>
}

export default Dictionary