import React from 'react'
import './styles.scss'
import { getObjectFromJSON } from '../utils'
import { Button } from '../../Buttons'
import { FORM_ITEM_TYPE } from '../Models/constant'

const submitButtonList = [
    FORM_ITEM_TYPE.TEXT_INPUT.key,
    FORM_ITEM_TYPE.MULTI_LINE_INPUT.key,
    FORM_ITEM_TYPE.NUMBER.key,
    FORM_ITEM_TYPE.MULTI_SELECT.key,
    FORM_ITEM_TYPE.CHECKBOX.key,
    FORM_ITEM_TYPE.EMAIL.key,
    FORM_ITEM_TYPE.PHONE.key,
    FORM_ITEM_TYPE.DATE.key,
]

export default class FeedbackForm extends React.Component {

    state = {
        formItems: [],
        formData: {},
        pageState: '',
        currentInput: 0
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

        let formItems =  getObjectFromJSON(this.props.formItems)

        this.setState({
            formItems: formItems.map(item => {
                item.value = this.props.formData[item.builderFormData.props.name]
                return item
            }),
            formData: Object.keys(this.props.formData).length ? this.props.formData : {}
        })

        setTimeout(() => {

            let form = document.getElementById(this.props.name);
            
            form && form.addEventListener('submit', event => {  
                console.log("hello") 
                event.preventDefault();
                if(this.state.currentInput == this.props.formItems.length - 1){
                    this.props.onSave(this.state.formData)
                } else {
                    this.setState({
                        currentInput: this.state.currentInput + 1
                    })
                }
            })

        }, 800)
       
    }

    /* This method determines whether the component should be updated or not.
    By default, it’ll return true. 
    If at some point, if you want to re-render the component on a condition, then shouldComponentUpdate() method would be the correct choice */

    shouldComponentUpdate = (nextProps, nextState) => {
        if(nextProps.name != this.props.name) {
            if(nextProps.formItems){
                
                let formItems =  getObjectFromJSON(nextProps.formItems)

                this.setState({
                    formItems: formItems.map(item => {
                        item.value = nextProps.formData[item.builderFormData.props.name]
                        return item
                    }),
                    formData: Object.keys(nextProps.formData).length ? nextProps.formData : {}
                })
            }
        }
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

    onChange = (name, value) => {
        let item        =   this.state.formItems[this.state.currentInput]
        let tempData    =   this.state.formData
        tempData[name]  =   value

        this.setState({
            formData        :   tempData
        }, () => {
            console.log(this.state)
        })
    }

    onClick = (name, value) => {
        console.log("hello onClick",this.props.name)
        let tempData    =   this.state.formData
        tempData[name]  =   value

        if(this.state.currentInput == this.props.formItems.length - 1){
            this.props.onSave(tempData)
        } else {

            this.setState({
                formData        :   tempData,
                currentInput    :   this.state.currentInput + 1
            }, () => {
                console.log("ccalue",this.state)
                
            })
        }
    }


    /* render is called to paint the dom */
    render = () => {
        if(this.state.formItems.length > 0){

            let item = this.state.formItems[this.state.currentInput]

            return <form 
                id          =   {this.props.name} 
                className   =   "builder-feedback-form-container"
                >
                <div className="slide-container">
                    {
                        item.renderView({
                            onChange    :   submitButtonList.includes(item.builderFormData.type) ? this.onChange : this.onClick, 
                            value       :   this.state.formData[item.builderFormData.props.name]
                        })
                    }
                    {
                        submitButtonList.includes(item.builderFormData.type) ? 
                            <Button type="submit" style_type="primary">Next</Button>
                            : null
                    }
                </div>
            </form>
        } else 
            return null

    }


}