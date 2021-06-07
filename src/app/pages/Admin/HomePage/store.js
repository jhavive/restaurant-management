import { reducer } from './reducer'
import { createStore } from 'redux'

const adminStore = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'adminStore' })
)
window.adminStore = adminStore

export { adminStore }
