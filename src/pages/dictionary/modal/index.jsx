import Modal from '../../modal'
import DropDownBtn from '../../../components/dropDownBtn'

const ModalText = {...Modal,

  footer: ({key, index, value, remove, save}) => <DropDownBtn schema={
    [ {},
      { title: 'Save', action: () => save({key, index, value}), menu: [
          { title: 'remove',  action: () => remove(value) },
      ] }
    ]
  }/>
}

export default ModalText
