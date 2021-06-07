import React from 'react'
import './styles.scss'
import Loadable from 'react-loadable'
import { Provider } from 'react-redux'
import { customerStore } from './store'
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Switch
} from 'react-router-dom'



const loading = () => {
    return <div className='padding-loader'></div>
}
const render = (loaded, props) => { 
    let Component = loaded.default
    return <Component {...props} /> 
}

const LoadableMenu = Loadable({ loader: () => import('./menu/index.js'), render, loading })
const LoadableCart = Loadable({ loader: () => import('./cart/index.js'), render, loading })
const LoadableHome = Loadable({ loader: () => import('./home/index.js'), render, loading })

export default class CustomerPage extends React.Component {

    constructor(props){
        super(props)
    }

    /* This method is called just prior to component mounting on the DOM (or when the render method is called). Then our component gets mounted. */

    componentWillMount = () => {

    }

    /* This method is called after the component is mounted on the DOM. Like componentWillMount(), it is called only once in a lifecycle.
    Before its execution, the render method is called. We can make API calls and update the state with the API response */

    componentDidMount = () => {
        let { dispatch } = window.rootStore
        dispatch({
            type: "CLOSE_LOADER"
        })
    }

    /* This method determines whether the component should be updated or not.
    By default, it’ll return true. 
    If at some point, if you want to re-render the component on a condition, then shouldComponentUpdate() method would be the correct choice */

    shouldComponentUpdate = (nextProps, nextState) => {
        return true
    }

    /* We call this method after the re-rendering our component.
    After the updated component gets updated on the DOM, the componentDidUpdate() method executes. This method will receive arguments like prevProps and prevState */

    componentDidUpdate = (prevProps, prevState) => {
        return true
    }

    /* Before the removal of the component from the DOM, componentWillUnMount() will execute */

    componentWillUnmount = () => {

    }

    /* render is called to paint the dom */
    render = () => {
        return  <div className="body">
            <Provider store={customerStore}>
                <Router history={browserHistory}>
                    
                    <Switch>
                        <Route path='/menu/:id' component={LoadableMenu}/>
                        <Route path='/cart' component={LoadableCart}/>
                        <Route path='/' component={LoadableHome}/>
                    </Switch>
                </Router>
            </Provider>
        </div>
    }


}