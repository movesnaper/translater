import Page from '../../components/page'
// import Header from '../../components/page/header'
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
  return <Page menu={(id) => [
    {title: 'text', href: `/text/${id}`},
    {title: 'dictionary', href: `/dictionary/${id}`}   
  ]} schema={({id, update }) => {

    const setResult = async ({ key, values }) => {
      // const { _id: key } = value
      try {
        api.post(`/text/${id}`, { key, values }).then(update)
        // return values
      } catch(e) {
        console.error(e);
      }
    }
    return {
      // header: Header({keys, color, total}),
      content: <Layout id={id} schema={({history, sound, update, setModal, setPage}) => {
        return {
          content: <Card
            api={({result = 0}) => api.get(`/card/${id}/${result}`)} 
            addResult={({value, items, item}) => {
              const {_id: key } = value
              const resultValue = {...value, result: getResult(value, item)}
              return setResult({ key, values: [resultValue] })
                .then(() => update({value: resultValue, items, item}))
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
                    { title: 'edit',  action: () => {
                      setModal({...card, save: (value) => {
                        const {_id: key } = value
                        setResult({key, values: [value]}).then(() => {
                          resolve({history: update({...card, value}, index)})
                          setModal(false)
                        })
                      } })
                    }},
                    {title: 'remove', action: () => {
                      const {_id: key } = value
                      return setResult({key, values: [{...value, active: false}]})
                        .then(() => resolve())
                    }}
                    
                  ] : [
                    {title: <CFormCheck reverse defaultChecked={sound} label="sound"/>, action: () => {
                    setPage({sound: !sound})
                  }}
                  

                ]}
              ]
            }}
            />
        }
      }}
      />
    }
  }}/>
}

export default PraxisPage
