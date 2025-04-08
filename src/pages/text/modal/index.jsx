// import React, { useEffect } from "react";

import Header from '../../../components/cardHeader'
import Modal from '../../modal'
import Content from '../../modal/Content'
import ItemsList from './ItemsList.jsx'

const ModalText = {...Modal,
  header: (card, setModal) => {
    return Header({value: card.value, setValue: (value) => setModal({...card, value })
    })
  },
  content: (card, setModal) => {
    return  Content({schema: [ 
      {component: ItemsList(card.value, (value) => setModal({...card, value }))},
    ]})
  }
}

export default ModalText
