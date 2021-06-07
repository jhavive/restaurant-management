import React from 'react'
import { X, BarChart, Grid } from 'react-feather'
import { logo } from '../../../../../assets/images/images'
import './styles.scss'
import { connect } from 'react-redux'
import * as Constants from '../../constants'

import { withRouter } from "react-router";

const ROUTE_ORDER = [
    'table',
    'menu'
]

class Sidebar extends React.Component {

    constructor(props){
        super(props)

        let locationArr = location.pathname.split('/')
        let parentRoute = Constants.APPS()[locationArr[2]]

        this.state = {

            activeRoute: parentRoute && parentRoute.label ? parentRoute.label : '',
            activeSubRoute: parentRoute && parentRoute.subRoutes && parentRoute.subRoutes.reduce((acc, route) => {

                if ( route.key === locationArr[3] ) {
                    acc = route.label
                }
                return acc

            }, '')
        }
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

        console.log("hello getRoutes")
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

    changeRoute = (event, path, label) => {
        let { dispatch } = window.adminStore
        console.log(location.pathname,"target", path)
        let changedStateObj = {}
        if( event.currentTarget.className.includes('sub-routes-show') ){

            let target = event.target
            let parent = target.getAttribute('data-type') ? target : null

            while(parent==null){
                target = target.parentNode
                console.log("parent")
                if( target.getAttribute && target.getAttribute('data-type') ){
                    parent = target
                    break
                }
            }

            changedStateObj = {
                // open_loader: true,
                activeRoute: label,
                activeSubRoute: parent.getAttribute('data-type')
            }

            console.log(changedStateObj, "ssup 1", event.target)
            
        path += '/'+parent.getAttribute('data-type')

        } else {

            if(location.pathname.includes(path)){
                return
            }
            changedStateObj = {
                // open_loader: !event.target.className.includes('sub-routes-hidden'),
                activeRoute: label
            }

            console.log(changedStateObj, "ssup 2", event.target)

        }

        new Promise((resolve, reject) => {
            dispatch({
                type: 'CHANGE_ROUTE',
                data: changedStateObj
            })
            resolve()
        })
        .then(() => {
            this.props.history.push(path)
        })
    }

    getClassName = routeObj => {
        console.log(this.props.activeRoute, " getClassName", routeObj.label)
        let className = ''
        if( this.props.activeRoute ===  routeObj.label ){
            className =  'nav-link side-bar-link active-route ' 
        } else {
            className =  ' nav-link side-bar-link  ' 
        }
        return className
    }

    getRoutes = () => ROUTE_ORDER.map(app => {

        console.log( app, " ",this.props , "hello getRoutes", (location.pathname.split('/')[2]===app))
        let parentRoute = Constants.APPS()[app]

        if( this.props.allowedApps.includes(app) && parentRoute ){
            return  (
                <h5 
                    data-type   =   {app} 
                    className   =   {this.getClassName(parentRoute)}
                    onClick     =   {e => this.changeRoute(e, parentRoute.path, parentRoute.label)}
                    >
                        {
                            parentRoute.label
                        }
            </h5>)
        } else {
            return null
        }
    }) 

    /* render is called to paint the dom */
    render = () => {
        return(
            <nav class={`sidebar-container ${this.props.openSideBar ? '':'sidebar-hidden'}`}>

                <div class="navbar-wrapper">

                    <div class="header-logo">

                        <BarChart color="white" size={20}/>

                        <img 
                            src         =   {logo}
                            className   =   "logo"
                            />

                        <div 
                            className   =   "show-mobile close" 
                            onClick     =   {this.props.closeSideBase}
                            >
                                <X size={'60'}/>
                        </div>

                    </div>

                    <div class="sidebar-content">
                        {
                            this.getRoutes()
                        }
                    </div>
                    
                </div>
            </nav>
        )
    }


}

export default connect(store => ({
    allowedApps: store.allowedApps,
    activeSubRoute: store.activeSubRoute,
    activeRoute: store.activeRoute

}))(withRouter(Sidebar))