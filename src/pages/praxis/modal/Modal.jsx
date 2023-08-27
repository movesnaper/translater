import React from "react";
import style from './Modal.module.css'
import CIcon from '@coreui/icons-react'
import { CListGroup, CListGroupItem, CButton, CFormCheck } from '@coreui/react'
import { CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, } from '@coreui/react'
import {cilTrash} from '@coreui/icons'

const Modal =  ({visible, setModal, card={}}) => {
  return <CModal 
  backdrop="static" visible={visible} onClose={() => setModal(false)}>
  <CModalHeader>
    <CModalTitle>{ card.key }</CModalTitle>
  </CModalHeader>
  <CModalBody className={style.modal__card}>
      <div className={style.flex__container}>
          <CButton variant="outline" >
            <CIcon style={{'--ci-primary-color': 'red'}} icon={cilTrash} size="sm" />
          </CButton>
      </div>
    <CListGroup>
          {card.docs.map((doc = {}, index) => {
            return <CListGroupItem className={style.card__translate}
            key={index}>
              <CFormCheck label={doc.translate } /> 
            </CListGroupItem>
          })}
    </CListGroup>    
  </CModalBody>
  <CModalFooter>
    <CButton color="primary">Save changes</CButton>
  </CModalFooter>
</CModal>
}

export default Modal