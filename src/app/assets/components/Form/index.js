import React from 'react'
import './styles.scss'
import { changeFormDataToJSON } from './utils'

import { Loader } from '../Loader'
import { Success } from '../Success'
import { Failure } from '../Failure'

import { adminPost } from '../../../utils/api'

const FORM_STATES = {
    LOADING: 1,
    ERROR: 2,
    SUCCESS: 3
}

export default class Form extends React.Component {

    state = {
        formState: ''
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
        let form = document.getElementById(this.props.id);
        form.addEventListener('submit', event => {   
            event.preventDefault();          
            if(!this.props.preventSubmission){
                let inputStack = []
                React.Children.map(this.props.children, (currentChild) => {
                    if(currentChild.type === 'div') {
                        currentChild.props.children && currentChild.props.children.length && currentChild.props.children.map((nestedChild) => {
                            if(nestedChild.type.name && nestedChild.type.name==='Input') {
                                
                                let div = form.getElementsByClassName(currentChild.props.className)[0]
                                let input = div.getElementsByClassName(nestedChild.props.name)[0]
                                console.log(input.value)

                                inputStack.push({
                                    parent: currentChild.props.className,
                                    name: nestedChild.props.name,
                                    value: input.value,
                                })
                            } else if( nestedChild.type==='div') {
                                inputStack.push({
                                    parent: currentChild.props.name,
                                    children: currentChild.props.children
                                })
                            }
                        })
                    } else if(currentChild.type.toString().includes('function Input()')) {
                        console.log(currentChild.type.toString())
                        console.log(form.getElementsByClassName(currentChild.props.name)[0])
                        let input = form.getElementsByClassName(currentChild.props.name)[0]
                        inputStack.push({
                            name: currentChild.props.name,
                            value: input.value,
                        })
                    }
                })
        
                console.log(inputStack)

                let data = changeFormDataToJSON(inputStack)
                console.log(data)
                
                this.setState({
                    formState: FORM_STATES.LOADING
                }, () => {
                    adminPost(this.props.endpoint, data).then(response => {
                        // let resp = JSON.parse(response)
                        console.log(response)
                        this.setState({
                            formState: FORM_STATES.SUCCESS
                        })
                    })
                    .catch(e => {
                        console.log(e)
                        this.setState({
                            formState: FORM_STATES.ERROR
                        })
                    })
                })
            }
            else{
                this.props.onSubmit()
            }
        });
        form.addEventListener('reset', event => {
            event.preventDefault();
            console.log('Form reset cancelled.');
        });

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

    changeState = (newState) => {

    }

    getFormContent = () => {
        switch(this.state.formState) {
            case FORM_STATES.LOADING:
                return(
                    <div className="centre loading-container">
                        <Loader
                            height="50"
                            width="10"
                            fill="#3f4d67"
                            />
                    </div>
                )
            case FORM_STATES.ERROR:
                return(
                    <div className="centre error-container">
                        <Failure
                            height="200"
                            width="200"/>
                    </div>
                )
            case FORM_STATES.SUCCESS:
                return(
                    <div className="centre success-container">
                        <Success
                            height="200"
                            width="200"
                            />
                    </div>
                )
            default:
                return(
                    <form className="form">
                    {
                        this.props.children
                    }
                    </form>
                )
        }
    }

    submitForm = () => {
        console.log("hello")
    }


    /* render is called to paint the dom */
    render = () => {
        return(
            <div id={this.props.id} className="form-container">
            {
                this.getFormContent()
            }
            </div>
        )
    }


}