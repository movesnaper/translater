import React from "react";
import style from './style.module.css'
import { CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'

const Modal =  ({ visible, children, header, footer, close }) => {
  return <CModal className={style.modal}
   backdrop="static" visible={visible} 
   onClose={close}>
    <CModalHeader>{ header }</CModalHeader>
    <CModalBody > { children } </CModalBody>
    <CModalFooter> {footer} </CModalFooter>  
  </CModal>
}


export  default Modal