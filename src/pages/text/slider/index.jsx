import React, {useState, useEffect} from "react";
import { CCarousel,  CCarouselItem} from '@coreui/react'
import PageItem from './PageItem'
import ShowModal from '../../../components/modal'
import Modal from '../modal'
import style from './style.module.css'

const Layout = ({ page, setPage, api, setResult, textEdit, info }) => {
  const [state, setState ] = useState({ values: [] })
  const {mark = 0, limit = 200, font} = page
  const setModal = (modal = false, edit) => {
    setState({...state, modal, edit})
  }

  const update = async (index = 0) => {
    try {
      setState({...state, loading: true})
      state.values.splice(index, 1, await api())
      setState({ ...state, values: state.values, loading: false })

    } catch (e) { console.error(e) }
  }
  useEffect(() => {
    update(state?.index)
   }, [mark])
  return  <>
  <CCarousel  controls interval={false} onSlide={(index, key) => {
    const keyMark = key === 'next' ? mark + limit : mark - limit
    setState({...state, index})
    setPage({ limit, mark:  keyMark })
  }}>
    {[...state.values, {}].map((value, index) => <CCarouselItem key={index}>
    <div className={style.text__slider__page_item}>
      <PageItem edit={state.edit} value={value} font={font}
      context={() => [
        { title: 'remove', action: async ([start, end]) => {
          return textEdit({ mark, start, end })
          .then(() => update(state.index))
        }}
      ]}
      onClick={(value) => {
        setModal({ index, value: value, 
          save: ({value: modal}) => {
            const {key, value: values = []} = modal
            setResult(key, values.filter(({_id}) => !!_id), value.key)
            .then(async(value) => {
              setModal(false, value)
            })
          }
        })            
      }}/>
    </div>
  </CCarouselItem>)}
</CCarousel>
{ ShowModal({ schema: Modal, modal: state.modal, setModal })}
  </>
}

export default Layout