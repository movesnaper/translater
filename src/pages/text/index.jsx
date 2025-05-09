import React from "react"
import Page from '../../components/page'
import Range from '../../components/range'
import Layout from "./layout"
import Footer from "./footer"

import { db } from '../../db'
const api = db(`/documents`)

const TextPage =  () => {
  
  return <Page 
  schema={({ info = {}, page = {}, setModal, setPage: updatePage}) => {
  const {mark = 0, font = 14, limit = 200} = page['text'] || {}

  const setPage = (value) => {
    updatePage('text', {mark, limit, font, ...value})
  }
 
    return {
      menu: (id) => [
        {title: 'praxis', href: `/praxis/${id}`},
        {title: 'dictionary', href: `/dictionary/${id}`}
      ],
      header: [
        {title: Range({ values: [font], settings: {step: 0.1, min: 10, max: 40},
          setValues: ([font]) => setPage({font})
        })
        }
      ],
      content: <Layout page={{mark, limit, font}} schema={() => {
        return {
          setModal,
          setPage,
          api: ({mark, limit}) => api.get(`/text/${info.id}`, {mark, limit}),
          // onSlide: (index, key) => {
            // console.log(index, key);
            
            // const keyMark = key === 'next' ? mark + limit : mark - limit
            // setState({...state, index})
            // setPage({ limit, mark:  keyMark })
          // }
        }
      }}
      // setPage={setPage}
      // page={page} api={() => {
      //   return api.get(`/text/${id}`, {font, limit, mark})
      // }}
      // textEdit = {async (props) => {
      //   try {
      //     await api.post(`/text/edit/${id}`, props)
      //     update()
      //   } catch (e) { console.error(e) }
      // }}
      // setResult={ async({ ref, key, value = []}) => {
      //   const values = value.filter(({uid, active}) => uid || active !== undefined)
      //   .map((v) => ({...v, _id: key || ref}))
      //   try {
      //     return api.post(`/text/${id}`, { key: ref, value: key, values }).then(update)
      //   } catch(e) {
      //     console.error(e);
      //   }    
      // }}
      />,

      footer: info && <Footer schema={() => {
        // const {mark, limit} = pageText
        const current = Math.floor(mark  / limit)
        const total =  Math.floor(info.totalKeys / limit)
        return [
          {title: current + 1, menu: [
            {title: Range({ values: [current], settings: {step: 1, min: 0, max: total + 1, total: total + 1},
              setValues: ([current]) => setPage({mark: current * limit})
            })
            }
          ]}
        ]
      }}/>
    }
     {
      // content: <Layout id={id} api={(props) => api.get(`/text/${id}`, props)}
      // schema={({values, obj, mark, total, limit, font, setModal}) => {
      //   return {
      //     content: (update) => (item, index) => <TooltipSpan
      //     key={index} index={index} mark={mark === index} item={item}
      //     onClick={() => {
      //       setModal({ index, value: item, 
      //         save: ({value: modal}) => {
      //           setResult(modal, item.key)
      //           .then((value) => {
      //             update({obj: Object.assign(obj, value)})
      //             setModal(false)
      //           })
      //         }
      //       })
      //     }}/>,
      //     footer: (update) => [
      //       { title: 'Prev', action: () => update('mark', mark - limit)},
      //       { title: 'Next', action: () => update('mark', mark + limit), menu: [
      //         { title: `Current ${Math.floor(mark / limit) + 1} Total ${Math.floor(total / limit) + 1}`},
      //         {title: Range({ values: [font], settings: {step: 0.1, min: 10, max: 40}, 
      //           setValues: ([value]) => {
      //             update('font', value)
      //           }})}
      //       ]}
      //     ],
      //     context: (update) => [
      //       { title: 'remove', action: async ([start, end]) => {
      //         values.splice(start, end - start + 1 )
      //         return textEdit({ values, mark, limit }).then(update)
      //       }},
      //     ]
      //   }
      // }}/>
    }
  }}/>
}

export default TextPage