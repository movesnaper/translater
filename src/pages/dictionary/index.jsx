import React, {} from "react"
import Page from '../../components/page'
import Layout from './layout'
import Result from './layout/TableResult'
import { db } from '../../db'
import DropDownBtn from '../../components/dropDownBtn'
import SearchInput from '../../components/searchInput/index'
import { AiOutlineFilter } from "react-icons/ai"
const api = db(`/documents`)

const Dictionary =  () => {
  return <Page 
  schema={({ info = {}, page = {}, update, setPage: updatePage}) => {
    const {filter, [page?.filter]: skip = 0, limit = 20} = page['dictionary'] || {}
    // const {mark = 0, font = 14, limit = 200} = page['dictionary'] || {}
    const setPage = (value) => {

      updatePage('dictionary', {filter, limit, [page?.filter]: skip, ...value})
    }
    const setResult = async ({ ref, key, value = []}) => {
      const values = value.filter(({ uid, active }) => uid || active !== undefined)
        .map((v) => ({...v, _id: key || ref}))
      try {
        await api.post(`/text/${info.id}`, {key: ref, value: key, values})
        update()
      } catch(e) {
        console.error(e);
      }
    }
  
  return {
    menu: (id) => [
      {title: 'text', href: `/text/${id}`},
      {title: 'praxis', href: `/praxis/${id}`}
    ],
    content: <Layout 
    page={{filter, limit, skip}}
    api={({skip = 0, limit= 20, filter, search}) => api.get(`/dictionary/${info.id}`, {skip, limit, filter, search})}
    schema={({ api, values, filter, total, setFilter, setModal, setValues }, update) => {
      const updateValues = (index) => {
        const {index: skip} = values[index] || {}
        return update({skip, limit: values.length - index}, (items) => {
          setModal(false)
          return [...values.filter((v, i) =>  i < index), ...items]
        })
        
      }
      return {
        setPage,
        table: {
          header: [
            {value: total, getValue: ({index}) => index + 1},
            { colSpan: 2, getValue: ({_id} = {}) => _id, value: SearchInput({ schema: ({items}) => {
              return { api, update: (v) => {
                v? setValues(items) : update({})
              }}
            }})},
            {getValue: ({dst} = {}) => dst, value: DropDownBtn({ 
              style: {textAlign: 'right', with: '100%'},
              active: 0,
              schema: () => {
                return {
                  title: <AiOutlineFilter size={25}/>,
                  menu: ['all', 'hasValue', 'hasNoValue', 'isExclude'].map((key) => {
                    return { getValue: () => <div onClick={() => setFilter(key)}>{key}</div>}
                  }),
                }
              }})},
            { value: false, getValue: (value = {}, index) => {
              return <Result value={value} addResult={(value) => {
                const { _id: ref } = value
              return setResult({ ref, value: [value]})
              .then(() => updateValues(index))
            }}/>
            },
            style: {textAlign: 'right'}
          },
          ],
          onClickRow: (value, index) => {
            const { _id: ref, exclude } = value
            !exclude && setModal({
              value: { _id: ref, key: ref },
              save: ({key, value}) => {
                return setResult({ ref, key, value}).then(() => updateValues(index))
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