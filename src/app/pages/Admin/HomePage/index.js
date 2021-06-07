import React from 'react'
import { Provider } from 'react-redux'
import './styles.scss'
import * as Api from './api'
import {adminStore} from './store'

import MobileScreen from './MobileScreen'
import DesktopScreen from './DesktopScreen'

export default class HomePage extends React.PureComponent {

    state = {
        openSideBar: false,
        routes: []
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
        // Api.getRoute()
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

    openSideBar = () => {
        this.setState({
            openSideBar: true
        })
    }

    closeSideBar = () => {
        this.setState({
            openSideBar: false
        })
    }

    /* render is called to paint the dom */
    render = () => {
        return(
            <Provider store={adminStore}>
                <HomePageComponent {...this.props}/>
            </Provider>
        )
    }
}

const HomePageComponent = props => {
    if(window.matchMedia("(min-width: 320px) and (max-width: 767px) and (orientation: portrait)").matches)
        return <MobileScreen {...props}/>
    else
        return <DesktopScreen {...props}/>
    
}
