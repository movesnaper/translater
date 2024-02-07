import React, { useState } from "react"
import Modal from '../../dictionary/table/TableModal'
import DropDownBtn from '../../../components/dropDownBtn'
import TextHtml from "./TextHtml"

const Text = ({ api, setItem }) => {
  const [state, setState] = useState({})
  const [values, setValues] = useState([])

  const { modal, loading } = state || {}

  const setModal = (modal) => setState({...state, modal })

  const setLoading = (loading) => setState({...state, loading })

  const update = ({ key, value }) => {
    values.filter((v) => v.key === key).forEach((v) => {
      values.splice(v.index, 1, {...v, value})
    })
    
  }
  const setValue = async (value) => {
    try {
      setLoading(true)
      await setItem({...modal, value}).then(update)
    } catch (e){ console.log(e);}
    finally{ setState({}) }
  }
  const saveBtn = { title: 'Save', loading, action: () => setValue(modal.value),
  menu: [
    { title: 'Exclude', action: () => setValue('exclude')},
    { title: 'Remove', action: () => setValue(undefined)}
  ]}
  
return <>
  <Modal modal={modal} setModal={setModal}
   footer={<DropDownBtn schema={[ {}, saveBtn ]}/>}
   />
  <TextHtml api={api} height={400}
  schema={{ items: values, onClick: setModal, setItems: (items) => {
    setValues([...values, ...items])
  }}}/>
  
</>
}

export default Text