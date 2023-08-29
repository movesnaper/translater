import React, {useRef, useState, useEffect} from "react"
import style from './Home.module.css'
import { CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react'
import { NavLink } from "react-router-dom"
import { db } from '../../db/index.js'


const Home =  () => {
  const inpFile = useRef()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(false)


  const onUpload =  async ({target}) => {
    setLoading(upload)
    try {
      const formData = new FormData()
      formData.append('pdfFile', target.files[0])
      setDocs([...docs, await db('/').upload(formData)])
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }

  const update = async () => {
    try {
      setDocs(await db('/').get())
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    update()
  }, [])

  return <div className={style.home}>
    <CRow className="gap-5">
      {[
        ...docs,
        { title: 'Add', upload: true}
        
      ].map(({_id, text, title, upload}, index) => {
        return <CCol sm={3} key={index}>
        <CCard>
          <CCardBody>
            <CCardTitle>{title}</CCardTitle>
            <NavLink to={`/dictionary/${_id}`}>
              <CCardText className={style.card__text}>{text}</CCardText>
            </NavLink>
            {upload && <CButton onClick={()=>inpFile.current.click()}>Upload</CButton>}
          </CCardBody>
        </CCard>
      </CCol>

      })}
    </CRow>
    <input type="file" ref={inpFile} hidden onChange={onUpload}/>
  </div>
}

export default Home