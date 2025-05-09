import Page from '../../components/page'
import { CFormCheck } from '@coreui/react'
import { db } from '../../db'
import Card from './Card'
import Layout from './layout'
import CardHeader from "../../components/cardHeader"
import Timer from "./Card/CardTimer"

const api = db(`/documents`)

const PraxisPage =  () => {
  const inRange = (x, min, max) => x >= min &&  x <= max

  const getResult = ({_id, result}, item) => {
    const value = _id === item
    if (value) {
      if (result === undefined) return 5
      if (result === 5) return 8
    }
    if (!value) {
      if (result === 5) return 2
      if (inRange(result, 8, 10)) return 6
    }
    const sum = (result || 0) + (value || -1)
    return inRange(sum, 0, 10) ? sum : (result || 0)
  } 
  return <Page 
  schema={({info = {}, page = {}, setResult, setPage: updatePage }) => {
    const {sound} = page['praxis'] || {}

    const setPage = (value) => {
      updatePage('praxis', { sound, ...value})
    }


    return {
      menu: (id) =>  [
        {title: 'text', href: `/text/${id}`},
        {title: 'dictionary', href: `/dictionary/${id}`}
      ],
      content: <Layout schema={({ history, update, setModal }) => {
        return {
          content: <Card
            api={({result = 0}) => api.get(`/card/${info.id}/${result}`)} 
            addResult={({value, items, item}) => {
              const {_id: key } = value
              const resultValue = {...value, result: getResult(value, item)}
              setResult({ key, values: [resultValue] })
              return update({value: resultValue, items, item})
               
                // .then(() => update({value: resultValue, items, item}))
            }}
            header={({value, item, items}, setResult) => [
              <CardHeader key='card_header' value={value} sound={sound}/>,
              <Timer key='card_timer' disabled={!!item} reset={items} next={() => setResult(-1)} setPage={setPage}/>
            ]}
            footer={({card = {}}) => {
              const {value, item, history: index = history.length, resolve = () => {} } = card
              return [
                  {title: 'Prev', disabled: !index, action: () => {
                    resolve({history: history[index - 1]})}
                  },
                  {title: 'Next', action: () => {
                    resolve({...card, history: history[index + 1]})
                  }, 
                    schema: item ? [
                      { getValue: () => {
                        return <div onClick={() => {
                          setModal({...card, save: (value) => {
                            const {_id: key, value: values} = value
                            setResult({ key, values }).then(() => {
                            resolve({history: update({...card, value}, index)})
                            setModal(false)
                            })
                          }})                          
                        }}>{'edit'}</div>
                      }},
                    { getValue: () => {
                      return <div onClick={() => {
                       const {_id: key } = value
                        setResult({key, values: [{...value, active: false}]})
                        .then(() => resolve())                       
                      }}>{'remove'}</div>
                    }}
                    
                  ] : [
                    {title: <CFormCheck reverse defaultChecked={sound} label="sound"
                    onChange={() => {
                      setPage({sound: !sound})
                    }}/>}
                  

                ]}
              ]
          }}/>
        }
      }}
      />
    }
  }}/>
}

export default PraxisPage
