import Header from '../../../components/cardHeader'
import Modal from '../../modal'
import Content from '../../modal/Content'
import ItemsList from './ItemsList.jsx'
import { db } from '../../../db'
const api = db(`/documents/translate/lingvo/`)

const ModalText = {...Modal,
  header: (card, setModal) => {
    const { value } = card
    const setValue = async({ _id, dst }) => {
      const res = await api.get(`id/${_id}`)
      const value = { key: _id, value: res.length ? res : [{  dst }]}
      setModal({...card, value })
    }
    return Header({value, setValue})
    // <Header schema={[
    //   { xs: 5, component: AutocompleteTitle({ value, setValue })},
    //   { component: <Transcription value={value}/>}
    // ]}/>
  },
  content: (card, setModal) => {
    const { value = {} } = card
    const setValue = (value) => {
      setModal({...card, value})
    }
    return  Content({schema: [ 
      {component: ItemsList(value, setValue)},
    ]})
  }
}

export default ModalText
