import React from 'react'
import { CAvatar } from '@coreui/react'
import style from './User.module.css'
import { CButton } from '@coreui/react'
import { AiOutlineLogout } from "react-icons/ai"

const User = ({ user, logout }) => {

  return  <div className={style.avatar}>
  <CAvatar color="warning" textColor="white">{ user.email}</CAvatar>
  <CButton  color="light" variant="outline" onClick={logout}>
    <AiOutlineLogout size={25}/>
  </CButton>
</div>    
}

export default User
