import React from "react";
import { NavLink } from "react-router-dom"
import DocTitle from '../../docTitle'


const User = ({email: user}) => {
    const userTitle = () => {
        return user || <NavLink to='auth/login'>login</NavLink> 
      }
    return  DocTitle({title: userTitle(), menu: [
        user ? {title: 'logout', href: `/auth/logout`} : 
        {title: 'register', href: `/auth/register`}
        ]})
}

export default User