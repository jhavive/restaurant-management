import React from 'react'
import './styles.scss'
import { getObjectFromJSON } from '../utils'
import { Button } from '../../Buttons'

export default class Form extends React.Component {

    state = {
        formItems: [],
        formData: {},
        pageState: ''
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
        if(this.props.preview){
            this.setState({
                formItems: this.props.formItems 
            })
        } else {
           
            // Creating Form

            if(this.props.formItems){
                
                let formItems =  getObjectFromJSON(this.props.formItems)

                this.setState({
                    formItems: formItems.map(item => {
                        item.value = this.props.formData[item.builderFormData.props.name]
                        return item
                    }),
                    formData: Object.keys(this.props.formData).length ? this.props.formData : {}
                })
            }

            // Form Submission

            let form = document.getElementById(this.props.name);
            
            form && form.addEventListener('submit', event => {   
                event.preventDefault();
                if(this.props.onSave){
                    this.props.onSave(this.state.formData, this.props.name)
                }
            })

        }
        
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
        console.log(name, value)
        console.log("hello")
        let tempData = this.state.formData
        tempData[name] = value
        this.setState({
            formData: tempData
        },() => console.log("deepCopyFunction",this.state.formData))
    }


    /* render is called to paint the dom */
    render = () => {
        return <form id={this.props.name} className="builder-form-container">
            {/* If Form is of type form */}

            {
                this.props.form ? this.state.formItems.map(item => {
                    console.log(item)
                    return item.renderView({onChange: this.onChange, value: this.state.formData[item.builderFormData.props.name]})
                }) : null
            }
            
            {/* If Form is of type preview */}

            {
                this.props.preview ? this.props.formItems.map(item => {
                    console.log(item)
                    return item.renderView({onChange: this.onChange, value: item.builderFormData.props.name ? this.state.formData[item.builderFormData.props.name] : ''})
                }) : null
            }

            {/* If Form is being passed as a child element */}

            {
                this.props.children ? this.props.children : null
            }

            {/* If Form items is being previewed then disable submit button */}

            {
                this.props.form ? <div className="modal-footer" name="internal">
                    <Button style_type="primary">Submit</Button>
                </div> : null
            }
        </form>

    }


}