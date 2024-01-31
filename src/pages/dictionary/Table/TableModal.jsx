import React from "react"
import Edit from '../../praxis/Card/CardEdit'
import Header from '../../praxis/Card/CardHeader'
import Title from '../../praxis/Card/CardTitle'
import Transcription from '../../praxis/Card/CardTranscription'
import Modal from '../../../components/modal'

const TableModal = ({modal, footer, setModal}) => {

  const {key, value } = modal || {}

  return <Modal visible={!!key} close={() => setModal(false)} 
  header={ <Header schema={[
    { xs: 5, component: <Title value={{...value, key}}/>},
    { component: <Transcription value={value}/>}
  ]}/>} 
  footer={footer}>
    { key && <Edit card={{ ...modal, setCard: setModal }} /> }
  </Modal>
}

export default TableModal