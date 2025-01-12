import Page from '../../components/page'
import Header from '../../components/page/header'
import { CFormCheck } from '@coreui/react'
import { db } from '../../db'
import Card from './Card'
import Layout from './layout'
import CardHeader from "../../components/cardHeader"
import Timer from "./Card/CardTimer"
const api = db(`/documents`)

const PraxisPage =  () => {

  return <Page menu={(id) => [
    {title: 'text', href: `/text/${id}`},
    {title: 'dictionary', href: `/dictionary/${id}`}   
  ]} schema={({id, keys, color, total, update }) => {
    const setResult = async (card) => {
      const { value } = card || {}
      try {
        api.post(`/results/${id}`, {value}).then(update)
        return card
      } catch(e) {
        console.error(e);
      }
    }
    return {
      // header: Header({keys, color, total}),
      content: <Layout id={id} schema={({history, sound, update, setModal, getResult, setPage}) => {
        return {
          content: <Card
            api={() => api.get(`/card/${id}`)} 
            addResult={(card) => setResult({...card, value: getResult(card)}).then(update)}
            header={({value, item, items}, setResult) => [
              <CardHeader key='card_header' value={value} sound={sound}/>,
              <Timer key='card_timer' disabled={!!item} reset={items} next={() => setResult(-1)} setPage={setPage}/>
            ]}
            footer={({card = {}}) => {
              const {item,  history: index = history.length, resolve = () => {} } = card
              return [
                  {title: 'Prev', disabled: !index, action: () => resolve(history[index - 1])},
                  {title: 'Next', action: () => resolve(history[index + 1]), schema: item ? [
                    { title: 'edit',  action: () => {
                      setModal({...card, save: ({value}) => {
                        setResult({value}).then(() => {
                          resolve(update({...card, value}, index))
                          setModal(false)
                        })
                      } })
                    }},
                    {title: 'remove', action: () => {
                      const value = {...card.value, _id: false}
                      return setResult({...card, value }).then(() => resolve())
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
