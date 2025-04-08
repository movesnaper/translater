import React from "react";
import { CSpinner, CListGroup, CListGroupItem } from '@coreui/react'
import style from './style.module.css'

const TranslateItems = ({ items, loading, schema }) => {
  // const [items, setItems] = useState([])
  // const [loading, setLoading] = useState(false)
  // const update = async () => {
  //   try {
  //     setLoading(true)
  //     setItems(await api.get(url))
  //   } catch(e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  // useEffect(() => { update() }, [url])

  return loading ? <CSpinner/> :
 <CListGroup className={style.ListGroupe}>
  { items && items.map((item, index) => 
    <CListGroupItem key={index} className={style.CListGroupItem}>
      { schema(item) }
    </CListGroupItem>
  )}

</CListGroup> 
}

export default TranslateItems