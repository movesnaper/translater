import React, {useRef} from "react"
import { db } from '../../db/index.js'
import { useOutletContext } from "react-router-dom";
import { CFormCheck, CButton } from '@coreui/react'
import CardBtn from '../../components/CardBtn.jsx'
import DropDownBtn from '../../components/dropDownBtn'
import Layout from './layout'
import Info from './info'
import Modal from './modal'
// import style from './style.module.css'

const HomePage =  () => {
  // const [name] = useOutletContext();
  // console.log(name);
  
  const inpFile = useRef()


  const upload =  async (file) => {
    if (!file) return
    try {
      const formData = new FormData()
      formData.append('pdfFile', file)
      return db('/documents/upload').upload(formData)
    } catch(error) { console.error(error) } 
  }

  const remove = async (checked) => {
    try {
      return db().remove('/documents', {docs: checked.map(({id}) => id)})
    } catch(error) { console.error(error) }
  }



  return <Layout
    api={() => db('/documents').get()}
    schema={({values, setModal, setValues}, update) => {
      const checked = values ? values.filter(({checked}) => checked >= 0) : []

      const select = (index, checked) => {
        values.splice(index, 1, {...values[index], checked:  checked ? index : undefined})
        setValues([...values])
      }

      return {
        header: <CardBtn schema={({setLoading}) => {
          return {
            title: 'Add', 
            color: 'dark', 
            onClick: () => inpFile.current.click(),
            prepend: <input type="file" ref={inpFile} hidden onChange={async ({target}) => {
              setLoading(true)
              await upload(...target.files).then(update)
              setLoading(false)
            }}/>
          }
        }}/>,
        table: {
          header: [
            {value: '#', getValue: (_, index) => index + 1},
            { getValue: ((doc, index) => {
              return <Info doc={doc} 
              // api={({id}) => db('/documents').get(`/${id}`)} 
              setModal={(value) => setModal({value, index})}/>
            })},
            { value: DropDownBtn({schema: () => {
              return { title: checked.length || '', menu: [
                { getValue: () => {
                  return <div onClick={() => {
                    remove(checked).then(update)
                  }}>{'remove'}</div>
                }}
              ]}
            }}), 
            getValue: (({checked}, index) => <CButton style={{width: '100%'}}  variant='ghost' onClick={(e) => {
              e.stopPropagation()
              select(index, !(checked >= 0) )
            }}><CFormCheck defaultChecked={checked >= 0 }/> </CButton>)}
          ],
          items: values && values.map((value, index) => ({ value }))
        },
        modal: () => Modal({
          save: async ({value}) => {
            const {id, title, desc} = value
            try {
              await db('/documents').post(`/${id}`, {title, desc}).then(update)
              setModal(false)
            } catch (error) { console.error(error) }
          }
        })
      }
    }}
  />

}

export default HomePage