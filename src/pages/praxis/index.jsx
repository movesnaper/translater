import React, { useState } from "react"
import Card from './Card'
import Page from '../../components/page'
import { dropDowvNavs } from '../../components/statistic'
import DropDownBtn from '../../components/dropDownBtn'
import Modal from '../modal'
import { db } from '../../db'

const api = db(`/documents`)

const PraxisPage =  () => {
  const [history, setHistory] = useState([])
  const addHistory = (card) => {
    setHistory([card, ...history]
      .filter((v, index) => index <= 5).reverse()
        .map((v, index) => ({...v, history: index})))
  }
  const statistic = ({ id, title, keys, total, color, min }) => [
    dropDowvNavs({ title, id }, 'text', 'dictionary'),
    { xs: 2, value: `keys: ${keys}`},
    { xs: 4, progress: [
      { color, min, value: + total, label: `${total} %`}
    ]}
  ]

  return <Page schema={Modal} statistic={statistic}> 
    { ({setResult, setModal, id}) => {
          const addResult = async (card) => {
            setResult(card).then(() => addHistory(card))
          }          

        return <Card api={() => api.get(`/card/${id}`)} addResult={addResult}
          footer= {(card) => {
            const { history: index = history.length, resolve } = card
            return <DropDownBtn schema={[
              { xs: 2, title: 'Prev', disabled: !index, action: () => resolve(history[index - 1])},
              {},
              { xs: 2, title: 'Next', action: () => resolve(history[index + 1]), menu: [
                { title: 'edit',  action: () => {
                  setModal({...card, save: () => setResult(card)})
                }},
                { title: 'remove',  action: () => addResult({...card, value: ''}).then(resolve)},
              ] }
            ]}/>
            
          }}/>
    }}
  </Page>
}

export default PraxisPage
