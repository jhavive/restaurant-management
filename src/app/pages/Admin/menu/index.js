import React from 'react'
import './styles.scss'
import { adminGet } from '../../../utils/api'
import config from '../../../app-config/api-endpoint'
import MenuBuilder from './MenuBuilder'

export default class MenuPage extends React.Component {

    state = {
        formData: {
            name: ''
        },
        sections: [
            {
                section_name: "",
                items: [
                    {
                        name: "",
                        description: "",
                        price: 0
                    }
                ]
            }
        ]
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
        console.log(this.props.match.params)
        let { dispatch } = window.rootStore
        dispatch({
            type:"OPEN_LOADER"
        })
        adminGet(config.routes.menu.menu)
        .then(response => {
            console.log("response", response)
            this.setState({
                sections: response
            })
        })
        .catch(e => {
            console.log(e)
        })
        
        // dispatch({
        //     type:"CLOSE_LOADER"
        // })
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

    onChange = e => {
        let formData = { ...this.state.formData}
        formData.name = e.target.value
        this.setState({
            formData
        })
    }

    /* render is called to paint the dom */
    render = () => <div className="menu-page-container">
        <MenuBuilder sections={this.state.sections}/>
    </div>  


}