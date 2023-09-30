import React from 'react'
import { CAvatar } from '@coreui/react'
import style from './User.module.css'

const User = ({ user }) => {
  return  <div className={style.avatar}>
  <CAvatar color="warning" textColor="white">{ user.name}</CAvatar>
</div>    
}

export default User
