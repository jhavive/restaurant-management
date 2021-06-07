import { reducer } from './reducer'
import { createStore } from 'redux'

const rootStore = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'rootStore' })
)
window.rootStore = rootStore

export { rootStore }
