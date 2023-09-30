import React from "react"
import { CForm, CFormInput, CButton } from '@coreui/react'
import style from './Login.module.css'
import { useNavigate  } from "react-router-dom"

 const Login = () => {
  const navigate  = useNavigate()
  const login = async () => {
    localStorage.setItem('user', 'admin')
  }
  return <div className={style.login}>
  <CForm className={style.login__form}>
  <CFormInput
    type="email"
    id="exampleFormControlInput1"
    label="Email address"
    placeholder="name@example.com"
    text="."
    aria-describedby="exampleFormControlInputHelpInline"
  />
    <CFormInput 
    label="Email address"
    type="password"/>
  <CButton className="mt-5"
  onClick={() => login().then(() => navigate(-1))}>Login</CButton>
</CForm>
</div>

 }

 export default Login