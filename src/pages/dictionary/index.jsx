import React, { useState } from "react"
import { useParams } from 'react-router-dom'
import Document from '../Document'
import Table from './Table'
import Result from './Table/TableResult'
import Edit from '../praxis/Card/CardEdit'
import Footer from '../praxis/Card/CardFooter'
import Header from '../praxis/Card/CardHeader'
import Title from '../praxis/Card/CardTitle'
import Transcription from '../praxis/Card/CardTranscription'
import Modal from './modal'
import { db } from '../../db/index.js'
const api = db(`/dictionary/`)

const Dictionary =  () => {
  const [modal, setModal] = useState(false)
  const { id } = useParams()

  const header = <Header schema={[
    <Title value={modal}/>,
    <Transcription value={modal}/>
  ]}/>

  const footer = (setResult) => {
    const {key, value, update} = modal
    const addResult = setResult(key, update)
    const close = () => setModal(false)
    
    return <Footer card={modal} schema={[ {},
      { title: 'Save', action: () => addResult(value).then(close), menu: [
        { title: 'Remove', action: () => addResult(undefined).then(close)},
        { title: 'Exclude', action: () => addResult('exclude').then(close)}
      ] }
    ]}/>
  }
  
  return <Document id={id} > 
    { ({ addResult }) => {
        const setResult = (key, update) => async (value) => {
          addResult(key, value).then(() => update({ key, value }))
        }

      return <>
        <Modal visible={!!modal.key} close={() =>setModal(false)} 
          header={header} footer={footer(setResult)}> 
          <Edit card={{...modal, setCard: setModal }} /> 
        </Modal>
        <Table api={api} height={400} url={`/${id}`} limit={10} rowClick={setModal} 
          schema={(items) => {
            const update = (index) => (value) => items.splice(index, 1, value)
            return {
              items: items.filter(({key}) => !key),
              row: { 
                onClick: ({key, value}, index) =>
                  setModal({key, value, update: setResult(key, update(index)) })
              },
              header: [
                { title: '#', getValue: ({}, index) => index + 1 },
                { title: 'Id', getValue: ({ key, value }) => value?._id || key },
                { title: 'Distanation', getValue: ({ value }) => value?.dst },
                { title: 'Result', getValue: ({ key, value }, index) => 
                <Result value={value} addResult={setResult(key, update(index))}/>}                   
              ]
            }
          }}/>
      </>
      
    }}
  </Document>
}

export default Dictionary