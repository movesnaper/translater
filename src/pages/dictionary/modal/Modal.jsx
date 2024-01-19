import React from "react";
import style from './Modal.module.css'
import { CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react'

const Modal =  ({ modal, children, footer, title }) => {
  const { close } = modal || {}
  return <CModal  backdrop="static" visible={!!modal} onClose={close}>
    <CModalHeader>
      <CModalTitle>{ title }</CModalTitle>
    </CModalHeader>
    <CModalBody > { children } </CModalBody>
    <CModalFooter> {footer} </CModalFooter>  
  </CModal>
}


export  default Modal