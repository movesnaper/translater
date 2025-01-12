import React, {useContext}  from "react"
import Page from '../../components/page'
// import Layout from './layout'
import Range from '../../components/range'
import Layout from "./slider"
import Footer from "./footer"
import { Context } from "../../components/Provider"

import { db } from '../../db'
const api = db(`/documents`)

const TextPage =  () => {
  const [{ pageText }, { pageText: updatePage }] = useContext(Context)
  return <Page menu={(id) => [
    {title: 'praxis', href: `/praxis/${id}`}, 
    {title: 'dictionary', href: `/dictionary/${id}`}
  ]}
  schema={({id, info, update}, setState) => {
  const page = (pageText || {})[id] || {mark: 0, font: 14}
  const {font = 18, mark = 0, limit = 200} = page
  const setPage = (value) => {
    updatePage({...pageText, [id]: Object.assign(page || {}, value)})
  }
 
    return {
      header: [
        {title: Range({ values: [font], settings: {step: 0.1, min: 10, max: 40},
          setValues: ([font]) => setPage({font})
        })
        }
      ],
      content: info && <Layout setPage={setPage}
      info={info}
      page={page} api={() => {
        return api.get(`/text/${id}`, {font, limit, mark})
      }}
      textEdit = {async (props) => {
        try {
          await api.post(`/text/edit/${id}`, props)
          update()
        } catch (e) { console.error(e) }
      }}
      setResult={async(key, values, ref) => {
        try {
          api.post(`/text/${id}`, { key, ref, values }).then(update)
          return { [key]: values, [ref]: values }
        } catch(e) {
          console.error(e);
        }    
      }}/>,

      footer: info && <Footer schema={() => {
        const current = Math.floor(mark  / limit)
        const total =  Math.floor(info.totalKeys / limit) 
        return [
          {title: current + 1, menu: [
            {title: Range({ values: [current], settings: {step: 1, min: 0, max: total, total: total + 1},
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