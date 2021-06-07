import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Constants from '../constants'

const ROUTE_ORDER = [
    'leads',
    'contacts',
    'inventory',
    'feedback'
]

class AppList extends React.Component{

    componentDidMount = () => {
        let { dispatch } = window.rootStore
        dispatch({
            type: 'HIDE_FOOTER'
        })
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if(this.props.openLoader){
            let { dispatch } = window.rootStore
            dispatch({
                type: 'CLOSE_LOADER'
            })
        }
        else {
            return true
        }
    }

    render = () => {

        return <div className="app-list-container">

            <h1>Hello Vivek</h1>
            <p>Let's start by selecting an app</p>

            <div className="app-list">
                {
                    ROUTE_ORDER.map(app => {
                        let parentRoute = Constants.APPS[app]
                            if( this.props.allowedApps.includes(app) && parentRoute ){
                                return  <Link to={parentRoute.path} className="applink">
                                        {
                                            parentRoute.icon
                                        }<br/>
                                        {
                                            parentRoute.label
                                        }
                                </Link>
                            } else
                                return null
                    })
                }
            </div>
        </div>

    }

    componentWillUnmount = () => {
        console.log("heloo")
        let { dispatch } = window.rootStore
        dispatch({
            type: 'SHOW_FOOTER'
        })
    }

}

export default connect(store => ({
    allowedApps: store.allowedApps,
    openLoader: store.open_loader
}))(AppList)