import Page from '../../components/page'
import { dropDowvNavs } from '../../components/statistic'
import Modal from '../modal'
import { db } from '../../db'
import Range from '../../components/range'
import Card from './Card'
import Layout from './layout'

const api = db(`/documents`)

const PraxisPage =  () => {

  const statistic = ({ id, title, keys, total, color, min }) => [
    dropDowvNavs({ title, id }, 'text', 'dictionary'),
    { xs: 2, value: `keys: ${keys}`},
    { xs: 4, progress: [
      { color, min, value: + total, label: `${total} %`}
    ]}
  ]

  return <Page schema={Modal} statistic={statistic}> 
    { ({setResult, setModal, id}) => {
          return <Layout id={id}
          api={() => api.get(`/card/${id}`)}
          setResult = {setResult}
          schema={{
              header: ({result, setPage}) => 
                Range({
                  setValues: setPage,
                  values: [result], 
                  settings: {step: 1, min: 0, max: 10}
                }),
              content: ({history = [], addHistory, mark}) => <Card 
              api={() => api.get(`/card/${id}/${mark}`)} 
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
