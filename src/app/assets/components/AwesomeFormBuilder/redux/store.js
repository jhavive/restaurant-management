import { reducer } from './reducer'
import { createStore } from 'redux'

const AwesomeFormBuilderStore = props => {

  let store = createStore(
    reducer(props),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'AwesomeFormBuilderStore' })
  )

  window.AwesomeFormBuilderStore = store

  return store

}

export { AwesomeFormBuilderStore }
