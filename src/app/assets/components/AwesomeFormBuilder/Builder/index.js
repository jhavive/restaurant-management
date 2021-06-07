import React from 'react'
import './styles.scss'
import FormBuilder from '../Models/FormBuilder'
import connect from 'react-redux/lib/connect/connect'
import * as Actions from '../redux/actions'

class builder extends React.Component {

    state = {
        name: ''
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
        console.log("componentDidMount", this.props.name)
        this.setState({
            name: this.props.name
        }, () => {
            let { dispatch } = window.AwesomeFormBuilderStore
            dispatch(Actions.changeName(this.props.name))
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

    changeName = e => {
        this.setState({
            name: e.target.value
        }, () => {
            let { dispatch } = window.AwesomeFormBuilderStore
            dispatch(Actions.changeName(this.state.name))
        })
    }

    /* render is called to paint the dom */
    render = () => {
        let builder = new FormBuilder()
        return <React.Fragment>
            <input className={`${this.props.moduleNameError ? 'error':''} name-input`} placeholder="Module Name" required onChange={this.changeName} value={this.state.name}/>
            {
                builder.render(this.props)
            }
        </React.Fragment>
    }


}

export default connect(store => ({
    moduleNameError: store.moduleNameError
}))(builder)