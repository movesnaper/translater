import React, {useRef} from "react"
import { db } from '../../db/index.js'
import { NavLink } from "react-router-dom"
import { CFormCheck, CButton } from '@coreui/react'
import CardBtn from './card/CardBtn.jsx'
import DropDownBtn from '../../components/dropDownBtn'
import Layout from './layout'
import Modal from './modal'
import style from './style.module.css'

const HomePage =  () => {

  const inpFile = useRef()


  const upload =  async (file) => {
    if (!file) return
    try {
      const formData = new FormData()
      formData.append('pdfFile', file)
      return db('/documents/upload').upload(formData)
    } catch(e) {
      console.error(e)
    } 
  }

  const save = async (value) => {
    try {
      return db('/documents').post('/', value)
    } catch (e) {
      console.error(e);
    }
  }

  const remove = async (checked) => {
    const docs = checked.map(({id}) => id)
    try {
      await db().remove('/documents', {docs})
      return docs
    } catch(err) {
      console.log(err);
    }
  }

  return <Layout
    api={() => db('/documents').get()}
    schema={({values = [], setModal, setValues}) => {
      const checked = values.filter(({checked}) => checked >= 0)

      const select = (index, checked) => {
        values.splice(index, 1, {...values[index], checked:  checked ? index : undefined})
        setValues([...values])
      }

      return {
        header: <CardBtn schema={{title: 'Add', color: 'dark', onClick: () => inpFile.current.click()}}>
          <input type="file" ref={inpFile} hidden onChange={({target}) => 
            upload(...target.files).then((doc) => setValues([doc, ...values]))}/>
          </CardBtn>,
        table: {
          header: [
            {value: '#', getValue: (v, index) => index + 1},
            {value: 'title', getValue: ({id, title}) => 
              <NavLink className={style.pages__home__link} to={`/text/${id}`}>{title}</NavLink>
            },
            {value: 'desc', getValue: (({desc, user}) => desc || user)},
            { value: DropDownBtn({schema: [
              { value: checked.length, menu: [
                {title: 'remove', action: () => 
                  remove(checked).then((ids = []) => 
                    setValues(values.filter(({id}) => !ids.includes(id))))}
              ]}
            ]}), getValue: (({checked}, index) => <CButton style={{width: '100%'}}  variant='ghost' onClick={(e) => {
              e.stopPropagation()
              select(index, !(checked >= 0) )
            }}>
              <CFormCheck
            defaultChecked={checked >= 0 }/> </CButton>)}
          ],
          items: values.map((value, index) => ({value, onClick: () => setModal({value, index})}))
        },
        modal: Modal({save: ({value, index}) => 
          save(value).then(() => {
            values.splice(index, 1, value)
            setValues(values)
            setModal(false)
          })})
      }
    }}
  />

  // const cards = user &&  <CRow>
  //   <CCol>
  //     <CRow className="gap-5">
  //       {[ ...docs, { upload: () => inpFile.current.click() } ].map((doc, index) => {
  //         return <CCol sm={3} key={index}>
  //         {doc.id && <CheckInput checked={!!doc.checked}
  //            onCheck={() => check(index)}/>}
  //         <DocumentCard doc={{...doc, save }} loading={loading}/>
  //       </CCol>

  //       })}
  //     </CRow>
  //   </CCol>
  //   <CCol xs={1}><DropDownBtn schema={[
  //       { value: checked.length, menu: [
  //         { title: 'Remove', action: remove },
  //       ] }
  //     ]}/></CCol>
  // </CRow>

  // return <div className={style.home__page}>{cards || <Info/>}
  //   <input type="file" ref={inpFile} hidden onChange={upload}/>
  // </div>
}

export default HomePage