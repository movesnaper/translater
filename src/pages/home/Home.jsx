import React, {useRef, useState, useEffect} from "react"
import style from './Home.module.css'
import { CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CButton, CSpinner } from '@coreui/react'
import { NavLink } from "react-router-dom"
import { db } from '../../db/index.js'


const Home =  () => {
  const inpFile = useRef()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(false)


  const onUpload =  async ({target}) => {
    setLoading('upload')
    try {
      const formData = new FormData()
      formData.append('pdfFile', target.files[0])
      const doc = await db('/').upload(formData)
      setDocs([...docs, doc])
      translate(doc)
    } catch(e) {
      console.log(e)
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
  const translate = async ({ _id }) => {
      setLoading('translate')
    try {
      await db('/translate').get(`/${_id}`)
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    update()
  }, [])

  return <div className={style.home}>
    <CRow className="gap-5">
      {[ ...docs, { title: 'Add', btn: 'upload' } ].map((doc, index) => {
        return <CCol sm={3} key={index}>
        <CCard>
          <CCardBody>
            { doc.btn ? <CButton disabled={ loading === doc.btn}
              onClick={() => inpFile.current.click()}>
            { loading === doc.btn && <CSpinner component="span" size="sm" aria-hidden="true"/> }
            { doc.btn }
            </CButton> :  loading === 'translate' ?
              <CSpinner component="span" size="sm" aria-hidden="true"/> :
              <>
                <NavLink component="span" to={`/dictionary`}> dictionary </NavLink>
                <span> / </span>
                <NavLink component="span" to={`/dictionary/${doc._id}`}> {doc.title} </NavLink>
              </>
            }
          </CCardBody>
        </CCard>
      </CCol>

      })}
    </CRow>
    <input type="file" ref={inpFile} hidden onChange={onUpload}/>
  </div>
}

export default Home