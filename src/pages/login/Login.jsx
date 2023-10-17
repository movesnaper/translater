import React, { useState, useContext } from "react"
import { CForm, CFormInput, CButton } from '@coreui/react'
import { useParams } from "react-router-dom"
import style from './Login.module.css'
import { useNavigate } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai"
import { db } from '../../db/index.js'
import { UserContext } from "../../components/UserProvider"

 const Login = () => {
  const [user, setUser] = useContext(UserContext)
  const {action = 'login'} = useParams()
  const navigate  = useNavigate()
  const [data, setData] = useState({})
  const login = async () => {
    try {
      const jwt = await db('/auth').post(`/${action}`, data)
      setUser(jwt)
    } catch(e) {
      console.log(e);
    }
  }
  return <div className={style.login}>
  <CForm className={style.login__form} >
  <div className={style.close_btn}>
    <CButton  color="dark" onClick={() => navigate('/')}>
      <AiOutlineClose size={25}></AiOutlineClose>
    </CButton>
  </div>
  <CFormInput
    className="mb-3"
    type="email" 
    label="Email address" 
    placeholder="name@example.com"
    onInput={({target}) => setData({...data, email: target.value})}/>

  <CFormInput
    className="mb-3"
    label="Password" 
    placeholder="password" 
    type="password"
    onInput={({target}) => setData({...data, password: target.value})}/>

  {action === 'register' && <CFormInput
    className="mb-3"
    label="Confirm" 
    placeholder="confirm" 
    type="password"
    onInput={({target}) => setData({...data, confirm: target.value})}/>}

  <div className="d-flex justify-content-end">
    <CButton
      disabled={!data.email || !data.password}
      onClick={() => login().then(() => navigate('/'))}>
      { action }
    </CButton>
  </div>
</CForm>
</div>

 }

 export default Login