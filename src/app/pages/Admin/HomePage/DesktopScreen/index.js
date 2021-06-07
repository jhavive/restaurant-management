import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import './styles.scss'
import * as Constants from '../constants'
import Loadable from 'react-loadable'
import { withRouter } from "react-router"

import Navbar from './Navbar'
import Sidebar from './sidebar'


// const LoadableSettings = Loadable({ loader: () => import('../../../Settings/index.js'), render, loading })
// const LoadableAppPage = Loadable({ loader: () => import('../AppList/index.js'), render, loading })


class DesktopScreen extends React.Component {

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
        if(!this.props.allowedApps.length)
            return null
        let { props } = this

        let routesMap = props.allowedApps.reduce((arr, route) => {
            console.log("subRoute",arr)
            console.log("subRoute",route)
            console.log("subRoute",Constants.APPS()[route])

            console.log("subRoute")
            let temp = Constants.APPS()[route] && Constants.APPS()[route].subRoutes ? Constants.APPS()[route].subRoutes.map(r => r) : []
            let returnArr = [...arr, ...temp]
            if(Constants.APPS()[route])
                returnArr.push(Constants.APPS()[route])

            return returnArr
        }, [])

        browserHistory && browserHistory.listen( location =>  {
            console.log("awdawdawdawdawdasdaw");
        })

        return <div className="home-container">
        <Router history={browserHistory}> 
            <RouteContainer>
                {/* <Navbar {...props}/> */}
                <div className="body">
                    <Switch>
                    {
                        routesMap.map(route => <Route 
                            path        =   { route.path } 
                            render      =   { props => route.component(props) }
                            />)
                    }
                    {
                        // props.allowedApps.length ? <Route path='/app/settings' component={LoadableSettings}/> : null
                    }
                    </Switch>
                </div>
                <Sidebar {...props}/>
            </RouteContainer>
        </Router>
    </div>
    }


}


export default connect(store => ({
    allowedApps: store.allowedApps
}), null)(DesktopScreen)


class App extends React.Component {
    constructor(props) {
        super(props)
        
        //Here ya go
        this.props.history.listen((location, action) => {
            console.log("on route change")
            let { dispatch } = window.rootStore
            dispatch({
                type: 'OPEN_LOADER'
            })
        })
    }
  
    render = () => {
       return <React.Fragment>
            {
                this.props.children
            }
           </React.Fragment>
    }
}

const RouteContainer = withRouter(App)