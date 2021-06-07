import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  browserHistory,
  Switch
} from 'react-router-dom'
import Loadable from 'react-loadable'
import '../assets/scss/reset.scss'
import { Provider } from 'react-redux'
import {rootStore} from './store'
import FullModal from '../assets/components/FullModal'
import FullLoader from '../assets/components/FullLoader'

const loading = () => ( <div className='padding-loader'> {/* <Loader height='40px' width='40px' borderWidth='10px' /> */} </div> )
const render = (loaded, props) => { let Component = loaded.default; return <Component {...props} /> }

const LoadableLogin = Loadable({ loader: () => import('./Admin/Login/index.js'), render, loading })
const LoadableAdminPage = Loadable({ loader: () => import('./Admin/HomePage/index.js'), render, loading })
const LoadableCustomerPage = Loadable({ loader: () => import('./customer/index.js'), render, loading })


export default class Root extends React.PureComponent{

    render = () => {
        return(
            <Provider store={rootStore}>
                <Router history={browserHistory}>
                    <React.Fragment>
                        <Switch>
                            <Route path="/admin" component={ localStorage.getItem('token') ? LoadableAdminPage : LoadableLogin }/> 
                            {/* <Route path="/admin" component={LoadableAdminPage}/>  */}
                            <Route path="/" component={LoadableCustomerPage}/>
                        </Switch>
                        <FullModal/>
                        <FullLoader/>
                    </React.Fragment>
                </Router>
            </Provider>
        )
    }

}