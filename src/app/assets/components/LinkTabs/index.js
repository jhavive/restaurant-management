import React from 'react'
import './styles.scss'
import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Switch
} from 'react-router-dom'
import { Link } from 'react-router-dom'

export default class LinkTabs extends React.Component {

    state = {
        activeTab: 0
    }

    constructor(props){
        super(props)
    }

    /* This method is called just prior to component mounting on the DOM (or when the render method is called). Then our component gets mounted. */

    componentWillMount = () => {

    }

    /* This method is called after the component is mounted on the DOM. Like componentWillMount(), it is called only once in a lifecycle.
    Before its execution, the render method is called. We can make API calls and update the state with the API response */

    componentDidMount = () => {

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

    changeActiveIndex = e => {
        this.setState({
            activeTab: e.target.getAttribute('data-index')
        }, () => {
            let { dispatch } = window.rootStore
            dispatch({
                type: "OPEN_LOADER"
            })
        })
    }

    /* render is called to paint the dom */
    render = () => {
        let currentPath = location.pathname.split('/')
        return <div className="tabs-container">
        <Router history={browserHistory}> 
            <React.Fragment>
                <div className="header-container">
                    <div className="tabs-header"> 
                    {
                        this.props.tabs && this.props.tabs.map((tab, index) => {
                            console.log(`${this.props.baseUrl}${tab.path ? "/"+tab.path: ""}`)
                            console.log(tab.path+" tabs-container "+currentPath[currentPath.length - 1])
                            return <div 
                                className   =   {   
                                                    'tab-box'+' '+
                                                    ( tab.path == currentPath[currentPath.length - 1] ? 'active' : '' ) +' '
                                                }
                                onClick     =   { this.changeActiveIndex }
                                data-index  =   { index }
                                >
                                    <Link to={`${this.props.baseUrl}${tab.path ? "/"+tab.path: ""}`}>
                                    { 
                                        tab.label
                                    }
                                    </Link>
                            </div>
                        })
                    }
                    </div>
                    
                </div>
                <div className="tabs-body">
                        <Switch>
                            {
                                this.props.tabs && this.props.tabs.map(tab => {
                                    return <Route
                                        path        =   {`${this.props.baseUrl}${tab.path ? "/"+tab.path: ""}`}
                                        exact>
                                            {
                                                tab.component
                                            }
                                        </Route>
                                    }
                                )
                                
                            }
                            <Route path = "/">
                            {
                                this.props.tabs[0].component
                            }
                            </Route>
                        </Switch>
                    </div>
                </React.Fragment>
            </Router>
        </div>
    }


}