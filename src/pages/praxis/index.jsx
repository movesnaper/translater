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

  return <Page schema={Modal} statistic={statistic}> 
    { ({setResult, setModal, id}) => {
          return <Layout schema={{
            content: ({history = [], addHistory}) => <Card
              api={(mark) => api.get(`/card/${id}/${mark}`)} 
              addResult={(card) => setResult(card.value).then(() => addHistory(card))}
              footer={({card = {}}) => {
                const { history: index = history.length, resolve = () => {} } = card
                return [
                    {title: 'Prev', disabled: !index, action: () => resolve(history[index - 1])},
                    {title: 'Next', action: () => resolve(history[index + 1]), schema: [
                      { title: 'edit',  action: () => {
                        setModal({...card, save: ({value}) => {
                          setResult(value).then(() => resolve(addHistory({...card, value}, index)))
                        } })
                      }},
                      {title: 'remove', action: () => setResult({...card.value, _id: false}).then(resolve)}
                    ]}
                ]
              }}
              />
          }}
          />
    }}
  </Page>
}

export default PraxisPage
