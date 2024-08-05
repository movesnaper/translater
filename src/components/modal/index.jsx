import React from "react";
import style from './style.module.css'
import { CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'

const Modal =  ({schema, modal, setModal}) => {
  const { content, header, footer } = schema || {}
  return <CModal className={style.modal}
   backdrop="static" visible={!!modal} 
   onClose={() => setModal(false)}>
    <CModalHeader>{ header && header(modal, setModal) }</CModalHeader>
    <CModalBody > { content && content(modal, setModal) } </CModalBody>
    <CModalFooter> { footer && footer(modal, setModal)} </CModalFooter>  
  </CModal>
}


export  default Modal