import Page from '../../components/page'
import DocTitle from '../../components/docTitle'
import Modal from '../modal'
import { db } from '../../db'
import Card from './Card'
import Layout from './layout'

const api = db(`/documents`)

const PraxisPage =  () => {

  const statistic = ({ id, title }) => [
    { value: DocTitle({title, menu: [
      {title: 'text', href: `/text/${id}`},
      {title: 'dictionary', href: `/dictionary/${id}`}
    ]})}
  ]

  return <Page schema={statistic}> 
    { ({id, update }) => {
          const setResult = async (card) => {
            const { value } = card || {}
            try {
              api.post(`/results/${id}`, {value}).then(update)
              return card
            } catch(e) {
              console.error(e);
            }
          }
          return <Layout schema={({history = [], update, setModal, getResult}) => {
            return {
              modal: Modal,
              content: <Card
                api={() => api.get(`/card/${id}`)} 
                addResult={(card) => setResult({...card, value: getResult(card)}).then(update)}
                footer={({card = {}}) => {
                  const {item,  history: index = history.length, resolve = () => {} } = card
                  return [
                      {title: 'Prev', disabled: !index, action: () => resolve(history[index - 1])},
                      {title: 'Next', action: () => resolve(history[index + 1]), schema: [
                        item && { title: 'edit',  action: () => {
                          setModal({...card, save: ({value}) => {
                            setResult({value}).then(() => {
                              resolve(update({...card, value}, index))
                              setModal(false)
                            })
                          } })
                        }},
                        {title: 'remove', action: () => {
                          const value = {...card.value, _id: false}
                          return setResult({...card, value }).then(() => resolve())
                        }}
                      ].filter((v) => !!v)}
                  ]
                }}
                />
            }
          }}
          />
    }}
  </Page>
}

export default PraxisPage
