import React, {useState, useEffect} from "react";
import { CCarousel,  CCarouselItem} from '@coreui/react'
import PageItem from './PageItem'
import style from './style.module.css'

const Layout = ({ page, schema }) => {
  const [state, setState ] = useState({ values: [] })
  const {mark = 0, limit = 200, font} = page || {}

  const {setModal, setPage, setResult, api} = schema()

  const update = async (index = 0, page) => {
    try {
      setState({...state, loading: true})
      state.values.splice(index, 1, await api(page))
      setState({ ...state, index, values: state.values })

    } catch (e) { 
      console.error(e) 
    } finally {
      setState({...state, loading: false})
    }
  }
 

  useEffect(() => {
    update(state.index, page)
   }, [])

  return  <>
  <CCarousel  controls interval={false} onSlide={(index, key) => {
    
    const value = { limit, mark:  key === 'next' ? mark + limit : mark - limit }
    // .then((v) => update(index, v))
    update(index, value).then(() => setPage(value))
    // update(index).then(() => )
  }}
  // onSlide={(index, key) => {
  //   const keyMark = key === 'next' ? mark + limit : mark - limit
  //   setState({...state, index})
  //   setPage({ limit, mark:  keyMark })
  // }}
  >
    {[...state.values, {}].map((value, index) => <CCarouselItem key={index}>
    <div className={style.text__slider__page_item}>
      <PageItem edit={state.edit} value={value} font={font}
      // context={() => [
      //   { title: 'remove', action: async ([start, end]) => {
      //     return textEdit({ mark, start, end })
      //     .then(() => update(state.index))
      //   }}
      // ]}
      onClick={(value) => {
        const { key, _id} = value
        setModal({ value: { _id: _id || key, key: _id || key }, 
          save: ({ key: ref, value}) => {
            return setResult({ ref, key,  values: value})
            .then(() => {
              update(state.index, page)
              setModal(false)
            })
          }
        })            
      }}/>
    </div>
  </CCarouselItem>)}
</CCarousel>
{/* { ShowModal({ schema: Modal, modal: state.modal, setModal })} */}
  </>
}

export default Layout