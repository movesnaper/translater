import React from "react"
import Edit from '../../../components/edit/CardEdit'
import Header from '../../praxis/Card/CardHeader'
import Title from '../../praxis/Card/CardTitle'
import Transcription from '../../praxis/Card/CardTranscription'
import Modal from '../../../components/modal'

const TableModal = ({value, footer, setValue}) => {
  return <Modal visible={!!value} close={() => setValue(false)} 
  header={ <Header schema={[
    { xs: 5, component: <Title value={value}/>},
    { component: <Transcription value={value}/>}
  ]}/>} 
  footer={footer}>
    { value && <Edit value={value} setValue={setValue}/> }
  </Modal>
}

export default TableModal