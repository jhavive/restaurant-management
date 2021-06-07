import React from 'react'
import './styles.scss'
import Input from '../../../assets/components/Input'
import {Button} from '../../../assets/components/Buttons'
import { User, Lock } from 'react-feather'
import { logo } from '../../../assets/images/images'
import { Rocket } from '../../../assets/images/svg/rocket'

export default class Login extends React.PureComponent {

    state = {
        username: "",
        password: "",
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

    onChange = (e) => {
        console.log("hello",e.target.name)
        let key = e.target.name
        this.setState({
            [key]: e.target.value
        })
    }

    login = () => {
        fetch('http://localhost:8000/login/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(resp => {
            console.log(resp)
            return resp.json()
        }).then(response => {
            console.log(response)
            localStorage.setItem('token', response.token)
            localStorage.setItem('organization-id', response.organization)
            location = '/admin'
        })
        .catch(e => {
            console.log(e)
        })
    }

    /* render is called to paint the dom abc */
    render = () => {
        return(
            <div className="login-container">
                <div className="left-container">
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account</p>
                    <br/>
                    <br/>
                    <Input type="text" label="Email ID" name="username" span={<User color="#898989" size={22}/>} value={this.state.username} onChange={this.onChange}/>
                    <Input type="password" label="Password" name="password" span={<Lock color="#898989" size={22}/>} value={this.state.password} onChange={this.onChange}/>
                    <Button style_type="primary" onClick={() => this.login()}>sign in</Button>
                </div>
                <div className="vertical-line"><div></div></div>
                <div className="right-container">
                    <img src={logo}/>
                    <br/>
                    <Rocket/>
                    <p>Manage your business like never before! With our <p className="blue">CRM & Inventory Management solution</p>, manage all your business from a single application and give boost to your growth.</p>
                    <br/>
                    <p className="pre-signup">Don't have a Bristag account yet?</p>
                    <Button style_type="secondary">Sign up today</Button>
                </div>
            </div>
        )
    }


}