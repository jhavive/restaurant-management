import React from 'react'
import './styles.scss'
import { Search, User } from 'react-feather'
import { Link } from 'react-router-dom'
import connect from 'react-redux/lib/connect/connect'

class Footer extends React.Component {

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

    /* render is called to paint the dom */
    render = () => {
        if(!this.props.show_footer){
            return null
        }

        if(this.props.custom_footer)
            return this.props.custom_footer(this.props.data)

        else 
            return <div className="mobile-footer">
                <Search color="#212121"/>
                <Link to="/app"> 
                    <div className="app">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                <User color="#212121"/>
                </Link>
            </div>

    }

}

export default connect(({ custom_footer , data, show_footer }) => {
    return { custom_footer , data, show_footer }
}, null)(Footer)