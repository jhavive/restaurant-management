import { reducer } from './reducer'
import { createStore } from 'redux'

const tableStore = props => createStore(
  reducer(props),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'tableStore' })
)
window.tableStore = tableStore

export { tableStore }
