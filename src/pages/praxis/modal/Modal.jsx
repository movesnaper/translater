import React from "react";
import style from './Modal.module.css'
import { CCardText, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CButton } from '@coreui/react'


const Modal =  ({visible, setModal, card={}}) => {
  return     <CModal backdrop="static" visible={visible} onClose={() => setModal(false)}>
  <CModalHeader>
    <CModalTitle>{ card.key }</CModalTitle>
  </CModalHeader>
  <CModalBody>
    {card.docs.map((doc, index) => {
      return <CCardText className={style.card__translate}
        key={index}>{doc && doc.translate }</CCardText>
    })}
  </CModalBody>
  <CModalFooter>
    <CButton color="primary">Save changes</CButton>
  </CModalFooter>
</CModal>
}

export default Modal